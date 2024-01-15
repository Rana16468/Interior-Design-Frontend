import React from "react";
import { LiaFileContractSolid } from "react-icons/lia";
import { RiDeleteBack2Fill } from "react-icons/ri";

const ContructListDisplay = ({ list, handelDelete }) => {
  return (
    <>
      <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
        <div className="p-6">
          <LiaFileContractSolid className="text-5xl" />
          <div className="flex justify-between">
            <h5 className="block mb-2 font-serif text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {list?.name}
            </h5>
            <h5 className="block mb-2 font-serif text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {list?.email}
            </h5>
          </div>

          <h5 className="block mb-2 font-serif text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {list?.phone}
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {list?.description}
          </p>
        </div>
        <div className="p-6 pt-0">
          <button
            onClick={() => handelDelete(list?._id)}
            className="btn btn-outline btn-error btn-sm"
            type="button">
            <RiDeleteBack2Fill className="text-xl" />
          </button>
        </div>

        {/*  */}
      </div>
    </>
  );
};

export default ContructListDisplay;
