import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import ContructListDisplay from "./ContructListDisplay";

const ContractList = () => {
  const { data: contractList = [], refetch } = useQuery({
    queryKey: ["contractList"],
    queryFn: async () => {
      const res = await fetch(
        "https://interior-design-seven-psi.vercel.app/recivited_all_complain"
      );
      const data = await res.json();
      return data;
    },
  });

  const handelDelete = (id) => {
    const confirm = window.confirm("I Thing Problem Solving ,Delete");
    if (confirm) {
      fetch(
        `https://interior-design-seven-psi.vercel.app/delete_contruct/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((deleteResult) => {
          refetch();
          toast.success(deleteResult?.message);
        })
        .catch((error) => {
          console.log(error?.message);
        });
    }
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2 m-1">
        {contractList?.status &&
          contractList?.data?.map((v, index) => (
            <ContructListDisplay
              key={index}
              list={v}
              handelDelete={handelDelete}></ContructListDisplay>
          ))}
      </div>
    </>
  );
};

export default ContractList;
