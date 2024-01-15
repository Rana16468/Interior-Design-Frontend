import { useEffect, useState } from "react";

const ImageGenerator = (image) => {
  const [isImage, setImage] = useState("https://t.ly/wkHnA");

  const url = `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.REACT_APP_IMAGE_KEY}`;

  useEffect(() => {
    const formData = new FormData();
    formData.append("image", image);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          setImage(imgData?.data?.url);
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });
  }, [image, url]);

  return [isImage];
};

export default ImageGenerator;
