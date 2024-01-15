import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const UpdateCategory = () => {
  const { id } = useParams();

  const { handleSubmit, register } = useForm();
  const { user } = useContext(AuthContext);

  const url = `https://interior-design-seven-psi.vercel.app/specificCategory/${id}`;

  const { data: specificCategory = [], refetch } = useQuery({
    queryKey: ["categoriesDetails", id],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  const onSubmit = (data) => {
    const image = data.photo[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.REACT_APP_IMAGE_KEY}`;
    const email = user ? user?.email : "";
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          data.photo = imgData?.data?.url;
          updateCategorie({ email, ...data });
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });
  };

  const updateCategorie = (data) => {
    fetch(
      `https://interior-design-seven-psi.vercel.app/update_category/${id}`,
      {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success(data?.message);
        refetch();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto  rounded-md shadow-md bg-[#082f49] mt-20">
        <h1 className="text-5xl font-serif text-white sm:text-center m-3">
          Update Interior Design Categories
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="
                company
                ">
                Company/Shop/Etc Name
              </label>
              <input
                id="company"
                type="text"
                required
                {...register("company")}
                defaultValue={specificCategory?.data?.company}
                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="username">
                Categories Name
              </label>
              <input
                id="name"
                type="text"
                required
                {...register("name")}
                defaultValue={specificCategory?.data?.name}
                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="priceRange">
                Price Range
              </label>
              <input
                id="priceRange"
                {...register("priceRange")}
                type="text"
                defaultValue={specificCategory?.data?.priceRange}
                required
                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="date">
                Date
              </label>
              <input
                id="date"
                type="date"
                required
                {...register("date")}
                defaultValue={specificCategory?.data?.date}
                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="textarea">
                Interior Design Discriptions
              </label>
              <textarea
                id="textarea"
                type="textarea"
                required
                {...register("textarea")}
                defaultValue={specificCategory?.data?.textarea}
                maxLength={250}
                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-white"
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
                        {...register("photo", {
                          required: "'photo is required",
                        })}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="btn btn-outline  btn-sm text-white">
              Update
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default UpdateCategory;
