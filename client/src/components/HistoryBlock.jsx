import React from 'react'
import x from '../assets/x-circle.svg'

const HistoryBlock = ({ title, id, onClick }) => {

    const deleteConversation = (conversationId) => {
        fetch(`http://localhost:3000/conversations/${conversationId}`, {
          method: 'DELETE',
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      };

//fix deletion bug

  return (
    <div key={id} className='history-block'>
        <h3 className='text' onClick={onClick}>{title}</h3>
        <button onClick={() => deleteConversation(id)}><img src={x}></img></button>
    </div>
  )
}

export default HistoryBlock