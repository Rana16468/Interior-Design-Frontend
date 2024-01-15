import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const InteriorBookingModal = ({ data }) => {
  const { user } = useContext(AuthContext);
  const { handleSubmit, register, reset } = useForm();
  const displayData = user?.displayName?.split(",") || undefined;

  const onSubmit = (booking) => {
    const bookingData = {
      id: data?._id,
      sellerName: data?.data?.sellerName,
      sellerEmail: data?.data?.email,

      disable: false,
      ...booking,
    };

    // fetch the  booking data
    fetch("https://interior-design-seven-psi.vercel.app/booking_details", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data?.message);
        reset();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-neutral btn-circle absolute right-2 top-2">
              ✕
            </button>

            <h3 className=" font-bold text-xl font-serif">
              Interior Design Name is {data?.data?.name}
            </h3>
          </form>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-3 mt-10">
            <input
              type="text"
              readOnly
              defaultValue={displayData[0]}
              {...register("userName")}
              placeholder="User Name"
              className="input input-bordered w-full "
            />

            <input
              name="email"
              defaultValue={user?.email}
              {...register("email")}
              readOnly
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full "
            />

            <input
              name="itemname"
              type="text"
              defaultValue={data?.data?.name}
              {...register("itemname")}
              readOnly
              placeholder="Interior Design Name"
              className="input input-bordered w-full "
            />

            <input
              name="price"
              type="text"
              {...register("price")}
              readOnly
              placeholder="Price"
              defaultValue={data?.data?.price}
              className="input input-bordered w-full"
            />

            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              {...register("phone")}
              required
              className="input input-bordered w-full"
            />

            <input
              name="buyerLocation"
              type="text"
              placeholder="Location"
              {...register("location")}
              required
              className="input input-bordered w-full"
            />

            <br />
            <input
              className="w-full btn-outline btn-sm  btn btn-accent"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </dialog>
    </>
  );
};

export default InteriorBookingModal;
