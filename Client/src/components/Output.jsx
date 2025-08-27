import { Clipboard, Copy, Loader, TriangleRight } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Output = ({ language, code }) => {
  const [output, setOutput] = useState(
    "Your program output will appear here..."
  );
  const [loading, setloading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Output copied!");
  };

  const handleClear = () => {
    setOutput("");
  };

  const handleRunCode = async () => {
    setloading(true);
    setOutput("Running The code");

    try {
      const res = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: language,
          version: "*",
          files: [
            {
              name: `main.${language}`,
              content: code,
            },
          ],
        }),
      });

      const data = await res.json();
      const result = data.run;

      // console.log(data);
      // console.log(result);

      if (result.stderr) {
        setOutput(result.stderr);
      } else {
        setOutput(result.stdout || "No output");
      }
    } catch (err) {
      setOutput("Error running code");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="w-full h-full   shadow-md bg-gray-900 text-white">
      {/* Header with buttons */}
      <div className="flex justify-between items-center mb-2 p-2">
        <h2 className="text-sm font-semibold">Output</h2>
        <div className="flex gap-2">
          <button
            className="px-2 py-1 bg-emerald-800 hover:bg-emerald-950 rounded-lg text-sm"
            onClick={handleRunCode}
          >
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
      <div className="w-full h-full p-2 bg-black  overflow-auto font-mono text-sm whitespace-pre-wrap">
        {loading ? <Loader /> : output}
      </div>
    </div>
  );
};

export default Output;
