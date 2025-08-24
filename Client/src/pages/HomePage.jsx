import React, { useState } from "react";
import Navbar from "../components/Navbar.components";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import CodingAnimation from "../assets/CodingAnimation.json";

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
    navigate(`editor/${RoomID}`, { state: { UserName: UserName } });
  };

  return (
    <>
      <Navbar />
      <div className="text-white h-[90vh] w-full py-2 px-4">
        <div className=" size-full flex ">
          <div className="size-full">
            <div className="size-full flex flex-col justify-center items-center p-12 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-950 rounded-2xl shadow-lg">
              <h1 className="text-5xl font-extrabold p-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 text-center mb-2">
                Code Together, Anytime!
              </h1>
              <p className="text-gray-200 text-lg mt-6 text-center max-w-md">
                Collaborate with your friends or team in real-time. Share ideas,
                solve problems, and code faster in one place.
              </p>
              <Lottie
                animationData={CodingAnimation}
                loop={true}
                className="w-3/4"
              />
            </div>
          </div>
          <div className="size-full p-16">
            <div className=" size-full rounded-2xl shadow-xl shadow-gray-800 border-1 border-gray-800">
              <div className="p-4 px-6 ">
                <div className="font-bold text-4xl">Join A Room!</div>
              </div>
              <form
                onSubmit={handleEditorNavigation}
                className="size-full flex flex-col p-4"
              >
                <div className="flex flex-col mb-4 border-b-orange-400 border-b-2">
                  <label htmlFor="roomInput" className="text-xl mt-2">
                    Room ID
                  </label>
                  <input
                    type="text"
                    id="roomInput"
                    value={RoomID}
                    onChange={(e) => {
                      setRoomID(e.target.value);
                    }}
                    className="h-8 py-6 mt-1 outline-0"
                    placeholder="Enter Room ID"
                    required
                  />
                </div>
                <div className="flex flex-col border-b-orange-400 border-b-2">
                  <label htmlFor="UserNameInput" className="text-xl mt-2">
                    UserName
                  </label>
                  <input
                    type="text"
                    id="UserNameInput"
                    value={UserName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    className="h-8 py-6 mt-1 outline-0"
                    placeholder="Choose UserName"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="text-white font-bold text-xl p-2 w-full rounded-xl mt-12 bg-gradient-to-r from-orange-600 to-blue-600"
                >
                  Join Room
                </button>
                <div className="w-full mt-2 flex justify-center">
                  {" "}
                  Don't have a room id?{" "}
                  <span
                    className="text-amber-400 ml-1 cursor-pointer hover:underline underline-offset-4"
                    onClick={generateRoomID}
                  >
                    {" "}
                    Create Room
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
