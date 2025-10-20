import React from 'react'

const SidebarContent = ({ chats, activeChatId, onNewChat, onSwitchChat }) => {
  return (
    <>
      <div className="chat-brand">AI Chat</div>
      <button className="chat-new" onClick={onNewChat}>+ New Chat</button>
      <div className="chat-list">
        {chats.map((c) => (
          <button
            key={c.id}
            className={`chat-item ${c.id === activeChatId ? 'active' : ''}`}
            onClick={() => onSwitchChat(c.id)}
          >
            {c.title}
          </button>
        ))}
      </div>
    </>
  )
}

export default SidebarContent
