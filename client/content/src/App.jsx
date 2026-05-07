import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) {
      alert('Please enter a message')
      return
    }

    setLoading(true)
    try {
      const result = await fetch('http://localhost:3000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })

      const data = await result.json()
      setResponse(data.response || data.error)
      setInput('')
    } catch (error) {
      setResponse(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Client-Server Communication</h1>
          <p>Enter a message below and click Send to communicate with the server</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Enter your message..."
            style={{
              padding: '10px',
              marginRight: '10px',
              fontSize: '16px',
              width: '250px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={loading}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>

        {response && (
          <div style={{
            padding: '15px',
            marginTop: '20px',
            backgroundColor: '#e7f3ff',
            border: '1px solid #b3d9ff',
            borderRadius: '4px',
            color: '#004085'
          }}>
            <strong>Response:</strong> {response}
          </div>
        )}

        <div style={{ marginTop: '30px' }}>
          <button
            type="button"
            className="counter"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </button>
        </div>
      </section>
    </>
  )
}

export default App
