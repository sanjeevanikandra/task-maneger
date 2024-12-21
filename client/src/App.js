import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
    
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/task" element={<TaskList/>} />
          <Route exact path="/task/new" element={<TaskForm/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
    
  );
}

export default App;