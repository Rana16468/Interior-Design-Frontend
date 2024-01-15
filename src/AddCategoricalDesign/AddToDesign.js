import React, { useContext } from "react";
import { AuthContext } from "../Components/AuthProvider/AuthProvider";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
const AddToDesign = () => {
  const { user } = useContext(AuthContext);
  const { handleSubmit, register, reset, control } = useForm();
  const term = useWatch({ control, name: "term" });
  const { id } = useParams();

  const onSubmit = async (data) => {
    const formData = new FormData();
    const sendData = {
      name: data?.name,
      email: data?.email,
      date: data?.date,
      price: data?.price,
      sellerName: data?.sellerName,
      discription: data?.discription,
    };
    formData.append(
      "formData",
      JSON.stringify({ categories: id, ...sendData })
    );
    Object.values(data?.photo).forEach((v) => formData?.append("photo", v));
    try {
      const response = await axios.post(
        "http://localhost:5001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Uploaded URLs:", response?.data);
    } catch (error) {
      console.error("Upload failed:", error?.message);
    }
    reset();
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-serif flex justify-center text-xl text-gray-600">
            Specificed Categories Added Product
          </h2>
          <p className="text-gray-500 font-serif flex justify-center mb-6">
            Form is mobile responsive. Give it a try.
          </p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="name">Interior Design Name</label>
                      <input
                        type="text"
                        name="write a code React js And Node js multime image and project Name and price  at a time uploded using  cloudinary "
                        {...register("name")}
                        id="name"
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        {...register("email")}
                        id="email"
                        defaultValue={user?.email}
                        readOnly
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="email@domain.com"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        name="price"
                        {...register("price")}
                        id="price"
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="date">Date</label>
                      <input
                        type="text"
                        name="date"
                        id="date"
                        {...register("date")}
                        defaultValue={new Date().toString()}
                        readOnly
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                      />
                    </div>

                    {/* addded */}
                    <div className="md:col-span-5">
                      <label htmlFor="sellerName">Seller Name</label>
                      <input
                        type="text"
                        name="sellerName"
                        id="sellerName"
                        {...register("sellerName")}
                        defaultValue={user?.displayName?.split(",")[0]}
                        readOnly
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="discription">Product Details</label>
                      <textarea
                        name="discription"
                        {...register("discription")}
                        rows="5"
                        placeholder="Write your thoughts here..."
                        className="focus:shadow-soft-primary-outline min-h-unset text-sm leading-5.6 ease-soft block h-auto w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"></textarea>
                    </div>

                    <div className="md:col-span-5">
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-black"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true">
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="photo"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                              <span className="">Upload a file</span>
                              <input
                                id="photo"
                                name="photo"
                                required
                                type="file"
                                {...register("photo")}
                                multiple
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1 text-black">or drag and drop</p>
                          </div>
                          <p className="text-xs text-black">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-5">
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          required
                          name="term"
                          id="term"
                          {...register("term")}
                          className="form-checkbox"
                        />
                        <label htmlFor="billing_same" className="ml-2">
                          My billing address is different than above.
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          disabled={!term}
                          className="btn btn-outline btn-sm">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <a
          href="https://www.buymeacoffee.com/dgauderman"
          className="md:absolute bottom-0 right-0 p-4 float-right">
          <img
            src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg"
            alt="Buy Me A Coffee"
            className="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"
          />
        </a>
      </div>
    </div>
  );
};

export default AddToDesign;
