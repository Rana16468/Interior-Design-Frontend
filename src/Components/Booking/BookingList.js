import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BookingList = ({ list, count, handelDelete }) => {
  const navigate = useNavigate();
  return (
    <>
      <tr>
        <th>{count + 1}</th>
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
            to={`/update_booking_list/${list._id}`}
            className="btn btn-outline btn-success btn-sm">
            Update
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
            onClick={() => navigate(`/bookingPayment/${list?._id}`)}
            disabled={list?.paidStatus}
            className="btn btn-outline btn-info btn-sm">
            Pay
          </button>
        </td>
      </tr>
    </>
  );
};

export default BookingList;
