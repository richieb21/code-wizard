import React, { useEffect, useRef, useState } from 'react'

import ChatStripe from './ChatStripe';

const ChatContainer = ({ messages }) => {

    const [typingIndicator, setTypingIndicator] = useState('');
    const typingTimer = useRef(null);

    const startTypingIndicator = () => {
        if (typingTimer.current) clearInterval(typingTimer.current); // Clear existing interval
        let dots = '.';
        typingTimer.current = setInterval(() => {
            dots = dots.length < 4 ? dots + '.' : '';
            setTypingIndicator(dots);
        }, 200);
    };

    const stopTypingIndicator = () => {
        if (typingTimer.current) clearInterval(typingTimer.current);
        setTypingIndicator('');
    };

    useEffect(() => {
        // Example condition: Start typing indicator when a new message is being processed
        if (messages.length && !messages[messages.length - 1].isAi) {
            startTypingIndicator();
            // Stop typing indicator after some delay (e.g., when the response is expected)
        }
    }, [messages]);
    return (
        <div className='chat-container'>
            {messages.map((msg, index) => (
                <ChatStripe key={index} isAi={msg.isAi} value={msg.value} uniqueID={msg.uniqueID}/>
            ))}
            <ChatStripe isAi={true} value={typingIndicator} />
        </div>
    )
}

export default ChatContainer