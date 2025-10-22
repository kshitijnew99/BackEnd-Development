import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SidebarContent = ({ chats, activeChatId, onNewChat, onSwitchChat }) => {
  const scrollRef = useRef(null)
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const avatarRef = useRef(null)

  // Read user from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('user')
      if (raw) setUser(JSON.parse(raw))
    } catch (_) {
      // ignore
    }
  }, [])
  // Listen to cross-tab updates (optional)
  useEffect(() => {
    const onStorage = () => {
      try {
        const raw = localStorage.getItem('user')
        setUser(raw ? JSON.parse(raw) : null)
      } catch (_) {}
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    // When chats update (new chat created), ensure list is scrolled to top
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [chats])

  // Close user menu on outside click or ESC
  useEffect(() => {
    const onDown = (e) => {
      if (!menuOpen) return
      const t = e.target
      if (menuRef.current && !menuRef.current.contains(t) && avatarRef.current && !avatarRef.current.contains(t)) {
        setMenuOpen(false)
      }
    }
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const logout = () => {
    try { localStorage.removeItem('user') } catch (_) {}
    setUser(null)
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <>
      <div className="chat-brand">ChatGPT</div>
      <button className="chat-new" onClick={onNewChat}>+ New Chat</button>
      <div className="chat-scroll" ref={scrollRef}>
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
      </div>

      {/* Footer auth/avatar */}
      <div className="chat-footer">
        {!user ? (
          <button className="auth-btn" onClick={() => navigate('/register')}>
            Sign up / Sign in
          </button>
        ) : (
          <div className="user-menu">
            <button
              ref={avatarRef}
              className="avatar-btn"
              title={user.firstName || 'User'}
              onClick={() => setMenuOpen(v => !v)}
            >
              {(user.firstName?.[0] || '?').toUpperCase()}
            </button>
            {menuOpen && (
              <div className="menu" ref={menuRef} role="menu">
                <div className="menu-meta">
                  <div className="menu-name">{user.firstName || 'User'}</div>
                  <div className="menu-email">{user.email || ''}</div>
                </div>
                <button className="menu-item" onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default SidebarContent
