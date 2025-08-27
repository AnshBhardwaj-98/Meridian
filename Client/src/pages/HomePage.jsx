import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import CodingAnimation from "../assets/CodingAnimation.json";
import toast from "react-hot-toast";

const HomePage = () => {
  const [RoomID, setRoomID] = useState("");
  const [UserName, setUserName] = useState("");

  const navigate = useNavigate();

  function generateRoomID() {
    const id = uuidv4();
    setRoomID(id);
  }

  const handleEditorNavigation = (e) => {
    e.preventDefault();
    const trimmedUser = UserName.trim();

    if (!RoomID || !trimmedUser) {
      toast.error("Username cannot be empty or contain spaces!");
      return;
    }

    navigate(`editor/${RoomID}`, { state: { UserName: trimmedUser } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-x-hidden">
      {/* Header with logo */}
      <header className="w-full flex items-center gap-2 p-6">
        <img src="Favicon2-NO_BG.png" alt="Meridian Logo" className="size-12" />
        <span className="text-amber-500 font-extrabold text-3xl tracking-wide">
          Meridian
        </span>
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row items-center justify-center flex-1 gap-10 px-6 py-6">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
            Code Together, Anytime!
          </h1>
          <p className="text-gray-300 text-base lg:text-lg mt-4 max-w-md">
            Collaborate with your friends or team in real-time. Share ideas,
            solve problems, and code faster in one place.
          </p>
          <Lottie
            animationData={CodingAnimation}
            loop={true}
            className="w-3/4 lg:w-[80%] mt-6"
          />
        </div>

        {/* Right Section - Join Room Card */}
        <div className="w-full lg:w-1/3 max-w-md">
          <div className="backdrop-blur-xl bg-white/5 border border-gray-700 rounded-2xl shadow-2xl p-6">
            <h2 className="font-bold text-2xl lg:text-3xl mb-6 text-center">
              Join A Room!
            </h2>
            <form
              onSubmit={handleEditorNavigation}
              className="flex flex-col gap-5"
            >
              {/* Room ID */}
              <div className="flex flex-col">
                <label htmlFor="roomInput" className="text-base mb-1">
                  Room ID
                </label>
                <input
                  type="text"
                  id="roomInput"
                  value={RoomID}
                  onChange={(e) => setRoomID(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-400 outline-none transition text-sm"
                  placeholder="Enter Room ID"
                  required
                />
              </div>

              {/* Username */}
              <div className="flex flex-col">
                <label htmlFor="UserNameInput" className="text-base mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="UserNameInput"
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-400 outline-none transition text-sm"
                  placeholder="Choose Username"
                  required
                />
              </div>

              {/* Join Button */}
              <button
                type="submit"
                className="text-white font-bold text-lg py-2 w-full rounded-xl bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 transition-all duration-300 shadow-md"
              >
                Join Room
              </button>

              {/* Create Room */}
              <p className="text-center text-gray-300 mt-2 text-sm">
                Don’t have a room ID?{" "}
                <span
                  className="text-amber-400 cursor-pointer hover:underline underline-offset-4"
                  onClick={generateRoomID}
                >
                  Create Room
                </span>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
