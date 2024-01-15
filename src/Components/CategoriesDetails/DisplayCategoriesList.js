import React from "react";
import { Link } from "react-router-dom";

const DisplayCategoriesList = ({ list, count, deleteCategories }) => {
  const { _id, name, company, date, priceRange, email, photo } = list;
  return (
    <tr>
      <th>{count + 1}</th>
      <td>
        <div className="avatar">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={photo} alt="" />
          </div>
        </div>
      </td>
      <td>{company}</td>
      <td>{priceRange}</td>
      <td>{email}</td>
      <td>{name}</td>
      <td>{date}</td>
      <td>
        <Link
          to={`/update_category/${_id}`}
          className="btn btn-outline btn-accent btn-sm">
          Update
        </Link>
      </td>
      <td>
        <Link
          to={`/addToDesign/${_id}`}
          className="btn btn-outline btn-accent btn-sm">
          Add Product
        </Link>
      </td>
      <td>
        <Link
          to={`/MyCategorieList/${_id}`}
          className="btn btn-outline btn-info btn-sm">
          List
        </Link>
      </td>
      <td>
        <button
          onClick={() => deleteCategories(_id)}
          className="btn btn-outline btn-error btn-sm">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default DisplayCategoriesList;
