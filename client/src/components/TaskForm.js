import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import Navbar from './Navbar';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  // Function to fetch the todo list from the server
  const getData = async () => {
    const response = await fetch('http://localhost:5050/');
    const result = await response.json();
    setData(result);
  };

  // Fetch data when the component loads
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todos = { title };

    const response = await fetch('http://localhost:5050/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todos)
    });
    

    const data = await response.json();
    if (response.ok) {
      console.log('Data has been added', data);
      setTitle('');
      setError('');
      getData();
    } else {
      console.log('Data has not been added', data.error);
      setError(data.error); // Display the error message
    }
  };

  return (
    <>
    <Navbar />
    <div className='container'>
      <h2 className="text-center">Todo Form</h2>
      {error && <h1>{error}</h1>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update title as user types
          />
          <input type="submit" value="Add" className="btn btn-primary" />
        </div>
      </form>
      <TaskList data={data} getData={getData} /> {/* Pass props to Feature */}
    </div>
    </>
  );
};

export default TaskForm;
