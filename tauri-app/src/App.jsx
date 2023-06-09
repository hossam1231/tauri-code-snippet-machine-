import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { open } from "@tauri-apps/api/dialog";
import { appDir } from "@tauri-apps/api/path";
// Open a selection dialog for directories
import { readDir, BaseDirectory } from "@tauri-apps/api/fs";
import AppLayout from "./App.layout";
import path from "path";

function App() {
  const [folderDir, setFolderDir] = useState("");
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [entries, setEntries] = useState();

  var folderOrder = folderDir.split("/");
  console.log(folderOrder);

  async function readFolder(path) {
    if (!path) return;
    const entries = await readDir(path, { recursive: true });
    processEntries(entries);
    function processEntries(entries) {
      for (const entry of entries) {
        console.log(`Entry: ${entry.path}`);
        if (entry.children) {
          processEntries(entry.children);
        }
      }
    }
  }

  async function openFolder() {
    const selected = await open({
      directory: true,
      // multiple: true,
      recursive: true,
      defaultPath: await appDir(),
    });
    if (Array.isArray(selected)) {
      // user selected multiple directories
    } else if (selected === null) {
      // user cancelled the selection
    } else {
      setFolderDir(selected);
      readFolder(selected);
      // traverseFolder(path)
      // user selected a single directory
    }
  }

  return (
    <AppLayout
      overView={{
        appPath: (
          <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <div>
              <div className="flex items-center gap-x-3">
                <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
                  <div className="h-2 w-2 rounded-full bg-current" />
                </div>
                <h1 className="flex gap-x-3 text-base leading-7">
                  <span className="font-semibold text-white">
                    {[...folderOrder].pop() || "Select a folder to get started"}
                  </span>
                  {/* <span className="text-gray-600">/</span>
              <span className="font-semibold text-white">{}</span> */}
                </h1>
              </div>
              <p className="mt-2 text-xs leading-6 text-gray-400">
                Your project path {folderDir}
              </p>
            </div>
            <div
              onClick={() => {
                openFolder();
              }}
              className="order-first flex-none rounded-full bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30 sm:order-none"
            >
              Change
            </div>
          </div>
        ),
      }}
    >
      {/* <div
       
        className="row"
      >
        <PathCard placeholder={folderDir ? folderDir : ""} />
      </div> */}
    </AppLayout>
  );
}

function PathCard({ props, placeholder }) {
  return (
    <input
      style={{ boxShadow: placeholder && "0px 0px 5px green" }}
      disabled
      id="greet-input"
      placeholder={placeholder || "Select a path..."}
    />
  );
}

export default App;
