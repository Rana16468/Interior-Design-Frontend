import React from "react";

const DisplayPayment = ({ list, count, handelDelete }) => {
  return (
    <>
      <tr>
        <td>{count}</td>
        <td>{list?.UserName}</td>
        <td>{list?.name}</td>
        <td>{list?.currency}</td>

        <td>{list?.price}</td>
        <td>{list?.email}</td>
        <td>{list?.address}</td>
        <td>{list?.phoneNumber}</td>
        <td>
          <button
            disabled={list?.paidStatus}
            className="btn btn-outline btn-info btn-sm">
            Pay
          </button>
        </td>
        <td>{list?.transactionID}</td>

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

export default DisplayPayment;
