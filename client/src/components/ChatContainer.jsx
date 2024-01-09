import React, { useEffect, useState } from 'react'

import ChatStripe from './ChatStripe';

const ChatContainer = ({ chat_messages, isTyping }) => {

    const [typingIndicator, setTypingIndicator] = useState("");

    useEffect(() => {
        let typingTimer;
        if (isTyping) {
            let dots = '';
            typingTimer = setInterval(() => {
                dots = dots.length < 3 ? dots + '.' : '';
                setTypingIndicator(dots);
            }, 200); 
        }

        return () => {
            clearInterval(typingTimer); // Clear interval when component unmounts or isTyping changes
        };
    }, [isTyping]);

    return (
        <div className='chat-container'>
            {chat_messages.map((msg, index) => (
                <ChatStripe key={index} isAi={msg.isAi} value={msg.value} uniqueID={msg.uniqueID} color={msg.isAi ? "ai-stripe": ""}/>
            ))}
            
            {isTyping && <ChatStripe isAi={true} value={typingIndicator} uniqueID={"none"} color={"ai-stripe"}/>}
        </div>
    )
}

export default ChatContainer