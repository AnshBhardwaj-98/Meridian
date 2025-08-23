import { Clipboard, Copy, TriangleRight } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Output = ({ code }) => {
  const [output, setOutput] = useState(
    "Your program output will appear here..."
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Output copied!");
  };

  const handleClear = () => {
    setOutput("");
  };

  return (
    <div className="w-full h-full   shadow-md bg-gray-900 text-white">
      {/* Header with buttons */}
      <div className="flex justify-between items-center mb-2 p-2">
        <h2 className="text-sm font-semibold">Output</h2>
        <div className="flex gap-2">
          <button className="px-2 py-1 bg-emerald-800 hover:bg-emerald-950 rounded-lg text-sm">
            Run Code
          </button>
          <button
            onClick={handleCopy}
            className="px-2 py-1 bg-blue-800 hover:bg-blue-950 rounded-lg text-sm"
            title="copy output"
          >
            <Clipboard size={"16px"} />
          </button>
          <button
            onClick={handleClear}
            className="px-2 py-1 bg-red-800 hover:bg-red-950 rounded-lg text-sm"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Output area */}
      <div className="w-full h-full p-2 bg-black  overflow-auto font-mono text-sm">
        {output || <span className="text-gray-500">No output to display</span>}
      </div>
    </div>
  );
};

export default Output;
