import React from "react";
import { Link } from "react-router-dom";

const WishListDisplay = ({ list, handelDeleteWishList }) => {
  return (
    <>
      <tr>
        <td>{list?._id}</td>
        <td>{list?.email}</td>
        <td>{list?.sellerName}</td>
        <td>{list?.sellerEmail}</td>
        <td>
          <Link
            to={`/specific-WishList/${list?.id}`}
            className="btn btn-outline btn-accent btn-sm">
            product
          </Link>
        </td>

        <td>
          <button
            onClick={() => handelDeleteWishList(list?._id)}
            className="btn btn-outline btn-error btn-sm">
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default WishListDisplay;
