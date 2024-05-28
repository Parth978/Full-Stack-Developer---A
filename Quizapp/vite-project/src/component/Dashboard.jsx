import React, { useContext } from "react";
import userPic from "../../public/profile.png";
import userContext from "../context/context";


const Dashboard = () => {
  const {user, setUser} = useContext(userContext);
  return (
    <div className="bg-red-500 p-4 flex justify-around">
      <h1 className="text-white text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center ml-4">
        <img className="w-10 h-10 rounded-full" src={userPic} alt="user-pic" />
        <h3 className="text-white text-lg ml-2">{user}</h3>
      </div>
    </div>
  );
};

export default Dashboard;
