import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Card from "../Card/Card";
import { deleteShoppingCart } from "../../Utilites/fakeDb";

const Payment = () => {
  const { finalProduct } = useContext(AuthContext);

  let productList = [];

  let total = 0;
  let shipping = 0;
  let quantity = 0;

  for (const product of finalProduct) {
    quantity = quantity + product.quantity;
    total = total + product.price * product.quantity;
    shipping = shipping + product.shipping;
    productList.push({ productId: product._id, quentity: product.quantity });
  }
  const tax = parseFloat((total * 0.1).toFixed(2));
  const grandTotal = total + shipping + tax;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const paymentList = {
      ...data,
      productList,
      grandTotal,
    };
    fetch("https://interior-design-seven-psi.vercel.app/order", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(paymentList),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.replace(data?.url);
        console.log(data);
      })
      .catch((error) => {
        console.log(error?.message);
      });
    reset();
  };

  const clearCart = () => {
    deleteShoppingCart();
  };

  return (
    <>
      <div className="m-3 gap-4 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div className="bg-[#082f49]  m-3 p-4 rounded bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')]">
          <Card clearCart={clearCart} cart={finalProduct}></Card>
        </div>
        <div className="bg-[#082f49] m-3 p-4 rounded">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="firstname"
                  {...register("firstname")}
                  id="firstname"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                {errors.firstname && (
                  <p role="alert">{errors.firstname?.message}</p>
                )}
                <label
                  for="firstname"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  First name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="lastname"
                  {...register("lastname")}
                  id="lastname"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                {errors.lastname && (
                  <p role="alert">{errors.lastname?.message}</p>
                )}
                <label
                  for="lastname"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Last name
                </label>
              </div>
            </div>

            {/* poster code  currency */}

            <div class="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <label for="currency" className="sr-only">
                  Underline select
                </label>
                <select
                  id="currency"
                  name="currency"
                  {...register("currency")}
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                  <option selected>Choose a Curreny</option>
                  <option>BDT</option>
                  <option>USD</option>
                  <option>RMB</option>
                  <option>Euro</option>
                </select>
                {errors.currency && (
                  <p role="alert">{errors.currency?.message}</p>
                )}
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="postCode"
                  {...register("postCode")}
                  id="postCode"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                {errors.postCode && (
                  <p role="alert">{errors.postCode?.message}</p>
                )}
                <label
                  for="postCode"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Post Code
                </label>
              </div>
            </div>

            {/* email address and addresss */}

            <div class="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="email"
                  {...register("email")}
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                {errors.email && <p role="alert">{errors.email?.message}</p>}
                <label
                  for="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Email Address
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="address"
                  {...register("address")}
                  id="address"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                {errors.address && (
                  <p role="alert">{errors.address?.message}</p>
                )}
                <label
                  for="address"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  User Address
                </label>
              </div>
            </div>
            {/* Phone Number  */}

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="phoneNumber"
                name="phoneNumber"
                {...register("phoneNumber")}
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              {errors.phoneNumber && (
                <p role="alert">{errors?.phoneNumber?.message}</p>
              )}
              <label
                for="phoneNumber"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Phone number (123-456-7890)
              </label>
            </div>
            <div className="flex justify-end">
              <button className="btn btn-outline btn-sm btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
