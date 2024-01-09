import React, { useEffect, useRef, useState } from 'react'

import ChatStripe from './ChatStripe';

const ChatContainer = ({ chat_messages }) => {

    return (
        <div className='chat-container'>
            {chat_messages.map((msg, index) => (
                <ChatStripe key={index} isAi={msg.isAi} value={msg.value} uniqueID={msg.uniqueID}/>
            ))}
        </div>
    )
}

export default ChatContainer