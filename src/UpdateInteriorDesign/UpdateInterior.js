import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { useForm, useWatch } from "react-hook-form";
import { AuthContext } from "../Components/AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const UpdateInterior = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const term = useWatch({ control, name: "term" });
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const url = `https://interior-design-seven-psi.vercel.app/SpecificCategoriesDetails/${id}`;

  const { data: SpecificCategoriesDetails = [], refetch } = useQuery({
    queryKey: ["SpecificCategoriesDetails", id],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  const { data, imageList } = SpecificCategoriesDetails?.data || {};

  const onSubmit = async (updateInfo) => {
    const updateData = {
      categories: data?.categories,
      ...updateInfo,
    };
    fetch(
      `https://interior-design-seven-psi.vercel.app/update_specific_categories_details/${id}`,
      {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        refetch();

        reset();
        toast.success(data?.message);
      })
      .catch((error) => {
        console.log(error.message);
      });

    // update interior categories details
  };
  return (
    <>
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-serif flex justify-center text-xl text-gray-600">
              Specificed Categories Updated
            </h2>
            <p className="text-gray-500 font-serif flex justify-center mb-6">
              Form is Interior Design responsive. Give it a try.
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
                          defaultValue={data?.name}
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
                          defaultValue={data?.price}
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
                          defaultValue={data?.discription}
                          placeholder="Write your thoughts here..."
                          className="focus:shadow-soft-primary-outline min-h-unset text-sm leading-5.6 ease-soft block h-auto w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"></textarea>
                      </div>

                      <div className="md:col-span-5">
                        <label className="mb-2">Image List</label>
                        <div>
                          {imageList?.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="flex items-center gap-3 mb-5">
                                <input
                                  className="input input-bordered w-full rounded-xl"
                                  type="text"
                                  {...register(`imageList[${index}]`)}
                                  defaultValue={item}
                                />
                              </div>
                            );
                          })}
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
    </>
  );
};

export default UpdateInterior;
