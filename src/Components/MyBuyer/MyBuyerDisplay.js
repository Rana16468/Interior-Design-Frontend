import React from "react";
import { Link } from "react-router-dom";
import { GrStatusGood } from "react-icons/gr";
const MyBuyerDisplay = ({ list, count, handleToggle, handelDelete }) => {
  return (
    <>
      <tr>
        <th>{count}</th>
        <th>
          {" "}
          <button
            onClick={() => handleToggle(list._id, list?.disable)}
            className={`${
              list?.disable ? "bg-green-500" : "bg-red-500"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
            {list?.disable ? (
              <GrStatusGood className="text-xl text-green-700" />
            ) : (
              <GrStatusGood />
            )}
          </button>
        </th>
        <td>{list?.sellerName}</td>
        <td>{list?.sellerEmail}</td>
        <td>{list?.email}</td>
        <td>{list?.itemname}</td>
        <td>{list?.price}</td>
        <td>{list?.phone}</td>
        <td>{list?.location}</td>
        <td>{list?.transactionID}</td>

        <td>
          <Link
            to={`/TransactionDetails/${list?._id}`}
            className="btn btn-outline btn-success btn-sm">
            Details
          </Link>
        </td>
        <td>
          <button
            onClick={() => handelDelete(list?._id)}
            className="btn btn-outline btn-error btn-sm">
            Delete
          </button>
        </td>
        <td>
          <button
            disabled={list?.paidStatus}
            className="btn btn-outline btn-info btn-sm">
            Pay
          </button>
        </td>
      </tr>
    </>
  );
};

export default MyBuyerDisplay;
