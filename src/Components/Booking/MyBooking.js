import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import BookingList from "./BookingList";
import toast from "react-hot-toast";

const MyBooking = () => {
  // booking list
  const { user } = useContext(AuthContext);

  const url = `https://interior-design-seven-psi.vercel.app/booking_list?email=${user?.email}`;

  const { data: bookingList = [], refetch } = useQuery({
    queryKey: ["bookingList", user?.email],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  const handelDelete = (id) => {
    const confirm = window.confirm("Are You Shure ,You want to Delete This");
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
      <div className="overflow-x-auto m-3">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Count </th>
              <th>Seller Name</th>
              <th>Seller Email</th>
              <th>User Email</th>
              <th>Interior Design Name</th>
              <th>Price</th>
              <th>Phone Number</th>
              <th>Location</th>
              <th>Transaction ID</th>
              <th>Update</th>
              <th>Delete</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookingList?.status &&
              bookingList?.data?.map((v, index) => (
                <BookingList
                  key={index}
                  list={v}
                  count={index}
                  handelDelete={handelDelete}></BookingList>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyBooking;
