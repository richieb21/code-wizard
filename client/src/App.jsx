import { useEffect, useState } from 'react'
import './App.css'
import ChatContainer from './components/ChatContainer'
import Prompt from './components/prompt'
import generateID from './components/scripts'

function App() {
  
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (isAi, messageText) => {
    const newMessage = {
        isAi,
        value: messageText,
        uniqueID: generateID()
    }
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }

  const removeMessage= () => {
    setMessages(messages.slice(0, -1))
  }

  const handleChange = (e) => {
    e.preventDefault();
    setPrompt(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    addMessage(false, prompt)

    setPrompt("")
    setIsTyping(true)

    const responseData = await postData(prompt)
    if (responseData && responseData.bot) {
      addMessage(true, responseData.bot)// Add bot's response as a new message
    }

    setIsTyping(false)
  }

  async function postData(input) {
    try {
      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: input
        })
      });
  
      if (!response.ok) {
        // check if response status code is not OK (e.g., 404, 500, etc.)
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      // Handle or rethrow the error as needed
    }
  }

  return (
    <div className='app'>
      <ChatContainer chat_messages={messages} isTyping={isTyping}/>
      <Prompt handleSubmit={handleSubmit} handleChange={handleChange} value={prompt}/>
    </div>
  )
}

export default App
