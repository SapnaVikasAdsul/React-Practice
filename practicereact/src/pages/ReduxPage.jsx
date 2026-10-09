import UserForm from '../redux/components/userForm.jsx'
import UserList from '../redux/components/userList.jsx'

function ReduxPage() {
  return (
    <section className="topic-page">
      <div className="topic-header">
        <p className="eyebrow">Redux Toolkit</p>
        <h1>Redux store, actions, reducers, and selectors</h1>
        <p>
          This page uses the Redux store from your project. Add a user, update a user,
          delete a user, and move through the paginated list to see global state update.
        </p>
      </div>

      <div className="topic-layout">
        <section className="practice-panel">
          <h2>User management</h2>
          <p>
            <code>UserForm</code> dispatches <code>addUser</code>. <code>UserList</code>
            reads users with <code>useSelector</code> and dispatches update/delete actions.
          </p>

          <div className="redux-demo-box">
            <UserForm />
            <UserList />
          </div>
        </section>

        <aside className="explain-panel">
          <h2>Redux flow</h2>
          <ol>
            <li>Component dispatches an action.</li>
            <li>Slice reducer receives the action.</li>
            <li>Store state changes.</li>
            <li><code>useSelector</code> gets the latest state.</li>
            <li>React renders the updated UI.</li>
          </ol>
        </aside>
      </div>
    </section>
  )
}

export default ReduxPage
