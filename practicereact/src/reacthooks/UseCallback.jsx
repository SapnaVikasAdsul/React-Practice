import { memo, useCallback, useState } from 'react';

const ChildButton = memo(function ChildButton({ onIncrease }) {
    console.log('ChildButton rendered');

    return (
        <button onClick={onIncrease}>
            Increase Count From Child
        </button>
    );
});

function UseCallbackDemo() {
    const [count, setCount] = useState(0);
    const [theme, setTheme] = useState('light');

    const increaseCount = useCallback(() => {
        setCount((previousCount) => previousCount + 1);
    }, []);

    return (
        <div style={styles.page}>
            <h1>useCallback Demo</h1>

            <section style={styles.section}>
                <h2>What does useCallback do?</h2>
                <p>
                    <code>useCallback</code> remembers a function between renders. This is
                    useful when passing functions to a memoized child component.
                </p>
            </section>

            <section style={styles.section}>
                <h2>Counter</h2>
                <p>
                    Count: <strong>{count}</strong>
                </p>
                <ChildButton onIncrease={increaseCount} />
            </section>

            <section style={styles.section}>
                <h2>Unrelated state</h2>
                <p>
                    Theme: <strong>{theme}</strong>
                </p>
                <button onClick={() => setTheme((currentTheme) => (
                    currentTheme === 'light' ? 'dark' : 'light'
                ))}
                >
                    Toggle Theme
                </button>
                <p>
                    Open the console. Toggling theme re-renders the parent, but the child can
                    avoid re-rendering because the callback reference stays the same.
                </p>
            </section>

            <section style={styles.section}>
                <h2>Basic pattern</h2>
                <pre style={styles.code}>
                    {`const increaseCount = useCallback(() => {
  setCount((previousCount) => previousCount + 1);
}, []);`}
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
    code: {
        padding: '12px',
        background: '#1f2937',
        color: 'white',
        borderRadius: '6px',
        overflowX: 'auto',
    },
};

export default UseCallbackDemo;
