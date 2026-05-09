import React from 'react'
import { Link } from 'react-router-dom'

export const Home = ({ user, error }) => {
  return (
    <main className="home-page">
      <section className="hero-card">
        {error && <p className="auth-error">{error}</p>}
        <div className="hero-grid">
          {user ? (
            <>
              <h1 className="hero-title">Welcome back, {user.name}.</h1>
              <p className="hero-copy">You are signed in and ready to explore your dashboard.</p>
            </>
          ) : (
            <>
              <h1 className="hero-title">A cleaner experience for your next app.</h1>
              <p className="hero-copy">Login or register to access your personalized account and start using the app.</p>
              <div className="home-actions">
                <Link className="hero-action" to="/login">Login</Link>
                <Link className="hero-action" to="/register">Register</Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default Home;
