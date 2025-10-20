import React from 'react'

const ChatMessages = ({ messages, endRef }) => {
  return (
    <div className="chat-messages">
      <ul className="chat-listview">
        {messages.map(m => (
          <li key={m.id} className={`chat-row ${m.role === 'user' ? 'user' : 'ai'}`}>
            <div className={`chat-bubble ${m.role === 'user' ? 'user' : 'ai'}`}>{m.text}</div>
          </li>
        ))}
        <li ref={endRef} />
      </ul>
    </div>
  )
}

export default ChatMessages
