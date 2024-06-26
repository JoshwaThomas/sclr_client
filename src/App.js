import React from 'react';
import Layout from './components/shared/Layout';
import Dashboard from './components/Dashboard';
import Fresh from './components/students/Freshform';
import Renewal from './components/students/Renewalform';
import First from './components/start/first';
import Guide from './components/students/Guide';
import Login from './components/login/login';
import Admin from './/components/shared/adminLay';
import Status from './components/students/status';
import Action from './components/admin/action';
import Report from './components/admin/report';
import Stureport from './components/admin/reports/stureport';
import Catreport from './components/admin/reports/catreport';
import Accrej from './components/admin/reports/accrej';
import Fundreport from './components/admin/reports/fundreport';
import AdminApplication from './components/admin/adminapplication';
import DonorForm from './components/admin/donar';
import Staff from './components/shared/staffLay';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<First />} />
          <Route path='student' element={<Layout />} >
            <Route path='dashboard' element={<Dashboard />} />
            <Route path="/student/application/fresh" element={<Fresh />} />
            <Route path="/student/application/renewal" element={<Renewal />} />
            <Route path="/student/guidelines" element={<Guide />} />
            <Route path='/student/status' element={<Status />} />
          </Route>
          <Route path='login' element={<Login />} ></Route>
          <Route path="/admin" element={<Admin />} >
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='/admin/application' element={<AdminApplication />} />
            <Route path='/admin/action' element={<Action />} />
            <Route path='/admin/report' element={<Report />} />
            <Route path='/admin/donor' element={<DonorForm />} />
            <Route path='/admin/report/stureport' element={<Stureport />} />
            <Route path='/admin/report/catreport' element={<Catreport />} />
            <Route path='/admin/report/accrej' element={<Accrej />} />
            <Route path='/admin/report/fundreport' element={<Fundreport />} />
          </Route>
          <Route path="/staff" element={<Staff />}> 
            <Route path='dashboard' element={<Dashboard />} />

          </Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
