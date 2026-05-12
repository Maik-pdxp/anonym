import { useEffect, useRef, useState } from 'react'
import { useChat } from '../hooks/useChat'
import styles from './ChatScreen.module.css'

export default function ChatScreen({ chatId, userId, onClose, onPartnerLeft }) {
  const { messages, sendMessage, sending } = useChat(chatId, userId, onPartnerLeft)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleSend() {
    if (!input.trim()) return
    sendMessage(input)
    setInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function formatTime(ts) {
    return new Date(ts).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.info}>
          <span className={styles.who}>nixer</span>
          <span className={styles.sub}>verschwindet beim schließen</span>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          schließen
        </button>
      </div>

      <div className={styles.messages}>
        {messages.length === 0 && (
          <p className={styles.empty}>schreib was sonst gibts eine aufs Maul </p>
        )}
        {messages.map((msg) => {
          const isMe = msg.sender_id === userId
          return (
            <div key={msg.id} className={`${styles.bubble} ${isMe ? styles.me : styles.them}`}>
              <span className={styles.text}>{msg.content}</span>
              <span className={styles.ts}>{formatTime(msg.created_at)}</span>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <div className={styles.inputRow}>
        <input
          ref={inputRef}
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="schreib etwas…"
          maxLength={1000}
          disabled={sending}
        />
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={!input.trim() || sending}
          aria-label="senden"
        >
          ↑
        </button>
      </div>
    </div>
  )
}
