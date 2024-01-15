import React from "react";
import { Link } from "react-router-dom";

const IDesignCategoriesDisplay = ({ category }) => {
  const { _id, name, priceRange, photo, textarea } = category;

  return (
    <div className="card card-compact w-110  bg-base-100 shadow-xl">
      <figure>
        <img style={{ height: "300px" }} src={photo} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="text-center text-3xl font-serif">
          Interior Design {name} Categories
        </h2>
        <p className="text-xl font-serif">Price Range :{priceRange}</p>
        <p>{textarea}</p>
        <div className="card-actions justify-end">
          <Link to={`/categories-details/${_id}`}>
            {" "}
            <button className="btn btn-primary btn-sm">
              Categories Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IDesignCategoriesDisplay;
