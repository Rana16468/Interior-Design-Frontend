import React, { useContext, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import InteriorBookingModal from "../Components/InteriorModal/InteriorBookingModal";
import InteriorReportModal from "../Components/InteriorModal/InteriorReportModal";
import { AuthContext } from "../Components/AuthProvider/AuthProvider";
import { GiEternalLove } from "react-icons/gi";
import toast from "react-hot-toast";
const ProductCarasole = ({ data, condition, handelDeleteInteriorDesign }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useContext(AuthContext);
  const displayData = user?.displayName?.split(",") || undefined;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.imageList.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.imageList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const addToWishList = (data) => {
    fetch(
      `https://interior-design-seven-psi.vercel.app/set_wishList/${data?._id}`,
      {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wishList: true,
          email: user?.email,
          id: data?._id,
          sellerEmail: data?.data?.email,
          sellerName: data?.data?.sellerName,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success(data?.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div className="max-w-full mx-auto bg-white rounded overflow-hidden shadow-lg m-3">
        <div className="relative">
          <div
            className="carousel-item"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {data?.imageList?.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt=""
                className="w-full h-64 object-cover"
              />
            ))}
          </div>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 transform -translate-y-1/2 left-4 cursor-pointer">
            <AiOutlineArrowLeft className="text-xl" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer">
            <AiOutlineArrowRight className="text-xl" />
          </button>
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 font-serif">
            Interior Design Name: {data?.data?.name}
          </div>
          <p className="text-gray-700 text-base font-serif">
            {data?.data?.discription}
          </p>
          <p className="text-gray-700 text-base font-serif">
            Publishing Date {data?.data?.date.slice(0, 32)}
          </p>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-serif text-gray-700 mr-2">
            #Categories {data?.data?.name}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-serif text-gray-700">
            #Price: {data?.data?.price}
          </span>
          <span className="m-1 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-serif text-gray-700">
            # SellerName: {data?.data?.sellerName}
          </span>
          <span className="m-1 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-serif text-gray-700">
            {data?.data?.date.slice(33)}
          </span>
        </div>
        {condition === "sellerAccount" && (
          <>
            <div className="flex justify-between ">
              <Link
                to={`/SpecificCategoriesDetails/${data?._id}`}
                className="btn btn-outline  btn-sm">
                Update
              </Link>
              {/* You can open the modal using document.getElementById('ID').showModal() method */}
              <button
                onClick={() => handelDeleteInteriorDesign(data?._id)}
                className="btn btn-outline  btn-sm">
                Delete
              </button>
            </div>
          </>
        )}
        {displayData[1] === "Buyer Account" && (
          <>
            <div className="flex justify-between ">
              <button
                className="btn btn-outline  btn-sm"
                onClick={() =>
                  document.getElementById("report_modal").showModal()
                }>
                Report
              </button>
              {/* You can open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn btn-outline  btn-sm"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }>
                Booking
              </button>

              <button
                onClick={() => addToWishList(data)}
                className="btn btn-outline  btn-sm">
                <GiEternalLove className="text-xl text-red-800" />
              </button>
              <InteriorBookingModal data={data} />
              <InteriorReportModal data={data} />
            </div>
          </>
        )}
        {/* singIn With Google Always Buyer Account */}

        {displayData.length === 1 && (
          <>
            <div className="flex justify-between ">
              <button
                className="btn btn-outline  btn-sm"
                onClick={() =>
                  document.getElementById("report_modal").showModal()
                }>
                Report
              </button>
              {/* You can open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn btn-outline  btn-sm"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }>
                Booking
              </button>

              <button
                onClick={() => addToWishList(data)}
                className="btn btn-outline  btn-sm">
                <GiEternalLove className="text-xl text-red-800" />
              </button>
              <InteriorBookingModal data={data} />
              <InteriorReportModal data={data} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductCarasole;
