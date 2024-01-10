import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import React from 'react'

const CodeBlock = ({ content }) => {

  const segments = parseText(content);

  return (
      <div>
          {segments.map((segment, index) => {
              if (segment.type === 'code') {
                  return (
                      <div key={index} className="code-block">
                        <SyntaxHighlighter key={index} language={segment.language} style={atomOneDark}>
                            {segment.content}
                        </SyntaxHighlighter>
                      </div>
                  );
              } else {
                  return <div key={index} className="message">{segment.content}</div>;
              }
          })}
      </div>
  );
}

function parseText(text) {
  const regex = /```(\w+)?\s*([\s\S]*?)```/g; // Updated regex
  let result;
  const segments = [];
  let lastIndex = 0;

  while ((result = regex.exec(text)) !== null) {
      // Text before code block
      if (result.index > lastIndex) {
          segments.push({ type: 'text', content: text.slice(lastIndex, result.index) });
      }

      // Code block
      const language = result[1] || 'plaintext'; // Default to 'plaintext' if no language is specified
      segments.push({ type: 'code', content: result[2], language });

      lastIndex = regex.lastIndex;
  }

  // Text after the last code block
  if (lastIndex < text.length) {
      segments.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return segments;
}

export default CodeBlock