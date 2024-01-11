import React from 'react'

const HistoryBlock = ({ title, id }) => {
  return (
    <div key={id} className='history-block'>
        <h3 className='text'>{title}</h3>
    </div>
  )
}

export default HistoryBlock