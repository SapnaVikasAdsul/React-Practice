import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage(`Login clicked for ${email || 'new learner'}. This is only a UI demo.`)
  }

  return (
    <section className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <p className="eyebrow">Demo route</p>
        <h1>Login</h1>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
          />
        </label>

        <button type="submit">Login</button>

        {message && <p className="form-message">{message}</p>}
      </form>

      <aside className="login-note">
        <h2>Why this page exists</h2>
        <p>
          The navbar Login button uses React Router to load this page without a full
          browser refresh. The form uses normal component state.
        </p>
      </aside>
    </section>
  )
}

export default Login
