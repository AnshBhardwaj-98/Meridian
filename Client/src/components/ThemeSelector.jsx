// src/components/ThemeSelector.jsx
import React from "react";
import { themes } from "../Constants";

const ThemeSelector = ({ selectedTheme, onSelect }) => {
  return (
    <>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1 text-amber-500">
          {selectedTheme ? selectedTheme : "Select Theme"}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          {themes.map((theme, index) => (
            <li key={index} onClick={() => onSelect(theme)}>
              <a>{theme}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ThemeSelector;
