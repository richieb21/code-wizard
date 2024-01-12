import { useEffect, useState } from 'react'
import './App.css'
import ChatContainer from './components/ChatContainer'
import Prompt from './components/prompt'
import Header from './components/Header'
import History from './components/History'

function App() {
  
  const [isTyping, setIsTyping] = useState(false);
  const [firstPrompt, setFirstPrompt] = useState(false);

  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("")
  const [currentConvo, setCurrentConvo] = useState([{ "role": "system", "content": "You are an expert in coding and programming and are giving advice for code related questions. If the question is unrelated to code, do not under any cirucmstances answer it." }]);
  const [convoID, setConvoID] = useState("")

  const addMessage = (isAi, messageText) => {
    const newMessage = {
        isAi,
        value: messageText
    }
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }

  //To change the prompt as the user enters their prompt
  const handleChange = (e) => {
    e.preventDefault();
    setPrompt(e.target.value);
  }

  //When the user submits, send necessary data to the backend.
  const handleSubmit = async (e) => {
    e.preventDefault();
    addMessage(false, prompt)

    const updatedConvo = [...currentConvo, { "role": "user", "content": prompt }]
    setCurrentConvo(updatedConvo)
    setPrompt("")
    setIsTyping(true)

    const responseData = await postData(updatedConvo,'http://localhost:3000')
    const updatedResponse = [...updatedConvo, { "role":"assistant","content":responseData.bot }]

    //if it is the first prompt of the conversation
    if (!firstPrompt){
      const responseTitle = await postData(updatedResponse, 'http://localhost:3000/title')
      await startConversation({title:responseTitle.title, messages:updatedResponse}, 'http://localhost:3000/start-conversation')

      setTitle(responseTitle.title);
      setFirstPrompt(true)
    }

    if (responseData && responseData.bot) {
      addMessage(true, responseData.bot)
      setCurrentConvo(prevConvos => [...prevConvos, {"role":"assistant","content":`${responseData.bot}`}])
    }

    if(firstPrompt){
      updateConversation({ messages: [{ "role": "user", "content": prompt }, {"role":"assistant","content":responseData.bot}] }, `http://localhost:3000/conversations/${convoID}`);
    }

    setIsTyping(false)
  }

  async function startConversation(input, url){
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: input.title,
          messages: input.messages
        })
      });
  
      if (!response.ok) {
        // check if response status code is not OK (e.g., 404, 500, etc.)
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json()
      setConvoID(data.convo_id)

    } catch (error) {
      console.error('Error:', error);
      // Handle or rethrow the error as needed
    }
  }

  async function updateConversation(input, url) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: input.messages
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

  function translateMessages(originalMessages) {
    return originalMessages.map(message => {
      return {
        isAi: message.role === "assistant",
        value: message.content
      };
    }).slice(1)
  }

  function extractMessage(msg) {
    return msg.map(obj => {
      return {
        role: obj.role,
        content: obj.content
      };
    });
  }

  async function getID(id){
    const response = await fetch(`http://localhost:3000/conversations/${id}`)
    const data = await response.json()

    setTitle(data.title)
    setMessages(translateMessages(data.messages))
    setConvoID(id)
    setCurrentConvo(extractMessage(data.messages))
    setFirstPrompt(true);
  }

  return (
    <div className='app'>
      <History onHistoryClick={getID}/>
      <div className='conversation-container'>
        <Header title={title}/>
        <ChatContainer chat_messages={messages} isTyping={isTyping}/>
        <Prompt handleSubmit={handleSubmit} handleChange={handleChange} value={prompt} isTyping={isTyping}/>
      </div>
    </div>
  )
}

export default App
