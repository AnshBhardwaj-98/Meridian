import { LogOut, LucideAirVent, TruckElectric } from "lucide-react";
import React, { useState } from "react";
import Avatar from "react-avatar";
import toast from "react-hot-toast";
import { memberStore } from "../store/members.store";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { AllMembers } = memberStore();

  const navigate = useNavigate();
  function copyToClipboard() {
    const url = window.location.pathname;
    const parts = url.split("/");
    const id = parts[parts.length - 1];

    navigator.clipboard.writeText(id);
    toast.success("Room ID Successfully Copied");
  }

  function handleExitRoom(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className="h-full w-32 bg-gray-950 ">
      <div className=" size-full felx flex-col ">
        <div className="flex items-center justify-center">
          <p className="my-2 border-b-2 border-b-amber-500 font-bold text-l">
            Members
          </p>
        </div>

        {/* member list */}
        <div className=" mb-4 h-[80%] overflow-y-scroll">
          {AllMembers.map((client) => {
            return (
              <div
                key={client.socketId}
                className="flex flex-col items-center mt-2"
              >
                <Avatar name={client.username} size="60" round />
              </div>
            );
          })}
        </div>
        <div className="border-t-2 border-t-amber-400 m-2 flex items-center justify-around font-bold mt-2">
          <button
            title="copy room id"
            className="text-center text-sm bg-amber-600 p-2 px-4 rounded-full mt-2 hover:bg-amber-800 "
            onClick={copyToClipboard}
          >
            {"ID"}
          </button>
          <button
            className="flex items-center justify-center bg-red-500 rounded-full p-2 mt-2"
            title="eixt room"
            onClick={handleExitRoom}
          >
            <LogOut />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
