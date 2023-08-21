'use client'

import '../assets/css/chatgpt-bot.css'
import Link from 'next/link'
import React, { useState, useCallback } from 'react'
import axios from 'axios'

export default function ChatGptBot() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversation, setConversation] = useState([])

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()

      if (!message) {
        alert('メッセージがありません。')
        return
      }

      if (loading) return

      setLoading(true)

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              ...conversation,
              {
                role: 'user',
                content: message,
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_REACT_APP_OPENAI_API_KEY}`,
            },
          }
        )

        const answer = response.data.choices[0].message.content.trim()
        setConversation([
          ...conversation,
          { role: 'user', content: message },
          { role: 'assistant', content: answer },
        ])
      } catch (error) {
        console.error(error)
      } finally {
        setMessage('')
        setLoading(false)
      }
    },
    [loading, message, conversation]
  )

  return (
    <main className='main'>
      <h1>ChatGPT BOT</h1>

      <div className='app'>
        <div className='chat-history'>
          <ul>
            {conversation.map((msg, idx) => (
              <li key={idx} className={`${msg.role}-message`}>
                <div className='bubble'>
                  <p>{msg.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form className='chat-form' onSubmit={ handleSubmit }>
          <label htmlFor='message'>メッセージを入力してください</label>
          <textarea
            className='message'
            id='message'
            rows='3'
            cols='50'
            value={ message }
            onChange={ e => {
              setMessage( e.target.value )
            } }
          />
          <div className='submit'>
            <button
              type='submit'
              aria-label='送信する'
              className={loading ? 'loading-btn' : ''}
            >
              { loading ? (
                '送信中'
              ) : (
                '送信する'
              ) }
            </button>
          </div>
        </form>
        {loading && (
          <div className='loading'>
            <div className='loader'></div>
          </div>
        )}
      </div>

      <p><Link href="/">Back</Link></p>
    </main>
  )
}
