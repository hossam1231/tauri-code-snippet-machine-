import { invoke } from '@tauri-apps/api';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Editor from '@monaco-editor/react';

function App() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  async function showValue() {
    // now we can call our Command!
    // Right-click the application background and open the developer tools.
    // You will see "Hello, World!" printed in the console!
    invoke('greet', { name: 'World' })
      // `invoke` returns a Promise
      .then((response) => alert(response));
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
