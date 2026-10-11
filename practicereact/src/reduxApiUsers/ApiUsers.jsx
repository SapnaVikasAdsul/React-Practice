import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from './usersApiSlice'

function ApiUsers() {
  const dispatch = useDispatch()
  const { users, status, loading, error } = useSelector((state) => state.apiUsers)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers())
    }
  }, [dispatch, status])

  return (
    <div className="api-users-demo">
      <div className="api-toolbar">
        <div>
          <p className="eyebrow">API status</p>
          <strong>{status}</strong>
        </div>

        <button
          disabled={loading}
          onClick={() => dispatch(fetchUsers())}
          type="button"
        >
          {loading ? 'Loading...' : 'Refresh Users'}
        </button>
      </div>

      {loading && <p className="api-status loading">Loading users from the API...</p>}
      {error && <p className="api-status error">Error: {error}</p>}

      {status === 'success' && (
        <ul className="api-user-list">
          {users.map((user) => (
            <li key={user.id}>
              <div>
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </div>
              <span>{user.company.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ApiUsers
