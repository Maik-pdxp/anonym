import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useMatchmaking } from './hooks/useMatchmaking'
import SplashScreen from './components/SplashScreen'
import SearchingScreen from './components/SearchingScreen'
import ChatScreen from './components/ChatScreen'
import EndedScreen from './components/EndedScreen'
import styles from './App.module.css'

export default function App() {
  const { user, loading } = useAuth()
  const {
    status,
    chatId,
    startSearching,
    cancelSearching,
    closeChat,
    reset,
  } = useMatchmaking(user)

  const [partnerLeft, setPartnerLeft] = useState(false)

  function handlePartnerLeft() {
    setPartnerLeft(true)
    reset()
    // Show ended screen
    // We push the status to 'ended' via reset + partnerLeft flag
  }

  function handleReset() {
    setPartnerLeft(false)
    reset()
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <span className={styles.loadingDot} />
      </div>
    )
  }

  const showEnded = status === 'ended' || partnerLeft

  return (
    <div className={styles.app}>
      <div className={styles.phone}>
        {status === 'idle' && !showEnded && (
          <SplashScreen onConnect={startSearching} />
        )}
        {status === 'searching' && (
          <SearchingScreen onCancel={cancelSearching} />
        )}
        {status === 'chatting' && chatId && (
          <ChatScreen
            chatId={chatId}
            userId={user.id}
            onClose={closeChat}
            onPartnerLeft={handlePartnerLeft}
          />
        )}
        {showEnded && (
          <EndedScreen partnerLeft={partnerLeft} onReset={handleReset} />
        )}
      </div>
    </div>
  )
}
