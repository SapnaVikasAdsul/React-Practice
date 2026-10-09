import Search from '../optimizedsearch/search.jsx'

function OptimizedSearchPage() {
  return (
    <section className="topic-page">
      <div className="topic-header">
        <p className="eyebrow">Optimized search</p>
        <h1>Debounce user input before running expensive work</h1>
        <p>
          Search inputs can fire on every keystroke. Debouncing waits until typing
          pauses, which is useful before calling an API or filtering a large list.
        </p>
      </div>

      <div className="topic-layout">
        <section className="practice-panel">
          <h2>Debounced search demo</h2>
          <Search />
        </section>

        <aside className="explain-panel">
          <h2>What to notice</h2>
          <ol>
            <li>The typed value changes immediately.</li>
            <li>The debounced value updates after a short delay.</li>
            <li>An API call should use the debounced value, not every key press.</li>
          </ol>
        </aside>
      </div>
    </section>
  )
}

export default OptimizedSearchPage
