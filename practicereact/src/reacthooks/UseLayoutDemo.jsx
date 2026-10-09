import { useEffect, useLayoutEffect, useRef, useState } from 'react';

function UseLayoutDemo() {
  const [isWide, setIsWide] = useState(false);
  const [width, setWidth] = useState(0);
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    if (boxRef.current) {
      setWidth(boxRef.current.offsetWidth);
    }
  }, [isWide]);

  useEffect(() => {
    console.log('Measured width:', width);
  }, [width]);

  return (
    <div style={styles.page}>
      <h1>useLayoutEffect Demo</h1>

      <section style={styles.section}>
        <h2>What does useLayoutEffect do?</h2>
        <p>
          <code>useLayoutEffect</code> runs after React changes the DOM but before
          the browser paints. It is useful when you need to measure layout.
        </p>
      </section>

      <section style={styles.section}>
        <h2>Measure a box</h2>
        <div
          ref={boxRef}
          style={{
            ...styles.box,
            width: isWide ? '100%' : '50%',
          }}
        >
          Resize me
        </div>

        <p>
          Box width: <strong>{width}px</strong>
        </p>
        <button onClick={() => setIsWide((currentValue) => !currentValue)}>
          Toggle Width
        </button>
      </section>

      <section style={styles.section}>
        <h2>Basic pattern</h2>
        <pre style={styles.code}>
          {`useLayoutEffect(() => {
  setWidth(boxRef.current.offsetWidth);
}, [isWide]);`}
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
  box: {
    minHeight: '70px',
    display: 'grid',
    placeItems: 'center',
    marginBottom: '12px',
    background: '#dbeafe',
    border: '1px solid #2563eb',
    borderRadius: '8px',
    fontWeight: 'bold',
  },
  code: {
    padding: '12px',
    background: '#1f2937',
    color: 'white',
    borderRadius: '6px',
    overflowX: 'auto',
  },
};

export default UseLayoutDemo;
