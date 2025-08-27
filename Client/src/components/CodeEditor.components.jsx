import Editor from "@monaco-editor/react";

import * as monaco from "monaco-editor";
import React, { useRef, useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import { boilerplates } from "../Constants";
import EditorNavbar from "./EditorNavbar.components";
import { Copy, Delete, Moon, StepBack, Sun, Trash } from "lucide-react";
import Output from "./Output";
import toast from "react-hot-toast";
import { initSocket } from "../../socket.io";
import { useLocation, useParams } from "react-router-dom";
import { memberStore } from "../store/members.store";

// import ThemeSelector from "./ThemeSelector";
// import { loadTheme } from "monaco-themes";
// import dracula from "monaco-themes/themes/Dracula.json";
// import monokai from "monaco-themes/themes/Monokai.json";

// monaco.editor.defineTheme("dracula", dracula);
// monaco.editor.defineTheme("monokai", monokai);

const CodeEditor = () => {
  const editorRef = useRef();
  const [InitialValue, setInitialValue] = useState(boilerplates["cpp"]);
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
  const [out, setOut] = useState("Hello, world!\nLine 2\nLine 3");

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }

  function onSelect(language) {
    setSelectedLanguage(language);
    setInitialValue(boilerplates[language]);
  }

  function setTheme() {
    if (selectedTheme === "vs-dark") {
      setSelectedTheme("vs-light");
    } else {
      setSelectedTheme("vs-dark");
    }
  }

  function handleCodeCopy() {
    navigator.clipboard.writeText(InitialValue);
    toast.success("code copied!");
  }

  function handleCodeClear() {
    setInitialValue(boilerplates[selectedLanguage]);
    toast.success("Reset to Default Code");
  }

  //   async function onSelectTheme(themeName) {
  //     console.log("in on select theme");

  //     // const theme = await loadTheme(themeName);
  //     // monaco.editor.defineTheme(themeName.toLowerCase(), theme);
  //     setSelectedTheme(themeName.toLowerCase());
  //     console.log(selectedTheme);
  //   }

  //   useEffect(() => {
  //     console.log("Language updated:", selectedLanguage);
  //   }, [selectedLanguage]);

  const { setAllMembers, allMembers } = memberStore();
  const socketRef = useRef(null);
  const { roomId } = useParams();
  const location = useLocation();

  const [Text, setText] = useState("text here");
  const [Typer, setTyper] = useState("");

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.emit("join", {
        roomId,
        username: location.state?.UserName,
      });

      socketRef.current.on("userJoined", ({ userId, username, allUsers }) => {
        setAllMembers(allUsers);

        toast.success(`${username} joined the room`);
      });

      socketRef.current.on("userLeft", ({ userId, username, allUsers }) => {
        setAllMembers(allUsers);
        if (username) {
          toast.error(`${username} left the room`);
        }
      });

      socketRef.current.on("codeupdate", ({ code, typing }) => {
        setTyper(typing);
        // console.log(typing);

        setInitialValue(code);
      });

      socketRef.current.on("textupdate", (text) => {
        setText(text);
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

  function handleCodeChange(value) {
    setInitialValue(value);
    // console.log(value);
    // console.log(socketRef.current.id);
    setTyper(location.state?.UserName);

    socketRef.current.emit("codechange", {
      roomId: roomId,
      code: value,
      typerSocketId: socketRef.current.id,
    });
  }

  function handletextarea(e) {
    e.preventDefault();
    const { value } = e.target;
    setText(value);

    socketRef.current.emit("textchange", { roomId: roomId, text: value });
  }

  return (
    <div
      className="w-full
     h-full"
    >
      {/* <textarea
        name=""
        id="textarea"
        width={80}
        value={Text}
        onChange={handletextarea}
      ></textarea> */}
      <div className="w-full h-16 flex items-center p-4 font-bold">
        <div className="w-full h-16 flex items-center p-4 font-bold">
          <span>Language: </span>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onSelect={onSelect}
          />
          <span className="ml-2">Theme:</span>
          {/*<ThemeSelector selectedTheme={selectedTheme} onSelect={onSelectTheme} /> */}
          <div className="ml-2" onClick={setTheme}>
            {selectedTheme === "vs-dark" ? <Moon /> : <Sun />}
          </div>
          <div className="ml-2 text-gray-600 font-light text-sm border-l-1 border-l-amber-600 px-2">
            {" "}
            Recent changes by: <span className="text-gray-400">{Typer}</span>
          </div>
        </div>
        <div className="flex items-center justify-between w-116  ">
          <button
            className="flex  items-center mr-4 rounded-2xl border-2 border-gray-800 py-2 px-4 hover:bg-red-600 hover:animate-pulse"
            onClick={handleCodeClear}
            title="Reset to boilerplate code"
          >
            <span>Reset Code</span>
            <StepBack className="ml-4" />
          </button>
          <button
            className="flex items-center rounded-2xl border-2 border-gray-800 py-2 px-4 hover:bg-amber-600 hover:animate-pulse"
            onClick={handleCodeCopy}
            title="copy code"
          >
            <span>Copy code</span>
            <Copy className="ml-4" />
          </button>
        </div>
      </div>
      <Editor
        language={selectedLanguage}
        height="67%"
        width="100%"
        theme={selectedTheme}
        onMount={handleEditorDidMount}
        value={InitialValue}
        onChange={handleCodeChange}
      />
      <div className="h-[33%]" code={InitialValue}>
        <Output />
      </div>
    </div>
  );
};

export default CodeEditor;
