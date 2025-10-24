import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createChat, setActiveChat, addMessageToChat, setChatTitle , setChats } from '../store/chatSlice'
import SidebarContent from '../components/chat/SidebarContent'
import ChatHeader from '../components/chat/ChatHeader'
import ChatMessages from '../components/chat/ChatMessages'
import ChatComposer from '../components/chat/ChatComposer'
import axios from 'axios'

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

const Home = () => {

  const dispatch = useDispatch()
  const chats = useSelector(state => state.chat.chats)
  const activeChatId = useSelector(state => state.chat.activeChatId)
  const messagesByChat = useSelector(state => state.chat.messagesByChat)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // User input
  const [input, setInput] = useState('')

  // Derived state
  const messages = useMemo(() => messagesByChat[activeChatId] || [], [messagesByChat, activeChatId])
  const activeChat = useMemo(() => chats.find(c => c.id === activeChatId), [chats, activeChatId])

  // Refs
  const endRef = useRef(null)

  // Auto-scroll when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, activeChatId])

  // Hydrate chats from backend on mount (after login/route change)
  useEffect(() => {
    axios.get('http://localhost:3000/chat/', { withCredentials: true })
      .then((res) => {
        dispatch(setChats(res.data.chats))
      })
      .catch(() => {})
  }, [])

  const createNewChat =  async () => {
    // Prompt for a session name first
    const name = window.prompt('Name this chat session', 'New chat')
    const title = (name && name.trim()) ? name.trim() : 'New chat'

    // Also create chat on the server (requires auth cookie)
    const res = await axios.post('http://localhost:3000/chat/', { title }, { withCredentials: true })

    console.log('New chat created on server:', res.data.chat)

    // Create chat locally (Redux) with the given title and activate it
    dispatch(createChat(res.data.chat))


      
    setDrawerOpen(false)
  }

  const switchChat = (id) => {
    dispatch(setActiveChat(id))
    setDrawerOpen(false)
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    // Naming and server creation now happen when clicking "+ New Chat"

    // Add user message to redux
    dispatch(addMessageToChat({ chatId: activeChatId, role: 'user', text }))
    setInput('')

    // Simulate AI reply
    setTimeout(() => {
      dispatch(addMessageToChat({ chatId: activeChatId, role: 'ai', text: `You said: ${text}` }))
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
  <section className={`chat-main ${messages.length === 0 ? 'landing' : ''}`}>
        {/* Mobile top bar with hamburger */}
        <div className="chat-mobilebar">
          <button className="hamburger" onClick={() => setDrawerOpen(true)}>☰</button>
          <div className="chat-brand">ChatGPT</div>
        </div>

        {messages.length === 0 ? (
          // Landing state: desktop has centered hero with composer; mobile has composer pinned at bottom
          <>
            <div className="landing-hero">
              <h1 className="landing-title">What are you working on?</h1>
              <div className="landing-composer show-desktop">
                <ChatComposer
                  input={input}
                  setInput={setInput}
                  onSubmit={sendMessage}
                  variant="landing"
                />
              </div>
            </div>
            <div className="show-mobile">
              <ChatComposer input={input} setInput={setInput} onSubmit={sendMessage} />
            </div>
          </>
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
