// Utility to crop image using canvas for react-easy-crop
// Source: https://codesandbox.io/s/react-easy-crop-demo-with-cropped-output-lkhx6?file=/src/cropImage.js

export default function getCroppedImg(imageSrc: string, pixelCrop: any, fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("No canvas context");
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
      canvas.toBlob(blob => {
        if (!blob) {
          reject("Canvas is empty");
          return;
        }
        const croppedImageUrl = URL.createObjectURL(blob);
        resolve(croppedImageUrl);
      }, "image/jpeg");
    };
    image.onerror = error => reject(error);
  });
}
