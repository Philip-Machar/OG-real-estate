import { useState, type FormEvent, type ChangeEvent } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { createProperty, uploadImageToStorage } from '@/services/propertyService';
import { applyWatermark } from '@/utils/watermark';

export default function SubmitListingPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...files]);
      const newUrls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newUrls]);
    }
    e.target.value = '';
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setPreviewUrls((prev) => {
      URL.revokeObjectURL(prev[indexToRemove]);
      return prev.filter((_, index) => index !== indexToRemove);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      if (selectedFiles.length === 0) {
        throw new Error('Please upload at least one image of the property.');
      }

      const uploadPromises = selectedFiles.map(async (file) => {
        const watermarkedFile = await applyWatermark(file);
        return await uploadImageToStorage(watermarkedFile);
      });
      
      const finalImageUrls = await Promise.all(uploadPromises);

      const amenitiesArray = (formData.get('amenities') as string)
        ? (formData.get('amenities') as string).split(',').map((item) => item.trim()).filter(Boolean)
        : [];

      await createProperty({
        title: formData.get('title') as string,
        price: formData.get('price') as string,
        currency: (formData.get('currency') as string) || 'KES',
        location: formData.get('location') as string,
        mapLocation: formData.get('mapLocation') as string,
        description: formData.get('description') as string,
        image: finalImageUrls[0], 
        images: finalImageUrls,   
        imageCount: finalImageUrls.length,
        type: formData.get('type') as string,
        status: formData.get('status') as 'sale' | 'rent',
        visibilityStatus: 'pending',
        contactName: formData.get('contactName') as string,
        contactPhone: formData.get('contactPhone') as string,
        beds: Number(formData.get('beds')) || 0,
        baths: Number(formData.get('baths')) || 0,
        sqft: (formData.get('sqft') as string) || '',
        yearBuilt: Number(formData.get('yearBuilt')) || new Date().getFullYear(),
        amenities: amenitiesArray,
        tags: amenitiesArray.slice(0, 3),
        fullyFurnished: formData.get('furnished') === 'on',
        hotDeal: false, 
      });

      setStatus('success');
      form.reset();
      setSelectedFiles([]);
      setPreviewUrls([]);
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to submit property. Please try again.');
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-foreground-950 placeholder:text-foreground-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all";
  const labelClass = "block text-sm font-medium text-foreground-700 mb-1.5";

  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <div className="h-16 md:h-20" />

      <section className="relative overflow-hidden bg-primary-950 py-12 md:py-16">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-3 py-1 bg-white/10 text-white/90 text-[11px] font-medium rounded-full mb-3">
            Partner With Us
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            List Your Property
          </h1>
          <p className="text-white/70 mt-3 text-sm md:text-base max-w-xl mx-auto">
            Reach thousands of potential buyers and renters. Submit your property details below and our consultants will review your listing.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {status === 'success' ? (
            <div className="bg-card rounded-2xl p-10 border border-background-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-mail-send-line text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-foreground-950 mb-2">Submission Received!</h3>
              <p className="text-sm text-foreground-500 mb-6">
                Thank you for choosing Kevlin & Company. Our team will review your property and contact you within 24 hours to verify the details before publishing.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                Submit Another Property
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm flex items-center gap-2">
                  <i className="ri-error-warning-line text-lg" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="bg-card rounded-2xl p-6 md:p-8 border border-background-200 shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-foreground-950 mb-4 border-b border-background-200 pb-3">Contact Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Your Name *</label>
                    <input type="text" name="contactName" required placeholder="John Doe" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <input type="tel" name="contactPhone" required placeholder="+254 700 000 000" className={inputClass} />
                  </div>
                </div>

                <h2 className="text-lg font-semibold text-foreground-950 mb-4 border-b border-background-200 pb-3 mt-8">Basic Property Details</h2>
                <div>
                  <label className={labelClass}>Property Title *</label>
                  <input type="text" name="title" required placeholder="e.g. Spacious 3 Bedroom in Kilimani" className={inputClass} />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Goal *</label>
                    <select name="status" required className={`${inputClass} appearance-none cursor-pointer`}>
                      <option value="sale">Selling</option>
                      <option value="rent">Renting Out</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Property Type *</label>
                    <select name="type" required className={`${inputClass} appearance-none cursor-pointer`}>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="land">Land</option>
                      <option value="office">Office</option>
                      <option value="commercial space">Commercial Space</option>
                      <option value="studio">Studio</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Currency *</label>
                    <select name="currency" required className={`${inputClass} appearance-none cursor-pointer`}>
                      <option value="KES">KES</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Expected Price *</label>
                    <input type="text" name="price" required placeholder="e.g. 15,000,000" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>General Location *</label>
                    <input type="text" name="location" required placeholder="e.g. Karen, Nairobi" className={inputClass} />
                  </div>
                </div>

                <div className="pt-2">
                  <label className={labelClass}>Exact Map Address (For Google Maps) *</label>
                  <input type="text" name="mapLocation" required placeholder="e.g. Riverside Drive, Nairobi or a Google Maps link" className={inputClass} />
                </div>

                <h2 className="text-lg font-semibold text-foreground-950 mb-4 border-b border-background-200 pb-3 mt-8">Specifics & Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className={labelClass}>Bedrooms</label>
                    <input type="number" name="beds" min="0" placeholder="0" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Bathrooms</label>
                    <input type="number" name="baths" min="0" placeholder="0" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Area (Sqft)</label>
                    <input type="text" name="sqft" placeholder="e.g. 2,400" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Year Built</label>
                    <input type="number" name="yearBuilt" placeholder="e.g. 2024" className={inputClass} />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 p-4 border border-background-200 rounded-lg bg-background-50">
                  <input type="checkbox" name="furnished" id="furnished" className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 border-background-300" />
                  <label htmlFor="furnished" className="text-sm font-medium text-foreground-700 cursor-pointer">This property is fully furnished</label>
                </div>

                <div className="pt-2">
                  <label className={labelClass}>Amenities (Comma-separated)</label>
                  <input type="text" name="amenities" placeholder="e.g. Swimming Pool, 24/7 Security, Garden, CCTV" className={inputClass} />
                </div>

                <h2 className="text-lg font-semibold text-foreground-950 mb-4 border-b border-background-200 pb-3 mt-8">Description & Media</h2>
                <div>
                  <label className={labelClass}>Detailed Description *</label>
                  <textarea name="description" required rows={5} placeholder="Describe the property, features, and neighborhood in detail..." className={`${inputClass} resize-none`} />
                </div>

                <div>
                  <label className={labelClass}>Upload Photos *</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="w-full text-sm text-foreground-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
                  />
                </div>

                {previewUrls.length > 0 && (
                  <div className="flex flex-wrap gap-4 pt-2">
                    {previewUrls.map((url, idx) => (
                      <div key={idx} className="relative w-24 h-20 rounded-lg overflow-hidden border border-background-200 shadow-sm group">
                        <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="absolute top-1 right-1 w-5 h-5 bg-red-500/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <i className="ri-close-line" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-colors disabled:opacity-70 w-full sm:w-auto"
                >
                  {status === 'submitting' ? (
                    <><i className="ri-loader-4-line animate-spin" /> Submitting...</>
                  ) : (
                    <><i className="ri-send-plane-line" /> Submit for Review</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}