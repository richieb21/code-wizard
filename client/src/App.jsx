import { useState } from 'react'
import './App.css'
import ChatContainer from './components/ChatContainer'
import Prompt from './components/prompt'
import generateID from './components/scripts'
import Header from './components/Header'

function App() {
  
  const [isTyping, setIsTyping] = useState(false);
  const [firstPrompt, setFirstPrompt] = useState(false);

  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("")
  const [currentConvo, setCurrentConvo] = useState([{ "role": "system", "content": "You are an expert in coding and programming and are giving advice for code related questions" }]);

  const addMessage = (isAi, messageText) => {
    const newMessage = {
        isAi,
        value: messageText,
        uniqueID: generateID()
    }
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }

  const handleChange = (e) => {
    e.preventDefault();
    setPrompt(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    addMessage(false, prompt)

    const updatedConvo = [...currentConvo, { "role": "user", "content": prompt }];
    setCurrentConvo(updatedConvo)
    setPrompt("")
    setIsTyping(true)

    if (!firstPrompt){
      const responseTitle = await postData(updatedConvo, 'http://localhost:3000/title')
      console.log(responseTitle.title)
      setTitle(responseTitle.title);
      setFirstPrompt(true)
    }

    const responseData = await postData(updatedConvo,'http://localhost:3000')
    if (responseData && responseData.bot) {
      addMessage(true, responseData.bot)
      setCurrentConvo(prevConvos => [...prevConvos, {"role":"assistant","content":`${responseData.bot}`}])
    }

    setIsTyping(false)
  }

  async function postData(input, url) {
    try {
      const response = await fetch(url, {
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
      <Header title={title}/>
      <ChatContainer chat_messages={messages} isTyping={isTyping}/>
      <Prompt handleSubmit={handleSubmit} handleChange={handleChange} value={prompt} isTyping={isTyping}/>
    </div>
  )
}

export default App
