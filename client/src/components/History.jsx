import React, { useEffect, useState } from 'react'
import HistoryBlock from './HistoryBlock';

const History = ( { onHistoryClick } ) => {

  const [conversations, setConversations] = useState([])

  async function fetchConversations() {
    try {
        const response = await fetch('http://localhost:3000/conversations');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const conversations = await response.json();
        setConversations(conversations); // Use the fetched conversations as needed
    } catch (error) {
        console.error('Fetch error:', error);
    }
  }

  useEffect(() => {
    fetchConversations()
  })



  return (
      <div className='history-container'>
          <h1 className='logo'>Code Wizard</h1>
          {conversations.map((convo, index) => (
              <HistoryBlock 
                title={convo.title} 
                id={convo._id} 
                onClick={() => onHistoryClick(convo._id)}
                key={index}
              /> // Ensure you return the JSX element
          ))}
      </div>
  );
}

export default History