# AI Chat Assistant Frontend

A modern, ChatGPT-like chat interface built with React and Vite that connects to your AI backend via WebSocket.

## Features

- 🎨 Modern, responsive UI design inspired by ChatGPT
- 💬 Real-time chat with AI using WebSocket connections
- 📱 Mobile-responsive design
- ⌨️ Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- 🔄 Typing indicators and smooth animations
- 📝 Conversation history with timestamps
- 🔌 Connection status indicator
- 🎯 Auto-scroll to latest messages

## Getting Started

### Prerequisites

Make sure your backend server is running on port 3000 with WebSocket support.

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Usage

1. **Start Chatting**: Type your message in the input field at the bottom
2. **Send Messages**: Click the send button (📤) or press Enter
3. **New Lines**: Use Shift+Enter to create new lines in your message
4. **View History**: All conversations are displayed in the chat area above
5. **Connection Status**: Check the header for connection status (🟢 Connected / 🔴 Disconnected)

## Technical Details

- **Frontend**: React 19 with Hooks
- **Styling**: Modern CSS with gradients, animations, and responsive design
- **Communication**: WebSocket connection to backend
- **State Management**: React useState for local state
- **Real-time Updates**: Automatic message updates and typing indicators

## Backend Integration

The frontend expects a WebSocket server running on `ws://localhost:3000` that:
- Accepts messages with a `prompt` field
- Returns responses with a `response` field
- Handles connection errors gracefully

## Customization

You can easily customize the UI by modifying:
- `src/App.css` - Colors, spacing, and visual styling
- `src/App.jsx` - Chat logic and component structure

## Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.
