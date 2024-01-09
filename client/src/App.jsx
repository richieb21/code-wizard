import { useState } from 'react'
import './App.css'
import ChatContainer from './components/ChatContainer'
import Prompt from './components/prompt'
import generateID from './components/scripts'

function App() {
  
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");

  const addMessage = (isAi, messageText) => {
    const newMessage = {
        isAi,
        value: messageText,
        uniqueID: generateID()
    }

    setMessages([...messages, newMessage])
  }

  const handleChange = (e) => {
    e.preventDefault();
    setPrompt(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage(false, prompt)
    setPrompt("")
    
  }



  return (
    <div>
      <ChatContainer messages={messages}/>
      <Prompt handleSubmit={handleSubmit} handleChange={handleChange} value={prompt}/>
    </div>
  )
}

export default App
