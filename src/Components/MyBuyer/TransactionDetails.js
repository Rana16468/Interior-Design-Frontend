import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const TransactionDetails = () => {
  const { id } = useParams();

  const url = `https://interior-design-seven-psi.vercel.app/specificTransactionReport/${id}`;
  const { data: transaction = [], refetch } = useQuery({
    queryKey: ["my_buyerlist", id],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  const {
    UserName,
    address,
    price,
    name,
    email,
    phoneNumber,
    transactionID,
    currency,
    _id,
  } = transaction?.data || {};

  const handelResetPriceInfo = (event) => {
    event.preventDefault();
    const element = event.target;
    const price = Number(element.price.value);
    const updateData = {
      price,
    };
    // put
    fetch(`http://localhost:5001/update_paymentInfo/${_id}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
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
              Specificed Update Price Information
            </h2>
            <p className="text-gray-500 font-serif flex justify-center mb-6">
              Form is Payment responsive. Give it a try.
            </p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Payment Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <form onSubmit={handelResetPriceInfo}>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor="name">User Name</label>
                        <input
                          type="text"
                          name="UserName"
                          defaultValue={UserName}
                          id="UserName
                          "
                          readOnly
                          required
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          name="address"
                          defaultValue={address}
                          id="address"
                          readOnly
                          required
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="currency">Currency</label>
                        <input
                          type="text"
                          name="currency"
                          defaultValue={currency}
                          id="currency"
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
                          defaultValue={email}
                          id="email"
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
                          name="name"
                          id="name"
                          defaultValue={name}
                          readOnly
                          required
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="price">Phone Number</label>
                        <input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          defaultValue={phoneNumber}
                          readOnly
                          required
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="phone">TransactionID</label>
                        <input
                          type="text"
                          name="transactionID"
                          maxLength={15}
                          id="transactionID"
                          defaultValue={transactionID}
                          required
                          readOnly
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="location">Price</label>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          defaultValue={price}
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

export default TransactionDetails;
