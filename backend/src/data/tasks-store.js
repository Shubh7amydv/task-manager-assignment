const fs = require('fs');
const path = require('path');

const storeFilePath = path.join(__dirname, 'tasks.json');

const readStoreFile = () => {
  if (!fs.existsSync(storeFilePath)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(storeFilePath, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const initialTasks = readStoreFile();
const tasks = initialTasks;
let nextId = initialTasks.reduce((maxId, task) => {
  const numericId = Number(task.id);
  if (Number.isInteger(numericId) && numericId > maxId) {
    return numericId;
  }

  return maxId;
}, 0) + 1;

const buildTask = (title) => ({
  id: String(nextId++),
  title,
  completed: false,
  createdAt: new Date().toISOString()
});

const persistTasks = () => {
  fs.writeFileSync(storeFilePath, JSON.stringify(tasks, null, 2));
};

module.exports = {
  tasks,
  buildTask,
  persistTasks
};
