import React from "react";
import items from "./../../Utilites/officeFakeDb.json";
import ProductCarosol from "../../reusesable/ProductCarosol";
const OfficeCategories = () => {
  return (
    <>
      <h1 className="text-5xl font-serif  sm:text-center m-3">
        Office Interior Design Categories
      </h1>
      <ProductCarosol items={items} />
    </>
  );
};

export default OfficeCategories;
