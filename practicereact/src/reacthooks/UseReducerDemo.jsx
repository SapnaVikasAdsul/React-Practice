import { useReducer, useState } from 'react';

const initialState = {
  count: 0,
};

function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    case 'set':
      return { count: action.value };
    default:
      return state;
  }
}

function UseReducerDemo() {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const [customValue, setCustomValue] = useState('10');

  const setCount = () => {
    const parsedValue = Number(customValue);

    if (!Number.isNaN(parsedValue)) {
      dispatch({ type: 'set', value: parsedValue });
    }
  };

  return (
    <div style={styles.page}>
      <h1>useReducer Demo</h1>

      <section style={styles.section}>
        <h2>Why useReducer?</h2>
        <p>
          <code>useReducer</code> keeps state update logic in one reducer function.
          Buttons dispatch actions, and the reducer decides the next state.
        </p>
      </section>

      <section style={styles.section}>
        <h2>Counter</h2>
        <p style={styles.count}>{state.count}</p>

        <div style={styles.buttonRow}>
          <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
          <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
          <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
        </div>

        <div style={styles.inputRow}>
          <input
            type="number"
            value={customValue}
            onChange={(event) => setCustomValue(event.target.value)}
            style={styles.input}
          />
          <button onClick={setCount}>Set Count</button>
        </div>
      </section>

      <section style={styles.section}>
        <h2>Basic pattern</h2>
        <pre style={styles.code}>
          {`const [state, dispatch] = useReducer(reducer, initialState);

dispatch({ type: 'increment' });`}
        </pre>
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
  count: {
    margin: '10px 0',
    fontSize: '48px',
    fontWeight: 'bold',
  },
  buttonRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '12px',
  },
  inputRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  input: {
    padding: '8px',
    width: '120px',
  },
  code: {
    padding: '12px',
    background: '#1f2937',
    color: 'white',
    borderRadius: '6px',
    overflowX: 'auto',
  },
};

export default UseReducerDemo;
