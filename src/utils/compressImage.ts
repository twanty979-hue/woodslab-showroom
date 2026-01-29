// src/utils/compressImage.ts

export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    // 1. สร้าง Image Object
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      // 2. สร้าง Canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // 3. กำหนดขนาดใหม่ (ไม่ให้เกิน 800px เพื่อประหยัดที่สุดสำหรับ Profile)
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 800;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // 4. วาดรูปลง Canvas
      ctx?.drawImage(img, 0, 0, width, height);

      // 5. แปลง Canvas เป็น Blob (WebP)
      // quality: 0.8 (คุณภาพ 80% ชัดแต่ไฟล์เล็กมาก)
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // 6. สร้าง File Object ใหม่ที่เป็น .webp
            // เปลี่ยนชื่อไฟล์เดิม นามสกุลเดิม -> .webp
            const newName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
            const newFile = new File([blob], newName, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            resolve(newFile);
          } else {
            reject(new Error('Canvas is empty'));
          }
        },
        'image/webp',
        0.8 
      );
    };

    img.onerror = (error) => reject(error);
  });
};