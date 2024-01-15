import React from "react";
import { GrStatusGood } from "react-icons/gr";

const UserListDisplay = ({ list, count, handleToggle }) => {
  console.log(list?.role);
  return (
    <>
      <tr>
        <th>{count + 1}</th>
        <td>
          <div className="avatar m-2">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={list?.photo || "https://i.ibb.co/JCyWD5H/image1.jpg"}
                alt=""
              />
            </div>
          </div>
        </td>
        <td>{list?.full_name}</td>
        <td>{list?.email}</td>
        <td>{list?.address}</td>
        <td>{list?.city}</td>
        <td>{list.country}</td>
        <td>{list?.state}</td>
        <td>{list?.userCategory}</td>
        <td>
          <button
            onClick={() => handleToggle(list._id, list?.role)}
            className={`${
              list?.role ? "bg-green-500" : "bg-red-500"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
            {list?.role ? (
              <GrStatusGood className="text-xl text-green-700" />
            ) : (
              <GrStatusGood />
            )}
          </button>
        </td>
      </tr>
    </>
  );
};

export default UserListDisplay;
