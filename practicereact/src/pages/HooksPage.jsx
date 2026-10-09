import { useState } from 'react'
import UseStateDemo from '../reacthooks/UseStateDemo.jsx'
import UseEffectDemo from '../reacthooks/UseEffectDemo.jsx'
import UseMemoDemo from '../reacthooks/UseMemoDemo.jsx'
import UseRefDemo from '../reacthooks/UseRefDemo.jsx'
import UseReducerDemo from '../reacthooks/UseReducerDemo.jsx'
import UseCallbackDemo from '../reacthooks/UseCallback.jsx'
import UseContextDemo from '../reacthooks/UseContextDemo.jsx'
import UseLayoutDemo from '../reacthooks/UseLayoutDemo.jsx'

const hookExamples = [
  {
    id: 'state',
    label: 'useState',
    description: 'Manage values that change on the screen.',
    Component: UseStateDemo,
  },
  {
    id: 'effect',
    label: 'useEffect',
    description: 'Run side effects after render, when dependencies change, or during cleanup.',
    Component: UseEffectDemo,
  },
  {
    id: 'memo',
    label: 'useMemo',
    description: 'Remember calculated values between renders.',
    Component: UseMemoDemo,
  },
  {
    id: 'ref',
    label: 'useRef',
    description: 'Keep mutable values or access DOM elements without causing re-renders.',
    Component: UseRefDemo,
  },
  {
    id: 'reducer',
    label: 'useReducer',
    description: 'Manage state with actions when logic grows beyond simple setters.',
    Component: UseReducerDemo,
  },
  {
    id: 'callback',
    label: 'useCallback',
    description: 'Remember a function reference so memoized children do not re-render unnecessarily.',
    Component: UseCallbackDemo,
  },
  {
    id: 'context',
    label: 'useContext',
    description: 'Read shared data from a provider without passing props through every level.',
    Component: UseContextDemo,
  },
  {
    id: 'layout',
    label: 'useLayoutEffect',
    description: 'Measure or update layout before the browser paints the screen.',
    Component: UseLayoutDemo,
  },
]

function HooksPage() {
  const [activeHookId, setActiveHookId] = useState(hookExamples[0].id)
  const activeHook = hookExamples.find((hook) => hook.id === activeHookId) ?? hookExamples[0]
  const ActiveHookDemo = activeHook.Component

  return (
    <section className="hooks-page">
      <div className="hooks-header">
        <p className="eyebrow">Hook playground</p>
        <h1>Choose a hook and see its component render below</h1>
        <p>
          These buttons change local state on this page. The selected hook demo is then
          rendered as a normal React component.
        </p>
      </div>

      <div className="hook-button-grid" aria-label="Hook examples">
        {hookExamples.map((hook) => (
          <button
            className={hook.id === activeHookId ? 'hook-button active' : 'hook-button'}
            key={hook.id}
            onClick={() => setActiveHookId(hook.id)}
            type="button"
            aria-pressed={hook.id === activeHookId}
          >
            {hook.label}
          </button>
        ))}
      </div>

      <section className="demo-panel">
        <div className="demo-panel-header">
          <div>
            <p className="eyebrow">Selected hook</p>
            <h2>{activeHook.label}</h2>
          </div>
          <p>{activeHook.description}</p>
        </div>

        <div className="demo-body">
          <ActiveHookDemo />
        </div>
      </section>
    </section>
  )
}

export default HooksPage
