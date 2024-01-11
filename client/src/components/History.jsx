import React from 'react'
import HistoryBlock from './HistoryBlock';

const History = ({ conversations }) => {
  return (
      <div className='history-container'>
          <h1 className='logo'>Code Wizard</h1>
          {conversations.map((convo, index) => (
              <HistoryBlock title={convo.title} id={convo._id} key={index}/> // Ensure you return the JSX element
          ))}
      </div>
  );
}

export default History