import React from "react";

const AboutDetails = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md mt-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            About Our Interior Design Studio
          </h1>
          <p className="text-gray-700 mb-8">
            Welcome to our interior design studio, where creativity meets
            functionality. We are passionate about creating spaces that not only
            look stunning but also enhance the quality of life for our clients.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Our Featured Products
            </h2>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-4">
                <div className="bg-white p-6 rounded-md shadow-md transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-2">
                    Modern SHOP Interior
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Elevate your living room with our stylish and comfortable
                    modern sofa set.
                  </p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    View Details
                  </button>
                </div>
              </div>

              <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-4">
                <div className="bg-white p-6 rounded-md shadow-md transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-2">
                    Home Interior Design
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Gather your loved ones around a beautifully crafted dining
                    table.
                  </p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    View Details
                  </button>
                </div>
              </div>

              <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-4">
                <div className="bg-white p-6 rounded-md shadow-md transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-semibold mb-2">
                    Tranditional Office
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Gather your loved ones around a beautifully crafted dining
                    table.
                  </p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutDetails;
