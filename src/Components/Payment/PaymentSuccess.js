import React from "react";
import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { tranId } = useParams();
  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl overflow-hidden shadow-md p-8 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">f</h2>
        <span className="text-gray-500">
          {new Date().toString().slice(0, 24)}
        </span>
      </div>
      <div className="text-gray-600">
        <p className="mb-2">Transaction ID: {tranId}</p>
        <h1 className="text-xl font-serif">Payment Success</h1>
      </div>
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
