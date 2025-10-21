import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialId = 'c1'

const initialState = {
  chats: [{ id: initialId, title: 'New chat' }],
  activeChatId: initialId,
  messagesByChat: { [initialId]: [] },
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createChat: (state, action) => {
      const id = nanoid()
      const provided = action && action.payload && action.payload.title
      const title = (typeof provided === 'string' ? provided.trim() : '') || 'New chat'
      state.chats.unshift({ id, title })
      state.messagesByChat[id] = []
      state.activeChatId = id
    },
    switchChat: (state, action) => {
      state.activeChatId = action.payload
    },
    sendMessage: {
      reducer: (state, action) => {
        const { chatId, role, text } = action.payload
        const msg = { id: nanoid(), role, text }
        const arr = state.messagesByChat[chatId] || []
        arr.push(msg)
        state.messagesByChat[chatId] = arr
        // set title from first user message
        const chat = state.chats.find(c => c.id === chatId)
        if (chat && chat.title === 'New chat' && role === 'user') {
          chat.title = text.slice(0, 30) || 'New chat'
        }
        // move chat to top as most recent
        state.chats = [chat, ...state.chats.filter(c => c.id !== chatId)]
      },
      prepare: ({ role, text }, getState) => {
        return { payload: { chatId: getState ? getState().chat.activeChatId : '', role, text } }
      },
    },
    addMessageToChat: (state, action) => {
      const { chatId, role, text } = action.payload
      const msg = { id: nanoid(), role, text }
      const arr = state.messagesByChat[chatId] || []
      arr.push(msg)
      state.messagesByChat[chatId] = arr
      // If first user message, set chat title from it
      const chat = state.chats.find(c => c.id === chatId)
      if (chat && chat.title === 'New chat' && role === 'user') {
        chat.title = (text || '').slice(0, 30) || 'New chat'
      }
      // Move active chat to top as most recent
      if (chat) {
        state.chats = [chat, ...state.chats.filter(c => c.id !== chatId)]
      }
    },
    setActiveChat: (state, action) => {
      state.activeChatId = action.payload
    },
    setChatTitle: (state, action) => {
      const { id, title } = action.payload || {}
      const chat = state.chats.find(c => c.id === id)
      if (chat) {
        const t = (typeof title === 'string' ? title.trim() : '') || 'New chat'
        chat.title = t.slice(0, 60)
      }
    },
  },
})

export const { createChat, switchChat, sendMessage, addMessageToChat, setActiveChat, setChatTitle } = chatSlice.actions
export default chatSlice.reducer
