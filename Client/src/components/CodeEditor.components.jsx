import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import React, { useRef, useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import { boilerplates } from "../Constants";
import { Copy, StepBack, Moon, Sun, Loader2 } from "lucide-react";
import Output from "./Output";
import toast from "react-hot-toast";
import { initSocket } from "../../socket.io";
import { useLocation, useParams } from "react-router-dom";
import { memberStore } from "../store/members.store";

const CodeEditor = () => {
  const editorRef = useRef();
  const [InitialValue, setInitialValue] = useState(boilerplates["cpp"]);
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
  const [Typer, setTyper] = useState("");
  const [connecting, setConnecting] = useState(true);

  const { setAllMembers } = memberStore();
  const socketRef = useRef(null);
  const { roomId } = useParams();
  const location = useLocation();

  // -------------------
  // Handlers
  // -------------------
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setInitialValue(boilerplates[language]);
  };

  const toggleTheme = () => {
    setSelectedTheme((prev) => (prev === "vs-dark" ? "vs-light" : "vs-dark"));
  };

  const handleCodeCopy = () => {
    navigator.clipboard.writeText(InitialValue);
    toast.success("Code copied!");
  };

  const handleCodeClear = () => {
    setInitialValue(boilerplates[selectedLanguage]);
    handleCodeChange(boilerplates[selectedLanguage]);
    toast.success("Reset to Default Code");
  };

  const handleCodeChange = (value) => {
    setInitialValue(value);
    setTyper(location.state?.UserName);

    socketRef.current.emit("codechange", {
      roomId,
      code: value,
      typerSocketId: socketRef.current.id,
    });
  };

  const dismissConnecting = () => {
    setConnecting(false);
  };

  // -------------------
  // Socket Setup
  // -------------------
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.on("connect", () => {
        setConnecting(false);
        socketRef.current.emit("join", {
          roomId,
          username: location.state?.UserName,
        });
      });

      socketRef.current.on("userJoined", ({ username, allUsers }) => {
        setAllMembers(allUsers);
        toast.success(`${username} joined the room`);
      });

      socketRef.current.on("userLeft", ({ username, allUsers }) => {
        setAllMembers(allUsers);
        if (username) toast.error(`${username} left the room`);
      });

      socketRef.current.on("codeupdate", ({ code, typing }) => {
        setTyper(typing);
        setInitialValue(code);
      });
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 text-white">
      {/* Connecting Modal */}
      {connecting && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex flex-col justify-center items-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg flex flex-col items-center gap-4">
            <div className="animate-spin text-amber-500">
              <Loader2 size={48} />
            </div>
            <span className="text-white text-lg font-medium">
              Connecting to server...
            </span>
            <span>You can still Run your code </span>
            <span>You will get Notified when connection is established</span>
            <button
              className="px-4 py-2 bg-red-600 rounded hover:bg-amber-600 transition"
              onClick={dismissConnecting}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-800 bg-zinc-900">
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Language:</span>
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onSelect={handleLanguageSelect}
            />
          </div>

          {/* Theme Toggle */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleTheme}
          >
            <span className="text-sm font-medium">Theme:</span>
            {selectedTheme === "vs-dark" ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
          </div>

          {/* Recent Typer */}
          <div className="ml-6 text-xs text-zinc-400 border-l pl-4 border-zinc-700">
            Recent changes by:{" "}
            <span className="text-amber-400">{Typer || "—"}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCodeClear}
            className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-sm hover:bg-red-600 transition"
            title="Reset code"
          >
            Reset
            <StepBack size={16} />
          </button>

          <button
            onClick={handleCodeCopy}
            className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-sm hover:bg-amber-600 transition"
            title="Copy code"
          >
            Copy
            <Copy size={16} />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          language={selectedLanguage}
          theme={selectedTheme}
          value={InitialValue}
          onMount={handleEditorDidMount}
          onChange={handleCodeChange}
          options={{
            fontSize: 14,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
          }}
        />
      </div>

      {/* Output */}
      <div className="h-[30%] border-t border-zinc-800 bg-zinc-900">
        <Output language={selectedLanguage} code={InitialValue} />
      </div>
    </div>
  );
};

export default CodeEditor;
