import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from './api';
import { notify } from './utils';

const TaskManager = () => {
  const [input, setInput] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);
  const handleTask = () => {
    if (updateTask && input) {
      const obj = {
        taskName: input,
        isDone: updateTask.isDone,
        _id: updateTask._id,
      };
      handleUpdateTask(obj);
      setUpdateTask(null);
    } else if (updateTask === null && input) {
      handleAddTask();
    }
    setInput('');
  };
  useEffect(() => {
    if (updateTask) {
      setInput(updateTask.taskName);
    }
  }, [updateTask]);
  const handleAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };
    try {
      const { success, message } = await CreateTask(obj);
      if (success) {
        notify(message, 'success');
      } else {
        notify(message, 'error');
      }
      fetchAllTasks();
    } catch (err) {
      notify('Failed to create task', 'error');
    }
  };

  const fetchAllTasks = async () => {
    const { data } = await GetAllTasks();
    setTasks(data);
    setCopyTasks(data);
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await DeleteTaskById(id);
      if (success) {
        notify(message, 'success');
      } else {
        notify(message, 'error');
      }
      fetchAllTasks();
    } catch (err) {
      notify('Failed to delete task', 'error');
    }
  };
  const handleCheckAndUncheck = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = {
      taskName: taskName,
      isDone: !isDone,
    };
    try {
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) {
        notify(message, 'success');
      } else {
        notify(message, 'error');
      }
      fetchAllTasks();
    } catch (err) {
      notify('Failed to update task', 'error');
    }
  };
  const handleUpdateTask = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = {
      taskName,
      isDone: isDone,
    };
    try {
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) {
        notify(message, 'success');
      } else {
        notify(message, 'error');
      }
      fetchAllTasks();
    } catch (err) {
      notify('Failed to update task', 'error');
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6 mt-12 bg-white rounded-2xl shadow-lg flex flex-col gap-6'>
      <h1 className='text-3xl font-semibold text-center text-gray-800'>
        Task Manager
      </h1>

      {/* Add Task */}
      <div className='flex gap-3'>
        <input
          type='text'
          value={input}
          placeholder='Add a new task'
          onChange={(e) => setInput(e.target.value)}
          className='flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          className='px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
          onClick={handleTask}
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <div className='pt-4 border-t'>
        {tasks.length === 0 ? (
          <p className='text-center text-gray-400 italic'>No tasks yet.</p>
        ) : (
          <ul className='flex flex-col gap-3'>
            {tasks.map((task) => (
              <li
                key={task._id}
                className={`flex items-center justify-between px-4 py-3 rounded-lg border ${
                  task.isDone ? 'bg-green-100' : 'bg-gray-50'
                }`}
              >
                <span
                  className={`flex-grow text-gray-800 ${
                    task.isDone ? 'line-through text-green-600' : ''
                  }`}
                >
                  {task.taskName}
                </span>

                <div className='flex gap-2'>
                  <button
                    className='text-sm px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600'
                    onClick={() => handleCheckAndUncheck(task)}
                  >
                    {task.isDone ? 'Undo' : 'Done'}
                  </button>
                  <button
                    className='text-sm px-3 py-1 rounded bg-yellow-400 text-white hover:bg-yellow-500'
                    onClick={() => setUpdateTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className='text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600'
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default TaskManager;
