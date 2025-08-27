import { Clipboard, Loader2, Play, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Output = ({ language, code }) => {
  const [output, setOutput] = useState(
    "Your program output will appear here..."
  );
  const [loading, setLoading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Output copied!");
  };

  const handleClear = () => {
    setOutput("Your program output will appear here...");
  };

  const handleRunCode = async () => {
    setLoading(true);
    setOutput("⏳ Running your code...");

    try {
      const res = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
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

      if (result.stderr) {
        setOutput(result.stderr);
      } else {
        setOutput(result.stdout || "⚠️ No output");
      }
    } catch (err) {
      setOutput("❌ Error running code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e2f] text-white shadow-lg border border-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700 bg-[#2a2a40] ">
        <h2 className="text-sm font-semibold tracking-wide">Output</h2>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium transition"
            onClick={handleRunCode}
            disabled={loading}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Play size={16} />
            )}
            Run
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition"
            title="Copy output"
          >
            <Clipboard size={16} />
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Output content */}
      <div className="flex-1 p-3 bg-black font-mono text-sm overflow-auto whitespace-pre-wrap ">
        {loading ? (
          <div className="flex items-center gap-2 text-gray-400">
            <Loader2 size={18} className="animate-spin" />
            Running...
          </div>
        ) : (
          output
        )}
      </div>
    </div>
  );
};

export default Output;
