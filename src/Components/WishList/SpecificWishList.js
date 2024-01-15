import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import ProductCarasole from "../../reusesable/ProductCarasole";

const SpecificWishList = () => {
  const { id } = useParams();

  const url = `https://interior-design-seven-psi.vercel.app/SpecificCategoriesDetails/${id}`;

  const { data: SpecificCategoriesDetails = [] } = useQuery({
    queryKey: ["SpecificCategoriesDetails", id],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  console.log(SpecificCategoriesDetails);

  return (
    <>
      <ProductCarasole data={SpecificCategoriesDetails?.data}></ProductCarasole>
    </>
  );
};

export default SpecificWishList;
