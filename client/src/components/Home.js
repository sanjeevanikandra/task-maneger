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
            "Manage your tasks smarter, not harder. This app leverages AI to help
            you create, organize, and prioritize your tasks, making sure nothing
            slips through the cracks. Click 'Start' to experience the future of
            task management."
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
