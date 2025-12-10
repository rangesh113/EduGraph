import  'react'
import './mark.css'
import LineChart from "./LineChart";
import { useState} from "react";
import React, { useEffect } from 'react';
import logo from './assets/logo.png';


function mark() {
  const[name,setName]  = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(()=>{
  setName(sessionStorage.getItem("name"))
},[]);
const toggleMenu = () =>{
  setMenuOpen(!menuOpen);
};

  return (
    <div id="appMark">
     <nav id='marknav' className={menuOpen ? "show": ""}>
     <img src={logo} alt='LOGO' style={{ width: '150px' }} />
      <div className="hamburger" onClick={toggleMenu}>&#9776;</div>
      <div className={`dashmenu ${menuOpen ? 'show' : ''}`} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
        <a href='/stulogin' style={{ marginRight: '20px' }}>HOME</a>
        <a href='/stuhome' style={{ marginRight: '20px' }}>DASHBOARD</a>
        <a href='/sreport' style={{ marginRight: '20px' }}>REPORTS</a>
        <span id="username" style={{ marginRight: '10px' , fontSize:'13px'}}>{name}</span>
      </div>
    </nav>
<div className="container">
      <header id='head'>
        <h1 style={{ color:'white', fontSize:'30px' }}>MARK VISUALIZATION</h1>
        <p style={{ color:'white' }}>Visualize your mark</p>
    </header>

    <main>
        <section id='chart'>
            <div className="chart-container">
                <LineChart />
            </div>
        </section>
    </main>
    </div>
  </div>
    
  )
}

export default mark
