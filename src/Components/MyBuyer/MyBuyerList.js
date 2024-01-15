import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import MyBuyerDisplay from "./MyBuyerDisplay";
import toast from "react-hot-toast";

const MyBuyerList = () => {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");

  const url = `https://interior-design-seven-psi.vercel.app/my_buyerlist?email=${user?.email}`;
  const { data: buyerList = [], refetch } = useQuery({
    queryKey: ["my_buyerlist", user?.email],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });
  const handleToggle = (id, account_status) => {
    const A_status = {
      disable: !account_status,
    };
    // put
    // put
    fetch(
      `https://interior-design-seven-psi.vercel.app/chnage_Account_Status/${id}`,
      {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(A_status),
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

  const handelDelete = (id) => {
    const confirm = window.confirm(
      "Are You Shure ,You want to Delete This" + id
    );
    if (confirm) {
      fetch(
        `https://interior-design-seven-psi.vercel.app/delete_bookinglist/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          toast.success(data?.message);
          refetch();
        })
        .catch((error) => {
          console.log(error?.message);
        });
    }
  };

  return (
    <>
      <h1 className="text-3xl text-center font-serif">
        Your Buyer List :{buyerList?.data?.length}
      </h1>

      <div className="flex justify-center">
        <input
          type="search"
          id="default-search"
          onChange={(e) => setSearch(e.target.value)}
          className="block w-1/2 p-3 pl-5 text-sm text-gray-900 border border-gray-300 rounded-full  focus:ring-blue-500 focus:border-blue-500 bg-[#082f49] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Find Your Buyer Email/Phone Number"
          required
        />
      </div>
      <div className="overflow-x-auto m-3">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Count </th>
              <th>Is Working</th>
              <th>Seller Name</th>
              <th>Seller Email</th>
              <th>User Email</th>
              <th>Interior Design Name</th>
              <th>Price</th>

              <th>Phone Number</th>
              <th>Location</th>
              <th>Transaction ID</th>
              <th>Transaction Details</th>
              <th>Delete</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {buyerList?.status &&
              buyerList?.data
                ?.filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item?.email?.includes(search) ||
                        item?.phone?.toLowerCase().includes(search);
                })
                .map((v, index) => (
                  <MyBuyerDisplay
                    key={index}
                    count={index + 1}
                    list={v}
                    handleToggle={handleToggle}
                    handelDelete={handelDelete}></MyBuyerDisplay>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyBuyerList;
