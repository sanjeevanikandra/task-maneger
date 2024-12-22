import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import Navbar from './Navbar';
import './TaskForm.css';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  // Function to fetch the todo list from the server
  const getData = async () => {
    try {
      const response = await fetch('https://ai-task-maneger-backend.onrender.com');
      const result = await response.json();
      setData(result);
    }
    catch (err) {
      console.log(err);
    }
  };

  // Fetch data when the component loads
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todos = { title };

    const response = await fetch('https://ai-task-maneger-backend.onrender.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todos)
    });


    const data = await response.json();
    toast.success("Created successfully!", {
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
      console.log('Data has been added', data);
      setTitle('');
      setError('');
      getData();
    } else {
      console.log('Data has not been added', data.error);
      setError(data.error);
    }
  };

  return (
    <>
      <Navbar />
      <div className='container'>

        {error && <h1>{error}</h1>}
        <form className='form' onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" required className="form-control" placeholder="Enter todo" value={title}
              onChange={(e) => setTitle(e.target.value)} />
            <input type="submit" value="Add" className="btn Button" />
          </div>
        </form>
        <TaskList data={data} getData={getData} />
      </div>
    </>
  );
};

export default TaskForm;
