import { useState } from 'react'
import HocComponent from '../reacthooks/HocComponent.jsx'

function GreetingCard({ name, role }) {
  return (
    <article className="mini-card">
      <h3>{name}</h3>
      <p>{role}</p>
    </article>
  )
}

function PropsDemo() {
  const learners = [
    { name: 'Sapna', role: 'React Learner' },
    { name: 'Amit', role: 'Frontend Developer' },
    { name: 'Priya', role: 'UI Engineer' },
  ]

  return (
    <div className="concept-demo">
      <h2>Props Demo</h2>
      <p>
        Props pass data from a parent component into child components.
      </p>
      <div className="mini-card-grid">
        {learners.map((learner) => (
          <GreetingCard
            key={learner.name}
            name={learner.name}
            role={learner.role}
          />
        ))}
      </div>
    </div>
  )
}

function ConditionalRenderingDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="concept-demo">
      <h2>Conditional Rendering Demo</h2>
      <p>
        React can show different UI based on a condition.
      </p>
      <button onClick={() => setIsLoggedIn((currentValue) => !currentValue)} type="button">
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
      <div className="status-box">
        {isLoggedIn ? 'Welcome back. You can see private content.' : 'Please login to continue.'}
      </div>
    </div>
  )
}

function ListsAndKeysDemo() {
  const [taskName, setTaskName] = useState('')
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn components' },
    { id: 2, title: 'Practice props' },
    { id: 3, title: 'Render lists with keys' },
  ])

  const addTask = () => {
    if (!taskName.trim()) return

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), title: taskName.trim() },
    ])
    setTaskName('')
  }

  return (
    <div className="concept-demo">
      <h2>Lists and Keys Demo</h2>
      <p>
        Use <code>map</code> to render arrays. Give each item a stable <code>key</code>.
      </p>
      <div className="inline-form">
        <input
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
          placeholder="Add task"
        />
        <button onClick={addTask} type="button">Add Task</button>
      </div>
      <ul className="simple-list">
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  )
}

function ControlledFormDemo() {
  const [form, setForm] = useState({ name: '', city: '' })

  const updateForm = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  return (
    <div className="concept-demo">
      <h2>Controlled Form Demo</h2>
      <p>
        A controlled input stores its value in React state.
      </p>
      <div className="form-grid">
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={updateForm}
            placeholder="Enter name"
          />
        </label>
        <label>
          City
          <input
            name="city"
            value={form.city}
            onChange={updateForm}
            placeholder="Enter city"
          />
        </label>
      </div>
      <div className="status-box">
        Preview: {form.name || 'Name'} from {form.city || 'City'}
      </div>
    </div>
  )
}

function ColorPicker({ selectedColor, onColorChange }) {
  const colors = ['#2563eb', '#047857', '#b45309', '#be123c']

  return (
    <div className="button-row">
      {colors.map((color) => (
        <button
          aria-label={`Choose ${color}`}
          className={selectedColor === color ? 'color-button active' : 'color-button'}
          key={color}
          onClick={() => onColorChange(color)}
          style={{ background: color }}
          type="button"
        />
      ))}
    </div>
  )
}

function ColorPreview({ color }) {
  return (
    <div className="color-preview" style={{ borderColor: color }}>
      Parent state selected this color: <strong>{color}</strong>
    </div>
  )
}

function LiftingStateDemo() {
  const [selectedColor, setSelectedColor] = useState('#2563eb')

  return (
    <div className="concept-demo">
      <h2>Lifting State Up Demo</h2>
      <p>
        When two children need the same data, keep the state in their common parent.
      </p>
      <ColorPicker selectedColor={selectedColor} onColorChange={setSelectedColor} />
      <ColorPreview color={selectedColor} />
    </div>
  )
}

function Panel({ title, children, footer }) {
  return (
    <article className="mini-card">
      <h3>{title}</h3>
      <div>{children}</div>
      {footer && <p className="panel-footer">{footer}</p>}
    </article>
  )
}

function CompositionDemo() {
  return (
    <div className="concept-demo">
      <h2>Composition Demo</h2>
      <p>
        Composition means building flexible components by passing content as children.
      </p>
      <Panel title="Reusable Panel" footer="The parent decides the content.">
        <p>This text is passed between the opening and closing Panel tags.</p>
      </Panel>
    </div>
  )
}

function VirtualDomDemo() {
  const [name, setName] = useState('Sapna')
  const [likes, setLikes] = useState(0)

  return (
    <div className="concept-demo">
      <h2>Virtual DOM Demo</h2>
      <p>
        The virtual DOM is React's lightweight description of what the UI should
        look like. When state changes, React creates a new description, compares it
        with the previous one, and updates only the needed part of the real DOM.
      </p>

      <div className="dom-compare-grid">
        <article className="mini-card">
          <h3>Virtual DOM description</h3>
          <pre className="concept-code">
            {`<ProfileCard
  name="${name}"
  likes={${likes}}
/>`}
          </pre>
        </article>

        <article className="mini-card profile-preview-card">
          <h3>Real UI on screen</h3>
          <p>
            Name: <strong>{name}</strong>
          </p>
          <p>
            Likes: <strong>{likes}</strong>
          </p>
        </article>
      </div>

      <div className="inline-form">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Change name"
        />
        <button onClick={() => setLikes((currentLikes) => currentLikes + 1)} type="button">
          Add Like
        </button>
      </div>

      <div className="status-box">
        React notices which value changed and updates that text in the browser.
      </div>
    </div>
  )
}

function RenderingDemo() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('blue')
  const [lastChange, setLastChange] = useState('Initial render')

  const updateCount = () => {
    setCount((currentCount) => currentCount + 1)
    setLastChange('Count state changed')
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => (
      currentTheme === 'blue' ? 'green' : 'blue'
    ))
    setLastChange('Theme state changed')
  }

  return (
    <div className="concept-demo">
      <h2>Rendering Demo</h2>
      <p>
        Rendering means React calls your component function to calculate what JSX
        should be shown. State changes trigger a new render.
      </p>

      <div className="render-card">
        <p>
          Last render reason: <strong>{lastChange}</strong>
        </p>
        <p>
          Count state: <strong>{count}</strong>
        </p>
        <p>
          Theme state: <strong>{theme}</strong>
        </p>
        <div className={`render-preview ${theme}`}>
          This preview is calculated from the latest state.
        </div>
      </div>

      <div className="button-row">
        <button onClick={updateCount} type="button">
          Update Count
        </button>
        <button onClick={toggleTheme} type="button">
          Toggle Theme
        </button>
      </div>

      <ol className="render-flow">
        <li>State changes.</li>
        <li>React calls the component function again.</li>
        <li>New JSX is compared with the previous JSX.</li>
        <li>The browser DOM receives only the needed updates.</li>
      </ol>
    </div>
  )
}
const conceptExamples = [
  {
    id: 'virtual-dom',
    label: 'Virtual DOM',
    description: 'Understand how React compares UI descriptions before touching the browser DOM.',
    Component: VirtualDomDemo,
  },
  {
    id: 'rendering',
    label: 'Rendering',
    description: 'See how state updates make React call your component again and refresh the UI.',
    Component: RenderingDemo,
  },  {
    id: 'props',
    label: 'Props',
    description: 'Pass data from parent components to child components.',
    Component: PropsDemo,
  },
  {
    id: 'conditional',
    label: 'Conditional UI',
    description: 'Show different JSX based on state or other conditions.',
    Component: ConditionalRenderingDemo,
  },
  {
    id: 'lists',
    label: 'Lists and Keys',
    description: 'Render arrays with map and give each item a stable key.',
    Component: ListsAndKeysDemo,
  },
  {
    id: 'forms',
    label: 'Controlled Forms',
    description: 'Keep input values in React state so the UI and data stay connected.',
    Component: ControlledFormDemo,
  },
  {
    id: 'lifting',
    label: 'Lifting State',
    description: 'Move shared state to the closest common parent component.',
    Component: LiftingStateDemo,
  },
  {
    id: 'composition',
    label: 'Composition',
    description: 'Build flexible components by passing JSX through children.',
    Component: CompositionDemo,
  },
  {
    id: 'hoc',
    label: 'HOC Pattern',
    description: 'Wrap a component with another function to add extra behavior or data.',
    Component: HocComponent,
  },
]

function ConceptsPage() {
  const [activeConceptId, setActiveConceptId] = useState(conceptExamples[0].id)
  const activeConcept = conceptExamples.find((concept) => (
    concept.id === activeConceptId
  )) ?? conceptExamples[0]
  const ActiveConceptDemo = activeConcept.Component

  return (
    <section className="concepts-page">
      <div className="hooks-header">
        <p className="eyebrow">Core concepts</p>
        <h1>Practice the React ideas used before hooks and routing</h1>
        <p>
          These are the concepts that make the rest of React easier to understand:
          props, rendering, virtual DOM, lists, forms, shared state, composition, and patterns.
        </p>
      </div>

      <div className="hook-button-grid" aria-label="Core React concepts">
        {conceptExamples.map((concept) => (
          <button
            className={concept.id === activeConceptId ? 'hook-button active' : 'hook-button'}
            key={concept.id}
            onClick={() => setActiveConceptId(concept.id)}
            type="button"
            aria-pressed={concept.id === activeConceptId}
          >
            {concept.label}
          </button>
        ))}
      </div>

      <section className="demo-panel">
        <div className="demo-panel-header">
          <div>
            <p className="eyebrow">Selected concept</p>
            <h2>{activeConcept.label}</h2>
          </div>
          <p>{activeConcept.description}</p>
        </div>

        <div className="demo-body">
          <ActiveConceptDemo />
        </div>
      </section>
    </section>
  )
}

export default ConceptsPage



