import { useState } from 'react'
import useDebounce from './useDebounce.jsx'

const products = [
  'React hooks',
  'Redux Toolkit',
  'React Router',
  'useMemo optimization',
  'useCallback optimization',
  'Debounced search',
  'Throttled scroll',
  'Context API',
]

function Search() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 600)
  const apiMessage = debouncedSearch
    ? `API would be called for: ${debouncedSearch}`
    : 'Type something to start searching.'

  const filteredProducts = products.filter((product) => (
    product.toLowerCase().includes(debouncedSearch.toLowerCase())
  ))

  return (
    <div className="search-demo">
      <label>
        Search topic
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Try typing react, redux, memo..."
        />
      </label>

      <div className="search-status-grid">
        <p>
          Typed value: <strong>{search || 'empty'}</strong>
        </p>
        <p>
          Debounced value: <strong>{debouncedSearch || 'empty'}</strong>
        </p>
        <p>{apiMessage}</p>
      </div>

      <ul className="search-results">
        {filteredProducts.map((product) => (
          <li key={product}>{product}</li>
        ))}
      </ul>
    </div>
  )
}

export default Search
