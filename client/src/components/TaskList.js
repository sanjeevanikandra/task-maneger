import React, { useState } from 'react';
import './TaskList.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskList = ({ data, getData }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('');

  const deleteData = async (id) => {
    await fetch(`https://ai-task-maneger-backend.onrender.com/${id}`, { method: 'DELETE' });
    toast.success('Deleted successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    getData();
  };

  const startEditing = (id, currentTitle, currentPriority) => {
    setIsEditing(id);
    setNewTitle(currentTitle);
    setNewPriority(currentPriority);
  };

  const saveEdit = async (id) => {
    const response = await fetch(`https://ai-task-maneger-backend.onrender.com/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, priority: newPriority }),
    });
    toast.info("Edited successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    if (response.ok) {
      setIsEditing(null);
      setNewTitle('');
      setNewPriority('');
      getData();
    }
  };

  // Mark task as completed
  const toggleCompletion = async (id, completed) => {
    try {
      const response = await fetch(`https://ai-task-maneger-backend.onrender.com/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      getData();
    } catch (error) {
      console.error("Failed to update task completion:", error);
      toast.error("Failed to update task. Please try again later.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  // Determine the CSS class for a row based on priority
  const getRowClass = (priority) => {
    if (priority === 'High') return 'priority-high';
    if (priority === 'Medium') return 'priority-medium';
    if (priority === 'Low') return 'priority-low';
    return '';
  };

  return (
    <div>
      <h2 className="text-center">Task List</h2>
      <table className="table table-bordered mt-4">
        <thead className="bg">
          <tr>
            <th scope="col">Done</th>
            <th scope="col">Task</th>
            <th scope="col">Priority</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((ele, index) => (
            <tr key={ele._id} className={`${getRowClass(ele.priority)} ${ele.completed ? 'completed' : ''}`}>
              <td>
                <input type="checkbox" checked={ele.completed} onChange={() => toggleCompletion(ele._id, ele.completed)}/>
              </td>
              <td>
                {isEditing === ele._id ? (
                  <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="form-control" />
                ) : (
                  <span style={{ textDecoration: ele.completed ? 'line-through' : 'none' }}>
                    {ele.title}
                  </span>
                )}
              </td>
              <td>{isEditing === ele._id ? (
                <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)} className="form-control">
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              ) : (
                ele.priority
              )}</td>
              <td>
                {isEditing === ele._id ? (
                  <>
                    <button className="save" onClick={() => saveEdit(ele._id)}>Save</button>
                    <button className="cancel" onClick={() => setIsEditing(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="edit" onClick={() => startEditing(ele._id, ele.title, ele.priority)}>Edit</button>
                    <button className="delete" onClick={() => deleteData(ele._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
