import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Upload from './Upload'


function App() {
  const [ url, setUrl ] = useState()
  const src = url || logo
  return (
    <div className="App">
      <header className="App-header">
        <img src={src} className="App-logo" alt="logo" />
        <Upload onChange={setUrl}>Upload image</Upload>
      </header>
    </div>
  )
}

export default App
