import React from 'react'
import './Navbar.css';
function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
            <a className="navbar-brand" href="/">Task Manager</a>
            </div>
            <div id="nav">
            <a href="/" className="btn button">Home</a>
            <a href="/task/new" className="btn button">Task</a>
            </div>

        </nav>
    </div>
  )
}

export default Navbar
