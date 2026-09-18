// File: src/pages/admin/UploadProperty.tsx
import { useState, type FormEvent, type ChangeEvent } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { createProperty, uploadImageToStorage } from '@/services/propertyService';
import { applyWatermark } from '@/utils/watermark';

export default function UploadProperty() {
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
      let finalImageUrls: string[] = [];

      if (selectedFiles.length > 0) {
        const uploadPromises = selectedFiles.map(async (file) => {
          const watermarkedFile = await applyWatermark(file);
          return await uploadImageToStorage(watermarkedFile);
        });
        
        finalImageUrls = await Promise.all(uploadPromises);
      } else {
        const manualUrls = formData.get('imageUrl') as string;
        if (manualUrls) {
          finalImageUrls = manualUrls.split(',').map((url) => url.trim()).filter(Boolean);
        }
      }

      if (finalImageUrls.length === 0) {
        throw new Error('Please select at least one image file.');
      }

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
        visibilityStatus: 'published',
        beds: Number(formData.get('beds')) || 0,
        baths: Number(formData.get('baths')) || 0,
        sqft: (formData.get('sqft') as string) || '',
        yearBuilt: Number(formData.get('yearBuilt')) || new Date().getFullYear(),
        amenities: amenitiesArray,
        tags: amenitiesArray.slice(0, 3),
        hotDeal: formData.get('hotDeal') === 'on',
        fullyFurnished: formData.get('furnished') === 'on',
      });

      setStatus('success');
      form.reset();
      setSelectedFiles([]);
      setPreviewUrls([]);
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to upload property. Please try again.');
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-foreground-950 placeholder:text-foreground-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all";
  const labelClass = "block text-sm font-medium text-foreground-700 mb-1.5";
  const sectionTitleClass = "text-lg font-semibold text-foreground-950 mb-4 flex items-center gap-2";

  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <div className="h-16 md:h-20" />

      <section className="relative overflow-hidden bg-primary-950 py-12 md:py-16">
        <div className="absolute top-[10%] right-[5%] w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-3 py-1 bg-white/10 text-white/90 text-[11px] font-medium rounded-full mb-3">
            Admin Portal
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Upload New Property
          </h1>
          <p className="text-white/70 mt-3 text-sm md:text-base max-w-xl mx-auto">
            Add a new listing to the global catalog. It will automatically sync to all users and devices.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {status === 'success' ? (
            <div className="bg-card rounded-2xl p-10 border border-background-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-foreground-950 mb-2">Property Published Successfully!</h3>
              <p className="text-sm text-foreground-500 mb-6">Your listing is now saved in Firebase and visible to all visitors.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-3 sm:py-2.5 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors w-full sm:w-auto"
                >
                  Upload Another
                </button>
                <a
                  href="/properties"
                  className="px-6 py-3 sm:py-2.5 rounded-lg border border-background-200 text-foreground-700 text-sm font-medium hover:bg-background-100 transition-colors w-full sm:w-auto text-center"
                >
                  View Listings
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm flex items-center gap-2">
                  <i className="ri-error-warning-line text-lg" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="bg-card rounded-2xl p-6 md:p-8 border border-background-200 shadow-sm">
                <h2 className={sectionTitleClass}>
                  <i className="ri-information-line text-primary-500" /> Basic Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Property Title *</label>
                    <input type="text" name="title" required placeholder="e.g. Luxury 4-Bedroom Villa in Watamu" className={inputClass} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass}>Status *</label>
                      <select name="status" required className={`${inputClass} appearance-none cursor-pointer`}>
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
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
                      <label className={labelClass}>Price *</label>
                      <input type="text" name="price" required placeholder="e.g. 28,000,000" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>General Location *</label>
                      <input type="text" name="location" required placeholder="e.g. Karen, Nairobi" className={inputClass} />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className={labelClass}>Exact Map Address (For Google Maps)</label>
                    <input type="text" name="mapLocation" placeholder="e.g. Riverside Drive, Nairobi" className={inputClass} />
                    <p className="text-[11px] text-foreground-400 mt-1.5">Providing an exact landmark or street makes the map highly accurate.</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 md:p-8 border border-background-200 shadow-sm">
                <h2 className={sectionTitleClass}>
                  <i className="ri-layout-masonry-line text-primary-500" /> Property Details
                </h2>
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

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 border border-background-200 rounded-lg bg-background-50">
                    <input type="checkbox" name="hotDeal" id="hotDeal" className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 border-background-300" />
                    <label htmlFor="hotDeal" className="text-sm font-medium text-foreground-700 cursor-pointer">Mark as Hot Deal</label>
                  </div>
                  <div className="flex items-center gap-3 p-4 border border-background-200 rounded-lg bg-background-50">
                    <input type="checkbox" name="furnished" id="furnished" className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 border-background-300" />
                    <label htmlFor="furnished" className="text-sm font-medium text-foreground-700 cursor-pointer">Fully Furnished</label>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 md:p-8 border border-background-200 shadow-sm">
                <h2 className={sectionTitleClass}>
                  <i className="ri-image-add-line text-primary-500" /> Property Images
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Upload Image Files</label>
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
                        <div key={idx} className="relative w-28 h-24 rounded-lg overflow-hidden border border-background-200 shadow-sm group">
                          <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                            aria-label="Remove image"
                          >
                            <i className="ri-close-line" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <label className={labelClass}>Property Description *</label>
                    <textarea
                      name="description"
                      required
                      rows={5}
                      placeholder="Describe the property, features, and neighborhood..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Amenities (Comma-separated)</label>
                    <input type="text" name="amenities" placeholder="e.g. Swimming Pool, 24/7 Security, Garden, CCTV" className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Fix: Centered on mobile, right-aligned on desktop */}
              <div className="flex justify-center sm:justify-end pt-4 mt-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-3 w-full sm:w-auto rounded-lg bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-colors disabled:opacity-70 shadow-sm"
                >
                  {status === 'submitting' ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" />
                      Saving to Firebase...
                    </>
                  ) : (
                    <>
                      <i className="ri-upload-cloud-2-line" />
                      Publish Property
                    </>
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