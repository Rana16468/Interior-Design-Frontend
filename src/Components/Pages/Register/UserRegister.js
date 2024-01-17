import React, { useContext, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [countries, setCountries] = useState([]);
  const { handleSubmit, register, control, reset } = useForm();
  const term = useWatch({ control, name: "term" });
  const [error, setError] = useState(null);
  const { createUser, updateUserProfile, EmailVarification } =
    useContext(AuthContext);
  const [isRegister, setRegister] = useState(false);
  const navigate = useNavigate();

  // const navigate = useNavigate();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    const image = data.photo[0];

    //https://api.imgbb.com/1/upload?key=${imageHostKey}
    //https://api.imgbb.com/1/upload?expiration=600&key=${process.env.REACT_APP_IMAGE_KEY}
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGE_KEY}`;
    setError("");
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          data.photo = imgData?.data?.url;
          console.log(data.photo);
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });
    if (data.password.length < 6) {
      setError("Password should be 6 characters or more.");
      return;
    }

    if (data?.password !== data?.confirmpassword) {
      setError("Your Password did not match");
      return;
    }

    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;

        updateProfileInfo(data?.full_name, data?.photo, data?.userCategory);

        userEmailVarification();

        storeUserInformation(data);
        setRegister(true);
        console.log(user);
        reset();
        navigate("/");
        toast.success("Checked Your Email Index And Varified is It You");
      })
      .catch((error) => {
        setError(error.message);
      });

    const updateProfileInfo = (name, PhotoURL, userType) => {
      const photoURL = {
        displayName: name.concat(",").concat(userType),
        photoURL: PhotoURL,
      };

      updateUserProfile(photoURL)
        .then(() => {
          console.log("successfuly-profile-update");
        })
        .catch((error) => {
          setError(error.message);
        });
    };

    const userEmailVarification = () => {
      EmailVarification()
        .then(() => {})
        .catch((error) => {
          setError(error.message);
        });
    };

    const storeUserInformation = (userInoformation) => {
      fetch(
        "https://interior-design-seven-psi.vercel.app/storeUserInformation",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInoformation),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          toast.success(data?.message);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
  };
  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">
              Responsive Form
            </h2>
            <p className="text-gray-500 mb-6">
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
                        <label htmlFor="full_name">Full Name</label>
                        <input
                          type="text"
                          name="full_name"
                          id="full_name"
                          {...register("full_name")}
                          required
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          required
                          {...register("email")}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="email@domain.com"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="address">Address / Street</label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          required
                          {...register("address")}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          required
                          {...register("city")}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="country">Country / region</label>
                        <div className="h-12 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <select
                            id="country"
                            required
                            {...register("country")}
                            className="rounded-xl input input-bordered w-full max-w-xl">
                            {countries
                              .sort((a, b) =>
                                a?.name?.common?.localeCompare(b?.name?.common)
                              )
                              .map((v, index) => (
                                <option key={index} value={v.name.common}>
                                  {v.name.common}
                                </option>
                              ))}
                          </select>

                          <button
                            tabindex="-1"
                            className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                            <svg
                              className="w-4 h-4 mx-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                          <button
                            tabindex="-1"
                            htmlFor="show_more"
                            className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                            <svg
                              className="w-4 h-4 mx-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round">
                              <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="state">State / province</label>
                        <div className="h-12 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            name="state"
                            id="state"
                            required
                            {...register("state")}
                            placeholder="State"
                            className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          />
                          <button
                            tabindex="-1"
                            className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                            <svg
                              className="w-4 h-4 mx-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                          <button
                            tabindex="-1"
                            for="show_more"
                            className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"></button>
                        </div>
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="userCategory">Account Types</label>
                        <select
                          name="userCategory"
                          required
                          {...register("userCategory")}
                          className="select select-bordered w-full transition-all flex items-center -h-5 border mt-1 rounded px-4  bg-gray-50">
                          <option selected>Account</option>
                          <option>Seller Account</option>
                          <option>Buyer Account</option>
                        </select>
                      </div>

                      <div className="md:col-span-5">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          htmlFor="multiple_files">
                          Upload Image
                        </label>
                        <input
                          className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="photo"
                          required
                          name="photo"
                          {...register("photo", {
                            required: "'photo is required",
                          })}
                          type="file"
                          multiple
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="email">Password</label>
                        <input
                          type="password"
                          required
                          name="password"
                          {...register("password")}
                          id="password"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="email@domain.com"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="email">Confirm Password</label>
                        <input
                          type="password"
                          required
                          name="confirmpassword"
                          {...register("confirmpassword")}
                          id="confirmpassword"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="email@domain.com"
                        />
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
                  <div>
                    {isRegister && (
                      <p className="text-3xl text-danger text-center">
                        Successfully Register
                      </p>
                    )}
                    {error && (
                      <p className="text-3xl text-center text-red-600">
                        {error}
                      </p>
                    )}
                  </div>
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

export default UserRegister;
