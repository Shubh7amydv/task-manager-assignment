const validateCreateTask = (req, res, next) => {
  const { title } = req.body;

  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Task title is required and must be a non-empty string',
      data: {},
      err: {
        title: 'Invalid task title'
      }
    });
  }

  return next();
};

const validateUpdateTask = (req, res, next) => {
  const { completed, title } = req.body;

  const hasCompleted = Object.prototype.hasOwnProperty.call(req.body, 'completed');
  const hasTitle = Object.prototype.hasOwnProperty.call(req.body, 'title');

  if (!hasCompleted && !hasTitle) {
    return res.status(400).json({
      success: false,
      message: 'At least one updatable field is required (title or completed)',
      data: {},
      err: {
        body: 'No updatable fields provided'
      }
    });
  }

  if (hasCompleted && typeof completed !== 'boolean') {
    return res.status(400).json({
      success: false,
      message: 'completed must be a boolean value',
      data: {},
      err: {
        completed: 'Invalid completed status'
      }
    });
  }

  if (hasTitle && (typeof title !== 'string' || title.trim().length === 0)) {
    return res.status(400).json({
      success: false,
      message: 'title must be a non-empty string',
      data: {},
      err: {
        title: 'Invalid task title'
      }
    });
  }

  return next();
};

module.exports = {
  validateCreateTask,
  validateUpdateTask
};
