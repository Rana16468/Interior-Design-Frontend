import { useQuery } from "@tanstack/react-query";
import React from "react";
import WishListDisplay from "../../WishList/WishListDisplay";
import toast from "react-hot-toast";

const AllWishList = () => {
  const { data: all_wish_list = [], refetch } = useQuery({
    queryKey: ["all_wish_list"],
    queryFn: async () => {
      const res = await fetch(
        "https://interior-design-seven-psi.vercel.app/all_wish_list"
      );
      const data = await res.json();
      return data;
    },
  });

  const handelDeleteWishList = (id) => {
    const confirm = window.confirm(
      "Are you Shure You Want To delete This WishList"
    );
    if (confirm) {
      fetch(
        `https://interior-design-seven-psi.vercel.app/delete-wishList/${id}`,
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
        My Categories List :{all_wish_list?.data?.length}
      </h1>
      <div className="overflow-x-auto m-3">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Email</th>
              <th>Seller Name</th>
              <th>Seller Email</th>
              <th>Actual Product</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {all_wish_list?.status &&
              all_wish_list?.data?.map((v, index) => (
                <WishListDisplay
                  key={index}
                  list={v}
                  handelDeleteWishList={handelDeleteWishList}></WishListDisplay>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllWishList;
