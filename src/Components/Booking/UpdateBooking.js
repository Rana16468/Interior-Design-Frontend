import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

import { useParams } from "react-router-dom";

const UpdateBooking = () => {
  const { id } = useParams();

  // get specific data
  const url = `https://interior-design-seven-psi.vercel.app/specificBookingInfo/${id}`;

  const { data: BookingInfo = [], refetch } = useQuery({
    queryKey: ["BookingInfo", id],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  const {
    sellerName,
    sellerEmail,
    userName,
    email,
    itemname,
    price,
    phone,
    location,
  } = BookingInfo?.data || {};

  const handelSubmit = (event) => {
    event.preventDefault();
    const element = event.target;
    const sellerName = element.sellerName.value;
    const sellerEmail = element.sellerName.value;
    const userName = element.userName.value;
    const email = element.email.value;
    const itemname = element.itemname.value;
    const price = element.price.value;
    const phone = element.phone.value;
    const location = element.location.value;

    const sendData = {
      sellerName,
      sellerEmail,
      userName,
      email,
      itemname,
      price,
      phone,
      location,
    };

    // put
    fetch(`https://interior-design-seven-psi.vercel.app/update_booking/${id}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    })
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
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-serif flex justify-center text-xl text-gray-600">
              Specificed Update Booking Information
            </h2>
            <p className="text-gray-500 font-serif flex justify-center mb-6">
              Form is Booking responsive. Give it a try.
            </p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Booking Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <form onSubmit={handelSubmit}>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor="name">Seller Name</label>
                        <input
                          type="text"
                          name="
                          sellerName"
                          id="sellerName"
                          defaultValue={sellerName}
                          readOnly
                          required
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="email">Seller Email</label>
                        <input
                          type="email"
                          name="sellerEmail"
                          defaultValue={sellerEmail}
                          id="sellerEmail"
                          readOnly
                          required
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="email@domain.com"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="price">User Name</label>
                        <input
                          type="text"
                          name="userName"
                          defaultValue={userName}
                          id="userName"
                          required
                          readOnly
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="date">User Email</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          defaultValue={email}
                          readOnly
                          required
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        />
                      </div>

                      {/* addded */}
                      <div className="md:col-span-5">
                        <label htmlFor="sellerName">Interior Design Name</label>
                        <input
                          type="text"
                          name="itemname"
                          id="itemname"
                          defaultValue={itemname}
                          readOnly
                          required
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="price">Price</label>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          defaultValue={price}
                          readOnly
                          required
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          type="text"
                          name="phone"
                          maxLength={15}
                          id="phone"
                          defaultValue={phone}
                          required
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="location">Location</label>
                        <input
                          type="text"
                          name="location"
                          id="locations"
                          defaultValue={location}
                          required
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        />
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button className="btn btn-outline btn-sm">
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

export default UpdateBooking;
