const TaskModel = require('../Models/TaskModel');

const createTask = async (req, res) => {
  const data = req.body;
  try {
    const task = new TaskModel(data);
    await task.save();
    res.status(201).json({
      message: 'Task is created',
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to create task',
      success: false,
    });
  }
};

const fetchAllTasks = async (req, res) => {
  try {
    const data = await TaskModel.find({});
    res.status(201).json({
      message: 'All Tasks',
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to get all tasks',
      success: false,
    });
  }
};
const updateTaskById = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const obj = { $set: { ...body } };
  try {
    await TaskModel.findByIdAndUpdate(id, obj);
    res.status(200).json({
      message: 'Task Updated',
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update task',
      success: false,
    });
  }
};
const DeleteTaskById = async (req, res) => {
  const id = req.params.id;
  try {
    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Task is deleted',
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to create task',
      success: false,
    });
  }
};

module.exports = {
  createTask,
  fetchAllTasks,
  updateTaskById,
  DeleteTaskById,
};
