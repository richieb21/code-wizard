import React from 'react'
import bot from '../assets/bot.svg'
import user from '../assets/user.svg'

const ChatStripe = ({isAi, value, uniqueID}) => {

  return (
    <div className='wrapper'>
        <div className='chat'>
            <div className='profile'>
                <img src={isAi ? bot : user} alt={isAi ? "bot" : "user"}/>
            </div>
            <div className='message' id={uniqueID}>{value}</div>
        </div>
    </div>
  )
}

export default ChatStripe