import React, { useState } from "react";
import { languages } from "../Constants";
import toast from "react-hot-toast";

const LanguageSelector = ({ selectedLanguage, onSelect }) => {
  const [selection, setselection] = useState("C++");
  return (
    <div>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1 text-amber-500">
          {selection ? selection : " C++"}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          {languages.map((lang, index) => {
            return (
              <li
                key={index}
                onClick={(e) => {
                  onSelect(lang.monaco);
                  setselection(lang.display);
                }}
              >
                <a className="flex w-full justify-between">
                  <span
                    className={`${
                      selection === lang.display ? "text-amber-500" : ""
                    }`}
                  >
                    {lang.display}
                  </span>
                  <span className="text-sm text-gray-500">{lang.version}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LanguageSelector;
