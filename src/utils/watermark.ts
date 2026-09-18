export const applyWatermark = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        return reject(new Error('Could not get canvas context'));
      }

      // 1. Draw the original uploaded image onto the canvas
      ctx.drawImage(img, 0, 0);

      // 2. Load the Kevlin & Company logo
      const logo = new Image();
      // Required to prevent canvas CORS security errors when exporting
      logo.crossOrigin = "anonymous"; 
      logo.src = "/logo.jpg";
      
      logo.onload = () => {
        // Make the logo responsive, but slightly larger so it's readable
        const logoWidth = Math.max(Math.min(img.width * 0.15, 250), 80);
        const aspectRatio = logo.height / logo.width;
        const logoHeight = logoWidth * aspectRatio;

        // --- SAFE ZONE PADDING ---
        const paddingX = img.width * 0.04; 
        const paddingY = img.height * 0.05; 

        const x = img.width - logoWidth - paddingX;
        const y = img.height - logoHeight - paddingY;

        // =========================================================
        // --- TRANSPARENCY (MANIPULATE THIS VALUE) ---
        // =========================================================
        
        // 0.0 is completely invisible, 1.0 is completely solid.
        // 0.4 makes it a true, see-through watermark.
        ctx.globalAlpha = 0.4;
        
        // =========================================================
        
        // Keep the drop shadow subtle to help define the edges
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        // Draw the logo over the image
        ctx.drawImage(logo, x, y, logoWidth, logoHeight);
        
        // Reset alpha and shadows
        ctx.globalAlpha = 1.0; 
        ctx.shadowColor = 'transparent';

        // 3. Convert the canvas back to a File object
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const watermarkedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(watermarkedFile);
            } else {
              reject(new Error('Canvas to Blob conversion failed'));
            }
          },
          file.type,
          0.9 // 90% image quality
        );
      };

      logo.onerror = () => {
        // Fallback: If the logo fails to load, just return the original image
        console.warn('Could not load logo for watermarking. Proceeding without watermark.');
        canvas.toBlob((blob) => {
          if (blob) resolve(new File([blob], file.name, { type: file.type }));
          else reject(new Error('Canvas fallback failed'));
        }, file.type, 0.9);
      };
    };

    img.onerror = () => reject(new Error('Failed to load image for watermarking'));
  });
};