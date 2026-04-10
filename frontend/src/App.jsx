import { useEffect, useState } from 'react';

const API_BASE = '/tasks';
const FILTERS = {
  all: 'All',
  pending: 'Pending',
  completed: 'Completed'
};

const getMessageFromResponse = async (response, fallback) => {
  try {
    const payload = await response.json();
    return payload.message || fallback;
  } catch (error) {
    return fallback;
  }
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState('');
  const [editingTitle, setEditingTitle] = useState('');

  const fetchTasks = async (status = filter) => {
    setLoading(true);
    setError('');

    try {
      const query = status === 'all' ? '' : `?status=${status}`;
      const response = await fetch(`${API_BASE}${query}`);
      if (!response.ok) {
        throw new Error(await getMessageFromResponse(response, 'Failed to fetch tasks'));
      }

      const payload = await response.json();
      setTasks(payload.data || []);
    } catch (err) {
      setError(err.message || 'Something went wrong while loading tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError('Please enter a task title');
      return;
    }

    setError('');

    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      });

      if (!response.ok) {
        throw new Error(await getMessageFromResponse(response, 'Failed to create task'));
      }

      setTitle('');
      await fetchTasks();
    } catch (err) {
      setError(err.message || 'Something went wrong while creating task');
    }
  };

  const handleToggleTask = async (taskId, completed) => {
    setError('');

    try {
      const response = await fetch(`${API_BASE}/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
      });

      if (!response.ok) {
        throw new Error(await getMessageFromResponse(response, 'Failed to update task'));
      }

      await fetchTasks();
    } catch (err) {
      setError(err.message || 'Something went wrong while updating task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    setError('');

    try {
      const response = await fetch(`${API_BASE}/${taskId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(await getMessageFromResponse(response, 'Failed to delete task'));
      }

      await fetchTasks();
    } catch (err) {
      setError(err.message || 'Something went wrong while deleting task');
    }
  };

  const handleStartEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
    setError('');
  };

  const handleCancelEdit = () => {
    setEditingTaskId('');
    setEditingTitle('');
  };

  const handleSaveEdit = async (taskId) => {
    if (!editingTitle.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    setError('');

    try {
      const response = await fetch(`${API_BASE}/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: editingTitle })
      });

      if (!response.ok) {
        throw new Error(await getMessageFromResponse(response, 'Failed to update task title'));
      }

      handleCancelEdit();
      await fetchTasks(filter);
    } catch (err) {
      setError(err.message || 'Something went wrong while updating task title');
    }
  };

  const handleFilterChange = (nextFilter) => {
    setFilter(nextFilter);
    handleCancelEdit();
    fetchTasks(nextFilter);
  };

  useEffect(() => {
    fetchTasks('all');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Task Manager</h1>
        <p className="mt-2 text-sm text-slate-600">Create, complete, and delete tasks.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(FILTERS).map(([filterKey, label]) => (
            <button
              key={filterKey}
              type="button"
              onClick={() => handleFilterChange(filterKey)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                filter === filterKey
                  ? 'border-sky-700 bg-sky-700 text-white'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <form className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]" onSubmit={handleCreateTask}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter task title"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-600"
          />
          <button
            type="submit"
            className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800"
          >
            Add Task
          </button>
        </form>

        {loading ? <p className="mt-4 text-sm text-slate-600">Loading tasks...</p> : null}
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        <ul className="mt-4 space-y-3">
          {!loading && tasks.length === 0 ? (
            <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              No tasks yet. Add your first task.
            </li>
          ) : null}

          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              {editingTaskId === task.id ? (
                <input
                  value={editingTitle}
                  onChange={(event) => setEditingTitle(event.target.value)}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-sky-600"
                />
              ) : (
                <p
                  className={`text-sm ${
                    task.completed ? 'text-green-700 line-through' : 'text-slate-800'
                  }`}
                >
                  {task.title}
                </p>
              )}

              <div className="flex gap-2">
                {editingTaskId === task.id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(task.id)}
                      className="rounded-md border border-sky-300 px-3 py-1.5 text-xs font-medium text-sky-700 hover:bg-sky-50"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleStartEdit(task)}
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleToggleTask(task.id, !task.completed)}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                >
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
