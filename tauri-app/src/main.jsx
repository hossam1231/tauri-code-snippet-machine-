// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./styles.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Editor from '@monaco-editor/react';
import { open } from '@tauri-apps/api/dialog';
import { appDir } from '@tauri-apps/api/path';
// Open a selection dialog for directories
const selected = await open({
  directory: true,
  multiple: true,
  defaultPath: await appDir(),
});
if (Array.isArray(selected)) {
  // user selected multiple directories
} else if (selected === null) {
  // user cancelled the selection
} else {
  // user selected a single directory
}
function App() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current.getValue());
  }

  return (
    <>
      <button onClick={showValue}>Show value</button>
      <Editor
        height='90vh'
        defaultLanguage='javascript'
        defaultValue='// some comment'
        onMount={handleEditorDidMount}
      />
    </>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
