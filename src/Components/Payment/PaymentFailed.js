import React from "react";
import { useParams } from "react-router-dom";

const PaymentFailed = () => {
  const { tranId } = useParams();
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md p-8 mb-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500">{new Date().toString()}</span>
      </div>
      <div className="text-3xl font-bold text-red-500 mb-4">
        Transaction Failed
      </div>
      <div className="text-gray-600">
        <p className="mb-2">Reason: Networking Issues</p>
        <p className="mb-2">Transaction ID: {tranId}</p>
      </div>
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Retry Transaction
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
