import { useState } from 'react';

function UseStateDemo() {
  // --- Single primitive state ---
  const [count, setCount] = useState(0);

  // --- String state ---
  const [name, setName] = useState('');

  // --- Boolean / toggle state ---
  const [isVisible, setIsVisible] = useState(true);

  // --- Object state ---
  const [user, setUser] = useState({ firstName: '', lastName: '' });

  // --- Array state ---
  const [items, setItems] = useState([]);

  // --- Handlers ---
  const increment = () => setCount(prev => prev + 1);

  const toggleVisibility = () => setIsVisible(prev => !prev);

  const handleNameChange = (e) => setName(e.target.value);

  const handleUserChange = (field) => (e) => {
    setUser(prev => ({ ...prev, [field]: e.target.value }));
  };

  const addItem = () => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`]);
  };

  const removeItem = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  return (

    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>useState Hook Demo</h1>

      {/* Counter */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Counter</h2>
        <p>Count: <strong>{count}</strong></p>
        <button onClick={increment}>Increment</button>
        <button onClick={() => setCount(0)} style={{ marginLeft: '10px' }}>Reset</button>
      </section>

      {/* Name Input */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Name Input</h2>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <p>Hello, <strong>{name || 'Guest'}</strong>!</p>
      </section>

      {/* Toggle Visibility */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Toggle Visibility</h2>
        <button onClick={toggleVisibility}>
          {isVisible ? 'Hide' : 'Show'} Message
        </button>
        {isVisible && (
          <p style={{ marginTop: '10px', color: 'green' }}>This message is visible!</p>
        )}
      </section>

      {/* User Object State */}
      <section style={{ marginBottom: '20px' }}>
        <h2>User Object State</h2>
        <input
          type="text"
          placeholder="First Name"
          value={user.firstName}
          onChange={handleUserChange('firstName')}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={user.lastName}
          onChange={handleUserChange('lastName')}
          style={{ padding: '8px' }}
        />
        <p>User: <strong>{user.firstName} {user.lastName}</strong></p>
      </section>

      {/* Array List */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Array List</h2>
        <button onClick={addItem}>Add Item</button>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => removeItem(index)} style={{ color: 'red' }}>Remove</button>
            </li>
          ))}
        </ul>
      </section>
    </div>

  );
}

export default UseStateDemo;

