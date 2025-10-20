import React, { useEffect, useMemo, useRef, useState } from 'react'
import SidebarContent from '../components/chat/SidebarContent'
import ChatHeader from '../components/chat/ChatHeader'
import ChatMessages from '../components/chat/ChatMessages'
import ChatComposer from '../components/chat/ChatComposer'

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

const Home = () => {
  // Previous chats (left sidebar on desktop)
  const [chats, setChats] = useState([
    { id: 'c1', title: 'New chat' },
  ])
  const [activeChatId, setActiveChatId] = useState('c1')
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Messages are stored per chat
  const [messagesByChat, setMessagesByChat] = useState({ c1: [] })

  // User input
  const [input, setInput] = useState('')

  // Derived state
  const messages = useMemo(() => messagesByChat[activeChatId] || [], [messagesByChat, activeChatId])
  const activeChat = useMemo(() => chats.find(c => c.id === activeChatId), [chats, activeChatId])

  // Refs
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, activeChatId])

  const createNewChat = () => {
    const id = uid()
    const title = 'New chat'
    setChats(prev => [{ id, title }, ...prev])
    setMessagesByChat(prev => ({ ...prev, [id]: [] }))
    setActiveChatId(id)
    setDrawerOpen(false)
  }

  const switchChat = (id) => {
    setActiveChatId(id)
    setDrawerOpen(false)
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    // Add user message
    const userMsg = { id: uid(), role: 'user', text }
    setMessagesByChat(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), userMsg],
    }))
    setInput('')

    // If this is the first message for the chat, update its title from the text
    setChats(prev => {
      const next = prev.map(c => c.id === activeChatId ? { ...c, title: c.title === 'New chat' ? text.slice(0, 30) || 'New chat' : c.title } : c)
      // Move the active chat to the top (most recent first)
      const active = next.find(c => c.id === activeChatId)
      const others = next.filter(c => c.id !== activeChatId)
      return [active, ...others]
    })

    // Simulate AI reply
    setTimeout(() => {
      const aiMsg = { id: uid(), role: 'ai', text: `You said: ${text}` }
      setMessagesByChat(prev => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), aiMsg],
      }))
    }, 350)
  }

  // Components imported above will render sidebar, header, messages and composer

  return (
    <div className="chat-layout">
      {/* Sidebar (desktop) */}
      <aside className="chat-sidebar">
        <SidebarContent
          chats={chats}
          activeChatId={activeChatId}
          onNewChat={createNewChat}
          onSwitchChat={switchChat}
        />
      </aside>

      {/* Main chat area */}
      <section className="chat-main">
        {/* Mobile top bar with hamburger */}
        <div className="chat-mobilebar">
          <button className="hamburger" onClick={() => setDrawerOpen(true)}>☰</button>
          <div className="chat-brand">ChatGPT</div>
        </div>

        {messages.length === 0 ? (
          // Landing hero state (image1 style)
          <div className="landing-hero">
            <h1 className="landing-title">What are you working on?</h1>
            <div className="landing-composer">
              <ChatComposer
                input={input}
                setInput={setInput}
                onSubmit={sendMessage}
                variant="landing"
              />
            </div>
          </div>
        ) : (
          // Conversation state (image2 style)
          <>
            <ChatHeader title={activeChat?.title || 'Chat'} />
            <ChatMessages messages={messages} endRef={endRef} />
            <ChatComposer input={input} setInput={setInput} onSubmit={sendMessage} />
          </>
        )}
      </section>

      {/* Mobile drawer */}
      <div className={`drawer ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)}>
        <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
          <SidebarContent
            chats={chats}
            activeChatId={activeChatId}
            onNewChat={createNewChat}
            onSwitchChat={switchChat}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
