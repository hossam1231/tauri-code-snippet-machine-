// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
import { invoke } from '@tauri-apps/api/tauri';
// import './App.css';
// import Home from './pages/Home/Home';

// function App() {
//   const [greetMsg, setGreetMsg] = useState('');
//   const [name, setName] = useState('');

//   async function greet() {
//     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//     setGreetMsg(await invoke('greet', { name }));
//   }

//   return (
//     <div className='container'>
//       <h1>Welcome to Tauri!</h1>

//       <div className='row'>
//         <a
//           href='https://vitejs.dev'
//           target='_blank'>
//           <img
//             src='/vite.svg'
//             className='logo vite'
//             alt='Vite logo'
//           />
//         </a>
//         <a
//           href='https://tauri.app'
//           target='_blank'>
//           <img
//             src='/tauri.svg'
//             className='logo tauri'
//             alt='Tauri logo'
//           />
//         </a>
//         <a
//           href='https://reactjs.org'
//           target='_blank'>
//           <img
//             src={reactLogo}
//             className='logo react'
//             alt='React logo'
//           />
//         </a>
//       </div>

//       <p>Click on the Tauri, Vite, and React logos to learn more.</p>
//       <Home />
//       <form
//         className='row'
//         onSubmit={(e) => {
//           e.preventDefault();
//           greet();
//         }}>
//         <input
//           id='greet-input'
//           onChange={(e) => setName(e.currentTarget.value)}
//           placeholder='Enter a name...'z
//         />
//         <button type='submit'>Greet</button>
//       </form>

//       <p>{greetMsg}</p>
//     </div>
//   );
// }

// export default App;
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import Editor from '@monaco-editor/react';

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
