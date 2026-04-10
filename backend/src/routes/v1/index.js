const express = require('express');

const taskController = require('../../controllers/task-controller');
const { TaskMiddlewares } = require('../../middlewares');

const router = express.Router();

router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', TaskMiddlewares.validateCreateTask, taskController.createTask);
router.patch('/tasks/:id', TaskMiddlewares.validateUpdateTask, taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
