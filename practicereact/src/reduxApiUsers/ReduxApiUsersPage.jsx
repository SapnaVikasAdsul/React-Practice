import ApiUsers from './ApiUsers'

function ReduxApiUsersPage() {
  return (
    <section className="topic-page">
      <div className="topic-header">
        <p className="eyebrow">Redux Toolkit async thunk</p>
        <h1>Fetch API users with Redux Toolkit</h1>
        <p>
          This example calls JSONPlaceholder with <code>createAsyncThunk</code>,
          stores the response in a slice, and renders loading, success, and error
          states from Redux.
        </p>
      </div>

      <div className="topic-layout">
        <section className="practice-panel">
          <h2>Users from API</h2>
          <p>
            <code>ApiUsers</code> dispatches <code>fetchUsers</code> and reads
            <code>state.apiUsers</code> with <code>useSelector</code>.
          </p>

          <ApiUsers />
        </section>

        <aside className="explain-panel">
          <h2>Implementation flow</h2>
          <ol>
            <li><code>createAsyncThunk</code> runs the API request.</li>
            <li><code>pending</code> sets loading state.</li>
            <li><code>fulfilled</code> stores the users and marks success.</li>
            <li><code>rejected</code> stores the error message.</li>
            <li>The component uses <code>useDispatch</code> and <code>useSelector</code>.</li>
          </ol>
        </aside>
      </div>
    </section>
  )
}

export default ReduxApiUsersPage
