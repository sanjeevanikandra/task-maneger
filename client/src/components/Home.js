import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Navbar from './Navbar';
const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/task/new');
  };

  return (
    <>
      <Navbar />
      <div className='container'>

        <h2 className='text-center heading'>Organize, Track, and Achieve with Ease</h2>
        <div className='container-2'>
          <p>
          "Welcome to your new task management solution! This app is designed to help you manage your tasks with ease and efficiency, leveraging the power of artificial intelligence to assist in creating, organizing, and prioritizing your to-dos. Whether you're juggling multiple projects, deadlines, or personal tasks, this app ensures that nothing slips through the cracks. The AI analyzes each task to assign the right level of priority, allowing you to focus on what matters most. Stay on top of your day-to-day activities by seamlessly adding, editing, and tracking tasks with minimal effort. Click 'Start' and step into the future of task management, where technology works for you to make your life more organized and productive!"
          </p>
           <button className='btn btn-primary bouncing-btn' onClick={handleClick}>
            Start
          </button>
        </div>
        
      </div>
    </>
  );
};

export default Home;
