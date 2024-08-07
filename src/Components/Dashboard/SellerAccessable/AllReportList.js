import { useQuery } from "@tanstack/react-query";
import React from "react";
import AllReportDisplay from "./AllReportDisplay";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
const AllReportList = () => {
  const {
    data: all_reports_list = [],
    refetch,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["all_reports_list"],
    queryFn: async () => {
      const res = await fetch(
        "https://interior-design-seven-psi.vercel.app/all_reports_list"
      );
      const data = await res.json();
      return data;
    },
  });

  const handelDelete = (id) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch(
          `https://interior-design-seven-psi.vercel.app/delete_report/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            toast.success(data?.message);
            refetch();
          })
          .catch((error) => {
            console.log(error?.message);
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      {error && <h1>404</h1>}
      {isLoading && (
        <div className=" flex justify-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}

      <div className="overflow-x-auto m-1">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-100 dark:text-gray-400">
            <tr>
              <th>Count </th>
              <th>Interior Design Name</th>
              <th>User Email</th>
              <th>Seller Email</th>
              <th>Seller Name</th>
              <th>Report</th>
              <th>Service</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {all_reports_list?.status &&
              all_reports_list?.data?.map((v, index) => (
                <AllReportDisplay
                  key={index}
                  list={v}
                  count={index + 1}
                  handelDelete={handelDelete}></AllReportDisplay>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllReportList;
