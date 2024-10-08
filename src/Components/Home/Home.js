import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeCatagoriesID from "./HomeCatagoriesID";
import OfficeCategories from "./OfficeCategories";
import IDesignCategories from "./IDesignCategories";

const Home = () => {
  const navigate = useNavigate();

  const [isIntroAnimationDone, setIsIntroAnimationDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsIntroAnimationDone(true), 3000); // Adjust animation duration as needed
    return () => clearTimeout(timer);
  }, []);

  const advertisements = [
    {
      title: "New Styles Added: 20% Off Select Styles",
      link: "Sign in and use code MEMBER20 at checkout.",
    },
    {
      title: "Why Wait? Try Store Pickup",
      link: "Buy online and find a store near you for pick up in less than 2 hours. Shop now.",
    },
    {
      title: "New Arrivals",
      link: "Shop All",
    },
    {
      title: "Members: Free Shipping on Orders $50+",
      link: "Join Now",
    },
  ];
  const [currentAdvertisement, setCurrentAdvertisement] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdvertisement((prev) => (prev + 1) % advertisements.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [advertisements.length]);
  console.log(isIntroAnimationDone);
  return (
    <>
      <div className="bg-gray-100 p-4">
        <div className="relative overflow-hidden w-full h-14">
          {advertisements.map((ad, index) => (
            <div
              key={index}
              className={`absolute w-full h-16 transition-opacity duration-500 ${
                index === currentAdvertisement ? "opacity-100" : "opacity-0"
              }`}>
              <div className="flex justify-center items-center">
                <div>
                  <p className="text-xl  font-bold font-serif">{ad.title}</p>
                  <a
                    className="underline flex items-center hover: text-slate-500"
                    href="....">
                    {" "}
                    {ad.link}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-1/2">
        <div className="hero min-h-screen bg-[url('https://t.ly/KwsS5')]">
          <button
            onClick={() => navigate("/all_product")}
            className=" mt-80  btn btn-outline  btn-md rounded-full bg-black  text-white">
            Show Now
          </button>
        </div>
      </div>
      <br />

      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1">
        <a href="...">
          <img
            className="w-full h-full object-cover"
            src="https://i.pinimg.com/736x/d5/02/14/d502147dfce35313e3e3e7c9df468e71.jpg"
            alt=""
          />
        </a>
        <a href="...">
          <img
            className="w-full h-full object-cover"
            src="https://media.designcafe.com/wp-content/uploads/2022/10/06190136/interior-designer-vs-carpenter.jpg"
            alt=""
          />
        </a>
        <a href="...">
          <img
            className="w-full h-full object-cover"
            src="https://t.ly/KOydO"
            alt=""
          />
        </a>
      </div>

      <HomeCatagoriesID />
      <OfficeCategories />
      <IDesignCategories />
    </>
  );
};

export default Home;
