import React from "react";
import Sidebar from "../components/Sidebar.components";
import CodeEditor from "../components/CodeEditor.components";

const EditorPage = () => {
  return (
    <div className=" h-[100vh]">
      <div className="h-full">
        <div className="h-full flex">
          <Sidebar />
          <CodeEditor />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
