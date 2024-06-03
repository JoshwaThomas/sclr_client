import React from 'react';
import Layout from './components/shared/Layout';
import Dashboard from './components/Dashboard';
import Fresh from './components/students/Freshform';
import First from './components/start/first';
import Guide from './components/students/Guide';
import Login from './components/login/login';
import Admin from './/components/shared/adminLay'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div>
     <Router>
      <Routes>
        <Route path="/" element={<First />} />
          <Route path='student' element={<Layout />} >
            <Route path='dashboard' element={<Dashboard />} />
            <Route path="/student/application" element={<Fresh />} />
            <Route path="/student/guidelines" element={<Guide />} />
          </Route>
          <Route path='login' element={<Login />} ></Route>
            <Route path="/admin" element={<Admin />} > 
              <Route path='dashboard' element={<Dashboard />} />
              
            </Route>
        </Routes>
    </Router>
    
    </div>
  );
}

export default App;
