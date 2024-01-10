import React from 'react'
import bot from '../assets/bot.svg'
import user from '../assets/user.svg'
import CodeBlock from './CodeBlock'

const ChatStripe = ({isAi, value, uniqueID, color}) => {
  
  return (
    <div className={'wrapper ' + color}>
        <div className='chat'>
            <div className='profile'>
                <img src={isAi ? bot : user} alt={isAi ? "bot" : "user"}/>
            </div>
            <div className='message' id={uniqueID}><CodeBlock content={value}/></div>
        </div>
    </div>
  )
}

export default ChatStripe