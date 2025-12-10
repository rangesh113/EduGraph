import React, { useEffect } from 'react';
import { useState} from "react";
import './dashboard.css';
import logo from './assets/logo.png';

function App() {
    const[name,setName]  = useState();
    const[menuOpen,setMenuOpen]=useState(false);
    useEffect(()=>{
    setName(sessionStorage.getItem("name"))
  },[]);
  const toggleMenu = () =>{
    setMenuOpen(!menuOpen);
  };
  
    

  return (
    <div id="app">
      <div>
        <nav id='dashnav' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <img src={logo} alt='' style={{ width: '150px' }} />
        <div className="hamburger" onClick={toggleMenu}>&#9776;</div>
        <div className={`dashmenu ${menuOpen ? 'show' : ''}`} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
          <a href='/stulogin' style={{ marginRight: '20px' }}>HOME</a>
          <a href='/mark' style={{ marginRight: '20px' }}>MARK</a>
          <a href='/sreport' style={{ marginRight: '20px' }}>REPORTS</a>
          <a href='/stulogin' style={{ marginRight: '20px' }}>LOG OUT</a>
          <span id="username" style={{ marginRight: '10px' , fontSize:'13px'}}>{name}</span>
        </div>
        </nav>

      <header id='stuhead'>
        <h1>Welcome to PSG Tech Student Marks Dashboard</h1>
        <p style={{color:'white'}}>We are dedicated to fostering a better education for a brighter world. Our comprehensive mark visualization tools empower students to identify their areas of weakness, providing actionable insights to enhance their performance and achieve academic excellence.</p>
      </header>

      <footer id='stufooter'>
        <p style={{color:'white',fontSize:'15px'}}>Copyright &#169; 2024 - All Rights Reserved | PSG Tech</p>
      </footer>
    </div>
  </div>
  );
}

export default App;
