import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState('Sapna');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function UserInput() {
  const { user, setUser } = useContext(UserContext);

  return (
    <label style={styles.label}>
      User name
      <input
        value={user}
        onChange={(event) => setUser(event.target.value)}
        style={styles.input}
      />
    </label>
  );
}

function ProfilePreview() {
  const { user } = useContext(UserContext);

  return (
    <p>
      Profile says: <strong>Hello, {user || 'Guest'}!</strong>
    </p>
  );
}

function UseContextDemo() {
  return (
    <UserProvider>
      <div style={styles.page}>
        <h1>useContext Demo</h1>

        <section style={styles.section}>
          <h2>What does useContext do?</h2>
          <p>
            <code>useContext</code> lets child components read shared data from a
            provider without passing props through every component.
          </p>
        </section>

        <section style={styles.section}>
          <h2>Shared user data</h2>
          <UserInput />
          <ProfilePreview />
        </section>

        <section style={styles.section}>
          <h2>Basic pattern</h2>
          <pre style={styles.code}>
            {`const UserContext = createContext(null);

const value = useContext(UserContext);`}
          </pre>
        </section>
      </div>
    </UserProvider>
  );
}

const styles = {
  page: {
    padding: '20px',
    fontFamily: 'sans-serif',
    maxWidth: '760px',
  },
  section: {
    marginBottom: '20px',
    padding: '16px',
    background: '#f4f7fb',
    border: '1px solid #dbe4f0',
    borderRadius: '8px',
  },
  label: {
    display: 'grid',
    gap: '6px',
    maxWidth: '260px',
    fontWeight: 'bold',
  },
  input: {
    padding: '8px',
  },
  code: {
    padding: '12px',
    background: '#1f2937',
    color: 'white',
    borderRadius: '6px',
    overflowX: 'auto',
  },
};

export default UseContextDemo;
