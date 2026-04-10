const { TaskRepository } = require('../repository');

class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async getAllTasks(filters = {}) {
    try {
      return await this.taskRepository.getAllTasks(filters);
    } catch (error) {
      console.log('Something went wrong in service layer');
      throw error;
    }
  }

  async createTask(data) {
    try {
      return await this.taskRepository.createTask({ title: data.title.trim() });
    } catch (error) {
      console.log('Something went wrong in service layer');
      throw error;
    }
  }

  async updateTask(taskId, data) {
    try {
      const payload = { ...data };

      if (typeof payload.title === 'string') {
        payload.title = payload.title.trim();
      }

      return await this.taskRepository.updateTask(taskId, payload);
    } catch (error) {
      console.log('Something went wrong in service layer');
      throw error;
    }
  }

  async deleteTask(taskId) {
    try {
      return await this.taskRepository.deleteTask(taskId);
    } catch (error) {
      console.log('Something went wrong in service layer');
      throw error;
    }
  }
}

module.exports = TaskService;
