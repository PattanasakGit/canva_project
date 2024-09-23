import JSZip from "jszip";

export const downloadImages = async ( images: string[] ) => {
  if (images.length === 1) {
    const previewImage = images[0];
    if (previewImage && previewImage !== "") {
      const link = document.createElement("a");
      link.href = previewImage;
      link.download = "downloaded_image";
      link.click();
    } else {
      alert("No image available for download");
    }
  } else if (images.length > 1) {
    const zip = new JSZip();
    const imageFolder = zip.folder("images");

    const imagePromises = images.map((imageUrl, index) => {
      return fetch(imageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const fileName = `image_${index + 1}.png`;
          imageFolder?.file(fileName, blob);
        });
    });

    await Promise.all(imagePromises);

    zip.generateAsync({ type: "blob" }).then((content) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "images.zip";
      link.click();
    });
  } else {
    alert("No images available for download");
  }
};





// export const downloadImage = (previewImage: string) => {
//   if (previewImage && previewImage !== "") {
//     const link = document.createElement("a");
//     link.href = previewImage;
//     link.download = "downloaded_image";
//     link.click();
//   } else {
//     alert("No image available for download");
//   }
// };
