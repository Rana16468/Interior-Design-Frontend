import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const InteriorReportModal = ({ data }) => {
  const { user } = useContext(AuthContext);
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (report) => {
    const ReportData = {
      ...report,
      categories: data?.data?.categories,
      categoriesDetails: data?._id,
    };

    // fetch the  booking data
    fetch("https://interior-design-seven-psi.vercel.app/report_details", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ReportData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data?.message);
        reset();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="report_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm bg-red-500 btn-circle absolute right-2 top-2">
              ✕
            </button>
            <h3 className=" font-bold text-2xl font-serif">
              Interior Design Name :{data?.data.name}
            </h3>
          </form>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-3 mt-10">
            <input
              type="text"
              readOnly
              {...register("itemname")}
              defaultValue={data?.data?.name}
              placeholder="Product Name"
              className="input input-bordered w-full "
            />

            <input
              name="email"
              defaultValue={user?.email}
              readOnly
              type="email"
              {...register("UserEmail")}
              placeholder="Email Address"
              className="input input-bordered w-full "
            />

            <input
              name="sellerName"
              type="text"
              readOnly
              defaultValue={data?.data?.sellerName}
              {...register("SellerName")}
              placeholder="Seller Name"
              className="input input-bordered w-full "
            />

            <input
              type="text"
              readOnly
              defaultValue={data?.data?.email}
              {...register("SellerEmail")}
              placeholder="Saller Email"
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="report"
              {...register("report")}
              placeholder="Report Discription"
              maxLength={250}
              className="input input-bordered w-full "
            />

            <br />
            <input
              className="w-full btn-sm  btn btn-error btn-outline"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </dialog>
    </>
  );
};

export default InteriorReportModal;
