import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './stulogin'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './teachlogin'
import Home1 from './stuHome'
import Home2 from './teachHome'
import Mark from './mark';
import Home from './home';
import Report from './report';
import StudentMarksSheet from './markEntry';
import StudentDetails from './sreport';
import  {Helmet} from 'react-helmet';


function App() {
  
  return (
    <>
    <Helmet>
        <link rel="icon" href="favicon.png" type="image/png" />
      </Helmet>
    <BrowserRouter>
     <Routes>
       <Route path='/stulogin' element={<Signup />}></Route>
       <Route path='/techlogin' element={<Login />}></Route>
       <Route path='/stuhome' element={<Home1 />}></Route>
       <Route path='/teachhome' element={<Home2 />}></Route>
       <Route path='/report' element={<Report />}></Route>
       <Route path='/entrymark' element={<StudentMarksSheet />}></Route>
       <Route path='/sreport' element={<StudentDetails />}></Route>
       <Route path='/mark' element={<Mark />}></Route>
       <Route path='/' element={<Home />}></Route>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
