import React, { useState } from "react";
import { RiAiGenerate } from "react-icons/ri";
import { IoDownloadOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const ImageGenerated = () => {
  const { handleSubmit, register, reset } = useForm();
  const [generatedImage, setGeneratedImage] = useState("");
  const downloadImage = async (imageSrc) => {
    const image = await fetch(imageSrc);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "image file name here";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onSubmit = (data) => {
    fetch(`https://interior-design-seven-psi.vercel.app/AI_image_generate`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setGeneratedImage(data.result);
        reset();
        toast.success(data?.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div className=" flex justify-center items-center mt-3">
        <div className=" w-1/2">
          <h1 className="text-3xl font-bold mb-6">
            Text-Based Image Generator
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-full p-4 bg-white shadow-md rounded-md flex">
              <input
                type="text"
                {...register("image")}
                className="mt-1 p-2 border border-gray-300 rounded-l-md w-full focus:outline-none focus:ring focus:border-blue-300"
              />

              <button className=" mt-1 p-2 bg-blue-500 text-white rounded-r-xl hover:bg-blue-800 transition duration-300">
                <RiAiGenerate className="text-4xl " />
              </button>
            </div>
          </form>

          <div className="mt-8  bg-white shadow-lg rounded-md overflow-hidden">
            <div className="flex justify-between">
              <p className="text-xl font-serif mb-2">Generated Image:</p>
              <button
                onClick={() => downloadImage(generatedImage)}
                className="btn btn-outline btn-info btn-sm">
                <IoDownloadOutline className="text-xl" />
              </button>
            </div>
            <img
              src={generatedImage}
              alt="Generated"
              className="w-full h-auto rounded-md transition duration-500 transform hover:scale-150"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageGenerated;
