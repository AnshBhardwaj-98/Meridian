import React, { useState } from "react";
import LanguageSelector from "./LanguageSelector";

const EditorNavbar = () => {
  return (
    <div className="w-full h-16 flex items-center p-4">
      <div className="">
        <LanguageSelector />
      </div>
    </div>
  );
};

export default EditorNavbar;
