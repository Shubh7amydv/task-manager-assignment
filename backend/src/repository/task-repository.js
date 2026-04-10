const { tasks, buildTask, persistTasks } = require('../data/tasks-store');

class TaskRepository {
  async getAllTasks({ status = 'all' } = {}) {
    const sortedTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (status === 'completed') {
      return sortedTasks.filter((task) => task.completed === true);
    }

    if (status === 'pending') {
      return sortedTasks.filter((task) => task.completed === false);
    }

    return sortedTasks;
  }

  async createTask({ title }) {
    const task = buildTask(title);
    tasks.push(task);
    persistTasks();
    return task;
  }

  async updateTask(taskId, data) {
    const taskIndex = tasks.findIndex((task) => task.id === String(taskId));
    if (taskIndex === -1) {
      return null;
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...data
    };

    persistTasks();

    return tasks[taskIndex];
  }

  async deleteTask(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === String(taskId));
    if (taskIndex === -1) {
      return null;
    }

    const [deletedTask] = tasks.splice(taskIndex, 1);
    persistTasks();
    return deletedTask;
  }
}

module.exports = TaskRepository;
