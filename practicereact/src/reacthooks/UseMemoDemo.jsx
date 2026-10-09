import { useMemo, useState } from 'react';

function UseMemoDemo() {
  const [number, setNumber] = useState(5);
  const [count, setCount] = useState(0);

  const doubledNumber = useMemo(() => {
    console.log('Calculating doubled number...');
    return number * 2;
  }, [number]);

  return (
    <div style={styles.page}>
      <h1>useMemo Demo</h1>

      <section style={styles.section}>
        <h2>What does useMemo do?</h2>
        <p>
          <code>useMemo</code> remembers a calculated value and only calculates it
          again when its dependency changes.
        </p>
      </section>

      <section style={styles.section}>
        <h2>Memoized Calculation</h2>
        <label>
          Number:{' '}
          <input
            type="number"
            value={number}
            onChange={(event) => setNumber(Number(event.target.value))}
            style={styles.input}
          />
        </label>

        <p>
          Doubled number: <strong>{doubledNumber}</strong>
        </p>

        <pre style={styles.code}>
          {`const doubledNumber = useMemo(() => {
  return number * 2;
}, [number]);`}
        </pre>
      </section>

      <section style={styles.section}>
        <h2>Unrelated State</h2>
        <p>
          Count: <strong>{count}</strong>
        </p>
        <button onClick={() => setCount((previousCount) => previousCount + 1)}>
          Increase Count
        </button>
        <p>
          Clicking this button re-renders the component, but the doubled number is
          not calculated again because <code>number</code> did not change.
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
    width: '100px',
  },
  code: {
    padding: '12px',
    background: '#1f2937',
    color: 'white',
    borderRadius: '6px',
    overflowX: 'auto',
  },
};

export default UseMemoDemo;
