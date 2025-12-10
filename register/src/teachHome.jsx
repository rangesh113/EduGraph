import React, { useEffect } from 'react';
import './dashboard.css'; // Assuming you have a separate CSS file for styling
import { useState} from "react";
import logo from './assets/logo.png';


function App() {
    const[tname,setName]  = useState();
    const[menuOpen, setMenuOpen] = useState(false);
    useEffect(()=>{
    setName(sessionStorage.getItem("tname"))
    },[]);
const toggleMenu = () => {
  setMenuOpen(!menuOpen);
};
    

  return (
    <div id="app">
      <div>
        <nav id='dashnav' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <img src={logo} alt='' style={{ width: '150px' }} />
        <div className="hamburger" onClick={toggleMenu}>&#9776;</div>
          <div className={`dashmenu ${menuOpen ? 'show' : ''}`} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
          <a href='/techlogin' style={{ marginRight: '20px' }}>HOME</a>
            <a href="/entrymark" style={{ marginRight: '20px' }}>ENTER MARK</a>
            <a href='/report' style={{ marginRight: '20px' }}>REPORTS</a>
            <a href='/techlogin' style={{ marginRight: '20px' }}>LOG OUT</a>
            <span id="username" style={{ marginRight: '10px', fontSize:'13px' }}>{tname}</span>
          </div>
        </nav>
      <header id='stuhead'>
        <h1>Welcome to PSG Tech Teacher Dashboard</h1>
        <p style={{color:'white', fontSize:'20px'}}>We are committed to equipping educators with the tools to foster better education for a brighter world. Our comprehensive mark visualization tools provide teachers with actionable insights into students' performance, helping them identify areas of improvement and implement targeted strategies to support academic excellence</p>
      </header>
      <footer id='stufooter'>
        <p style={{color:'white', fontSize:'15px'}}>Copyright &#169; 2024 - All Rights Reserved | PSG Tech</p>
      </footer>
    </div>
  </div>
  );
}

export default App;
