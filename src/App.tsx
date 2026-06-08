import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'

type Task = {
  id: string
  title: string
  completed: boolean
}

const STORAGE_KEY = 'tp6-tasks'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setTasks(JSON.parse(stored) as Task[])
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'active') return !task.completed
      if (filter === 'completed') return task.completed
      return true
    })
  }, [filter, tasks])

  const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const title = newTask.trim()
    if (!title) return

    setTasks((current) => [
      ...current,
      { id: crypto.randomUUID(), title, completed: false }
    ])
    setNewTask('')
  }

  const handleChangeTask = (taskId: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((current) => current.filter((task) => task.id !== taskId))
  }

  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value)
  }

  return (
    <div className="app-shell">
      <div className="card">
        <header>
          <h1>Trabajo Práctico TP6</h1>
          <p>Aplicación de lista de tareas con filtros y persistencia local.</p>
        </header>

        <form className="task-form" onSubmit={handleAddTask}>
          <input
            value={newTask}
            onChange={handleNewTaskChange}
            placeholder="Agregar nueva tarea"
            aria-label="Nueva tarea"
          />
          <button type="submit">Agregar</button>
        </form>

        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
            type="button"
          >
            Todas
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
            type="button"
          >
            Activas
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
            type="button"
          >
            Completadas
          </button>
        </div>

        <ul className="task-list">
          {filteredTasks.length === 0 ? (
            <li className="empty-state">No hay tareas.</li>
          ) : (
            filteredTasks.map((task) => (
              <li key={task.id} className={task.completed ? 'completed' : ''}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleChangeTask(task.id)}
                  />
                  <span>{task.title}</span>
                </label>
                <button onClick={() => handleDeleteTask(task.id)} type="button">
                  Eliminar
                </button>
              </li>
            ))
          )}
        </ul>

        <footer>
          <p>
            Total: <strong>{tasks.length}</strong> · Completadas:{' '}
            <strong>{tasks.filter((task) => task.completed).length}</strong>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
