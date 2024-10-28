import React, { useState } from 'react';
import axios from 'axios';
import './TaskCreation.css';

function TaskCreation({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description && dueDate) {
      try {
        const response = await axios.post('http://localhost:8000/api/tasks', {
          title,
          description,
          dueDate,
          priority,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        addTask(response.data);
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Low');
      } catch (error) {
        console.error('Failed to create task', error);
      }
    }
  };

  return (
    <div className="task-creation">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskCreation;
