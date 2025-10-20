import React from 'react'

const ChatHeader = ({ title }) => {
  return (
    <header className="chat-header">
      <h2 style={{ margin: 0 }}>{title}</h2>
    </header>
  )
}

export default ChatHeader
