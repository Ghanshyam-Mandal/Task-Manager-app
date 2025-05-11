const {
  createTask,
  fetchAllTasks,
  updateTaskById,
  DeleteTaskById,
} = require('../Controllers/TaskController');

const router = require('express').Router();

// To get all the tasks
router.get('/', fetchAllTasks);
// To create a task
router.post('/', createTask);
// To update a task
router.put('/:id', updateTaskById);
// To delete a task
router.delete('/:id', DeleteTaskById);

module.exports = router;
