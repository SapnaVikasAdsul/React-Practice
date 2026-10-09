import { useRef, useState } from 'react';

function UseRefDemo() {
  const inputRef = useRef(null);
  const clickCountRef = useRef(0);
  const [message, setMessage] = useState('Ref count has not changed yet.');

  const focusInput = () => {
    inputRef.current.focus();
  };

  const increaseRefCount = () => {
    clickCountRef.current += 1;
    setMessage(`Current ref count: ${clickCountRef.current}`);
  };

  return (
    <div style={styles.page}>
      <h1>useRef Demo</h1>

      <section style={styles.section}>
        <h2>What is useRef?</h2>
        <p>
          <code>useRef</code> gives you an object with a <code>current</code>
          property. The value stays saved between renders.
        </p>
        <pre style={styles.code}>
          {`const inputRef = useRef(null);`}
        </pre>
      </section>

      <section style={styles.section}>
        <h2>1. Access an input</h2>
        <input
          ref={inputRef}
          placeholder="Click the button to focus me"
          style={styles.input}
        />
        <button onClick={focusInput} style={styles.button}>
          Focus Input
        </button>
      </section>

      <section style={styles.section}>
        <h2>2. Store a value</h2>
        <p>{message}</p>
        <button onClick={increaseRefCount}>
          Increase Ref Count
        </button>
        <p>
          Changing <code>clickCountRef.current</code> keeps the value, but it does
          not re-render the component by itself.
        </p>
      </section>
    </div>
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
  input: {
    padding: '8px',
    marginRight: '10px',
    width: '220px',
  },
  button: {
    padding: '8px 12px',
  },
  code: {
    padding: '12px',
    background: '#1f2937',
    color: 'white',
    borderRadius: '6px',
    overflowX: 'auto',
  },
};

export default UseRefDemo;
