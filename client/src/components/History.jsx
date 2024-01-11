import React from 'react'

const History = ({ conversations }) => {
  return (
      <div>
          {conversations.map(convo => (
              <h2 key={convo._id}>{convo.title}</h2> // Ensure you return the JSX element
          ))}
      </div>
  );
}

export default History