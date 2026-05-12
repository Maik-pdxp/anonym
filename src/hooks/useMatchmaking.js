import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useMatchmaking(user) {
  const [status, setStatus] = useState('idle')   // idle | searching | chatting | ended
  const [chatId, setChatId] = useState(null)
  const [partnerId, setPartnerId] = useState(null)
  const channelRef = useRef(null)
  const queueIdRef = useRef(null)

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cleanupChannel()
    }
  }, [])

  function cleanupChannel() {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current)
      channelRef.current = null
    }
  }

  async function startSearching() {
    if (!user) return
    setStatus('searching')

    try {
      // Look for someone already waiting
      const { data: waiting, error: fetchErr } = await supabase
        .from('queue')
        .select('id, user_id')
        .neq('user_id', user.id)
        .is('matched', false)
        .order('created_at', { ascending: true })
        .limit(1)

      if (fetchErr) throw fetchErr

      if (waiting && waiting.length > 0) {
        // Found someone – create a chat room
        const match = waiting[0]

        const { data: chat, error: chatErr } = await supabase
          .from('chats')
          .insert({ user_a: user.id, user_b: match.user_id })
          .select()
          .single()

        if (chatErr) throw chatErr

        // Mark them as matched
        await supabase
          .from('queue')
          .update({ matched: true })
          .eq('id', match.id)

        setPartnerId(match.user_id)
        setChatId(chat.id)
        setStatus('chatting')
      } else {
        // No one waiting – join the queue
        const { data: queueEntry, error: queueErr } = await supabase
          .from('queue')
          .insert({ user_id: user.id, matched: false })
          .select()
          .single()

        if (queueErr) throw queueErr

        queueIdRef.current = queueEntry.id

        // Listen for a new chat that includes us
        const channel = supabase
          .channel(`match-${user.id}`)
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'chats',
              filter: `user_b=eq.${user.id}`,
            },
            (payload) => {
              const chat = payload.new
              setPartnerId(chat.user_a)
              setChatId(chat.id)
              setStatus('chatting')
              cleanupChannel()
            }
          )
          .subscribe()

        channelRef.current = channel
      }
    } catch (err) {
      console.error('Matchmaking error:', err)
      setStatus('idle')
    }
  }

  async function cancelSearching() {
    cleanupChannel()
    if (queueIdRef.current) {
      await supabase.from('queue').delete().eq('id', queueIdRef.current)
      queueIdRef.current = null
    }
    setStatus('idle')
  }

  async function closeChat() {
    if (!chatId) return
    // Delete chat – triggers cleanup on both sides via realtime
    await supabase.from('chats').delete().eq('id', chatId)
    setChatId(null)
    setPartnerId(null)
    setStatus('ended')
  }

  function reset() {
    setStatus('idle')
    setChatId(null)
    setPartnerId(null)
  }

  return { status, chatId, partnerId, startSearching, cancelSearching, closeChat, reset }
}
