import { useState } from 'react';

function UserCard({ title, user, onChangeName }) {
    return (
        <div style={styles.card}>
            <h2>{title}</h2>
            <p>
                Name: <strong>{user.name}</strong>
            </p>
            <p>
                Role: <strong>{user.role}</strong>
            </p>
            <p>
                Location: <strong>{user.location}</strong>
            </p>

            <input
                value={user.name}
                onChange={(event) => onChangeName(event.target.value)}
                placeholder="Type a user name"
                style={styles.input}
            />
        </div>
    );
}

function withUserData(WrappedComponent) {
    return function ComponentWithUserData(props) {
        const [name, setName] = useState('Sapna');

        const user = {
            name,
            role: 'React Learner',
            location: 'India',
        };

        return (
            <div style={styles.hocBox}>
                <p style={styles.smallText}>
                    This outer box comes from the HOC. The HOC also creates the user data.
                </p>

                <WrappedComponent
                    {...props}
                    user={user}
                    onChangeName={setName}
                />
            </div>
        );
    };
}

const UserCardWithUserData = withUserData(UserCard);

function HocComponent() {
    return (
        <div style={styles.page}>
            <h1>Higher Order Component Demo</h1>

            <section style={styles.section}>
                <h2>What is happening?</h2>
                <p>
                    A HOC is a function that takes a component and returns a new component.
                </p>

                <pre style={styles.code}>
                    {`const EnhancedComponent = withUserData(UserCard);`}
                </pre>
            </section>

            <section style={styles.section}>
                <h2>Output</h2>
                <UserCardWithUserData title="User Card wrapped by HOC" />
            </section>

            <section style={styles.section}>
                <h2>Flow</h2>
                <ol>
                    <li><code>UserCard</code> only displays data from props.</li>
                    <li><code>withUserData</code> adds state and user data.</li>
                    <li><code>UserCardWithUserData</code> is the final enhanced component.</li>
                </ol>
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
    hocBox: {
        padding: '16px',
        background: '#fff7e6',
        border: '2px dashed #d97706',
        borderRadius: '8px',
    },
    card: {
        padding: '16px',
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
    },
    input: {
        padding: '8px',
        width: '100%',
        maxWidth: '280px',
    },
    smallText: {
        marginTop: 0,
        color: '#92400e',
    },
    code: {
        padding: '12px',
        background: '#1f2937',
        color: 'white',
        borderRadius: '6px',
        overflowX: 'auto',
    },
};

export default HocComponent;
