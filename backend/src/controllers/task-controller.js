const TaskService = require('../services/task-service');
const { SuccessResponse, ErrorResponse, ErrorCodes } = require('../utils');

const taskService = new TaskService();

const getAllTasks = async (req, res) => {
  const successResponse = new SuccessResponse();
  const errorResponse = new ErrorResponse();

  try {
    const tasks = await taskService.getAllTasks({ status: req.query.status });
    successResponse.message = 'Successfully fetched tasks';
    successResponse.data = tasks;
    return res.status(ErrorCodes.SuccessCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.message = 'Cannot fetch tasks';
    errorResponse.err = error;
    return res.status(ErrorCodes.ServerErrorCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};

const createTask = async (req, res) => {
  const successResponse = new SuccessResponse();
  const errorResponse = new ErrorResponse();

  try {
    const task = await taskService.createTask(req.body);
    successResponse.message = 'Successfully created task';
    successResponse.data = task;
    return res.status(ErrorCodes.SuccessCodes.CREATED).json(successResponse);
  } catch (error) {
    errorResponse.message = 'Cannot create task';
    errorResponse.err = error;
    return res.status(ErrorCodes.ServerErrorCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};

const updateTask = async (req, res) => {
  const successResponse = new SuccessResponse();
  const errorResponse = new ErrorResponse();

  try {
    const task = await taskService.updateTask(req.params.id, req.body);

    if (!task) {
      errorResponse.message = 'Task not found';
      errorResponse.err = { id: 'No task exists for given id' };
      return res.status(ErrorCodes.ClientErrorCodes.NOT_FOUND).json(errorResponse);
    }

    successResponse.message = 'Successfully updated task';
    successResponse.data = task;
    return res.status(ErrorCodes.SuccessCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.message = 'Cannot update task';
    errorResponse.err = error;
    return res.status(ErrorCodes.ServerErrorCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};

const deleteTask = async (req, res) => {
  const successResponse = new SuccessResponse();
  const errorResponse = new ErrorResponse();

  try {
    const task = await taskService.deleteTask(req.params.id);

    if (!task) {
      errorResponse.message = 'Task not found';
      errorResponse.err = { id: 'No task exists for given id' };
      return res.status(ErrorCodes.ClientErrorCodes.NOT_FOUND).json(errorResponse);
    }

    successResponse.message = 'Successfully deleted task';
    successResponse.data = task;
    return res.status(ErrorCodes.SuccessCodes.OK).json(successResponse);
  } catch (error) {
    errorResponse.message = 'Cannot delete task';
    errorResponse.err = error;
    return res.status(ErrorCodes.ServerErrorCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};
