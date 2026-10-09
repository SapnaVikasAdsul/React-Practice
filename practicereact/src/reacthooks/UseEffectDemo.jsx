import { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((previousSeconds) => previousSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <p>
      Timer: <strong>{seconds}</strong> seconds
    </p>
  );
}

function UseEffectDemo() {
  const [count, setCount] = useState(0);
  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    console.log('This runs only once, after the component first renders.');
  }, []);

  useEffect(() => {
    document.title = `Count: ${count}`;
    console.log('This runs whenever count changes:', count);
  }, [count]);

  return (
    <div style={styles.page}>
      <h1>useEffect Demo</h1>

      <section style={styles.section}>
        <h2>1. Run after first render</h2>
        <p>
          The first <code>useEffect</code> has an empty dependency array, so it runs
          only once when this component appears on screen.
        </p>
        <pre style={styles.code}>
          {`useEffect(() => {
  console.log('Runs only once');
}, []);`}
        </pre>
      </section>

      <section style={styles.section}>
        <h2>2. Run when state changes</h2>
        <p>
          Count: <strong>{count}</strong>
        </p>
        <button onClick={() => setCount((previousCount) => previousCount + 1)}>
          Increase Count
        </button>
        <p>
          When count changes, the second <code>useEffect</code> updates the browser
          tab title and logs the new value.
        </p>
        <pre style={styles.code}>
          {`useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);`}
        </pre>
      </section>

      <section style={styles.section}>
        <h2>3. Cleanup</h2>
        <button onClick={() => setShowTimer((previousValue) => !previousValue)}>
          {showTimer ? 'Hide Timer' : 'Show Timer'}
        </button>

        {showTimer && <Timer />}

        <p>
          The timer starts an interval inside <code>useEffect</code>. When the timer
          is hidden, cleanup runs and clears the interval.
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
  code: {
    padding: '12px',
    background: '#1f2937',
    color: 'white',
    borderRadius: '6px',
    overflowX: 'auto',
  },
};

export default UseEffectDemo;
