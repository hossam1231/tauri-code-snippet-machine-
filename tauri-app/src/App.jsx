import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { open } from "@tauri-apps/api/dialog";
import { appDir } from "@tauri-apps/api/path";
// Open a selection dialog for directories
import { readDir, BaseDirectory } from "@tauri-apps/api/fs";

function App() {
  const [folderDir, setFolderDir] = useState("");
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

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
    <div className="container">
      <h1>Code Co-Pilot</h1>
      <p>Chose a folder to get started</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          openFolder();
        }}
      >
        <PathCard placeholder={folderDir ? folderDir : ""} />
        <button type="submit">Open</button>
      </form>
    </div>
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
