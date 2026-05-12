import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useChat(chatId, userId, onChatClosed) {
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)
  const channelRef = useRef(null)

  useEffect(() => {
    if (!chatId) return

    setMessages([])

    // Load existing messages
    supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data) setMessages(data)
      })

    // Subscribe to new messages
    const channel = supabase
      .channel(`chat-${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          setMessages((prev) => {
            // Avoid duplicates
            if (prev.find((m) => m.id === payload.new.id)) return prev
            return [...prev, payload.new]
          })
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'chats',
          filter: `id=eq.${chatId}`,
        },
        () => {
          // Chat was deleted by the other person
          onChatClosed?.()
        }
      )
      .subscribe()

    channelRef.current = channel

    return () => {
      supabase.removeChannel(channel)
      channelRef.current = null
    }
  }, [chatId])

  async function sendMessage(text) {
    if (!text.trim() || !chatId || sending) return
    setSending(true)
    await supabase.from('messages').insert({
      chat_id: chatId,
      sender_id: userId,
      content: text.trim(),
    })
    setSending(false)
  }

  return { messages, sendMessage, sending }
}
