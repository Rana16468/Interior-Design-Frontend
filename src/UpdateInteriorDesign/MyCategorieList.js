import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import ProductCarasole from "../reusesable/ProductCarasole";
import toast from "react-hot-toast";

const MyCategorieList = () => {
  const { id } = useParams();

  const url = `https://interior-design-seven-psi.vercel.app/categories-details/${id}`;

  const { data: categoriesDetails = [], refetch } = useQuery({
    queryKey: ["categoriesDetails", id],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  const handelDeleteInteriorDesign = (id) => {
    const confirm = window.confirm("Are You Shure you Want to Delete this");
    if (confirm) {
      fetch(
        `https://interior-design-seven-psi.vercel.app/delete_specific_categories_details/${id}`,
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
      <h1 className="font-serif text-2xl text-center m-3">
        {" "}
        my-all cataegorie list :{categoriesDetails?.data?.length}
      </h1>
      <div className="grid gap-1  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {categoriesDetails?.status &&
          categoriesDetails?.data?.map((product) => (
            <ProductCarasole
              data={product}
              condition="sellerAccount"
              handelDeleteInteriorDesign={handelDeleteInteriorDesign}
            />
          ))}
      </div>
    </>
  );
};

export default MyCategorieList;
