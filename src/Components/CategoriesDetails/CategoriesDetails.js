import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import ProductCarasole from "../../reusesable/ProductCarasole";

const CategoriesDetails = () => {
  const { id } = useParams();
  // fetching

  const url = `https://interior-design-seven-psi.vercel.app/categories-details/${id}`;

  const { data: categoriesDetails = [] } = useQuery({
    queryKey: ["categoriesDetails", id],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  return (
    <>
      <div className="grid gap-1  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {categoriesDetails?.data?.map((product) => (
          <ProductCarasole data={product} />
        ))}
      </div>
    </>
  );
};

export default CategoriesDetails;
