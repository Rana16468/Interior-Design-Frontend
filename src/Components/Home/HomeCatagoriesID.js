import React from "react";
import items from "./../../Utilites/homeFakeDb.json";
import ProductCarosol from "../../reusesable/ProductCarosol";
const HomeCatagoriesID = () => {
  return (
    <>
      <h1 className="text-5xl font-serif  sm:text-center m-3">
        Home Interior Design Categories
      </h1>
      <ProductCarosol items={items} />
    </>
  );
};

export default HomeCatagoriesID;
