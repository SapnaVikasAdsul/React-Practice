import { Link } from 'react-router-dom'

const concepts = [
  {
    title: 'Core Concepts',
    text: 'Practice props, rendering, virtual DOM, lists, forms, lifting state, and composition.',
  },
  {
    title: 'Virtual DOM',
    text: 'Understand how React compares UI descriptions before updating the browser DOM.',
  },
  {
    title: 'Rendering',
    text: 'Learn how state and props changes make React call components again and update the UI.',
  },
  {
    title: 'Hooks',
    text: 'Use React features like state, effects, refs, memoization, reducers, and context.',
  },
  {
    title: 'Routing',
    text: 'Move between pages without reloading the browser.',
  },
  {
    title: 'Redux Toolkit',
    text: 'Keep shared state in one store and update it with predictable slice actions.',
  },
  {
    title: 'Optimized Search',
    text: 'Use debounce logic so expensive search work runs after the user pauses typing.',
  },
  {
    title: 'Patterns',
    text: 'Practice common patterns such as higher-order components and shared data with context.',
  },
]

function Home() {
  return (
    <section className="home-page">
      <div className="hero-panel">
        <p className="eyebrow">React learning project</p>
        <h1>React concepts and features in one practice app</h1>
        <p className="hero-copy">
          Use this project to understand how React builds user interfaces from components,
          state, props, rendering, virtual DOM, hooks, routing, Redux, and optimized search patterns.
        </p>

        <div className="quick-links">
          <Link to="/concepts">Core Concepts</Link>
          <Link to="/hooks">Hooks</Link>
          <Link to="/redux">Redux</Link>
          <Link to="/optimized-search">Optimized Search</Link>
        </div>
      </div>

      <div className="concept-grid">
        {concepts.map((concept) => (
          <article className="concept-card" key={concept.title}>
            <h2>{concept.title}</h2>
            <p>{concept.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Home

