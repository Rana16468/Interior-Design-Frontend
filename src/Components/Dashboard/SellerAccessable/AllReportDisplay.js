import React from "react";
import { Link } from "react-router-dom";

const AllReportDisplay = ({ list, count, handelDelete }) => {
  return (
    <>
      <tr>
        <td>{count}</td>
        <td>{list?.itemname}</td>
        <td>{list?.UserEmail}</td>
        <td>{list?.SellerEmail}</td>

        <td>{list?.SellerName}</td>
        <td>{list?.report}</td>
        <td>
          <Link
            to={`/dashboard/SpeciifcReportService/${list?.categoriesDetails}`}
            className="btn btn-outline btn-info btn-sm">
            Service
          </Link>
        </td>

        <td>
          <button
            onClick={() => handelDelete(list?._id)}
            className="btn btn-outline btn-error btn-sm">
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default AllReportDisplay;
