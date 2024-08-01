import React from 'react';
import Layout from './components/shared/Layout';
import FLayout from './components/shared/freshLay';
import Studfirst from './components/students/studentfirst';
import Dashboard from './components/Dashboard';
import Fresh from './components/students/Freshform';
import Renewal from './components/students/Renewalform';
import First from './components/start/first';
import Guide from './components/students/Guide';
import Login from './components/login/login';
import Admin from './/components/shared/adminLay';
import Status from './components/students/status';
import Action from './components/admin/staffmang';
import Report from './components/admin/report';
import Stureport from './components/admin/reports/stureport';
import Catreport from './components/admin/reports/studaward';
import Accrej from './components/admin/reports/donoravl';
import Fundreport from './components/admin/reports/fundreport';
import AdminApplication from './components/admin/adminapplication';
import DonorMenu from './components/admin/donormenu';
import DonorForm from './components/admin/Donor/donar';
import DonorExisting from './components/admin/Donor/existing';
import DonarModify from './components/admin/Donor/modify';
import GetLetter from './components/admin/Donor/donarletter';
import DonorFundStatement from './components/admin/Donor/fundstatement';
import Distribute from './components/admin/distribution';
import Adstatus from './components/admin/status';
import Staff from './components/shared/staffLay';
import Attend from './components/staff/attendaided';
import AttendSfm from './components/staff/attendsfm';
import AttendSfw from './components/staff/attendsfw';
import Deeniyath from './components/staff/deeniyath';
import Moral from './components/staff/moral';
import Coe from './components/staff/coe';
import Allreport from './components/admin/reports/allreport';
import GuideLine from './components/admin/guide';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<First />} />
          <Route path='reglog' element={<Studfirst />} />
          <Route path='/freshstudent' element={<FLayout />} >
            <Route path="application/fresh" element={<Fresh />} />
          </Route>
          <Route path='login' element={<Login />} />
            <Route path='/student' element={<Layout />} >
              <Route path='dashboard' element={<Dashboard />} />
              <Route path="/student/application/renewal" element={<Renewal />} />
              <Route path="/student/guidelines" element={<Guide />} />
              <Route path='/student/status' element={<Status />} />
            </Route>
          {/* <Route path='login' element={<Login />} /> */}
            <Route path="/admin" element={<Admin />} >
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='/admin/application' element={<AdminApplication />} />
              <Route path='/admin/action' element={<Action />} />
              <Route path='/admin/report' element={<Report />} />
              <Route path='/admin/donormenu' element={<DonorMenu />} />
              <Route path='/admin/donor' element={<DonorForm />} />
              <Route path='/admin/existing' element={<DonorExisting />} />
              <Route path='/admin/donor/modify' element={<DonarModify />} />
              <Route path='/admin/fundreport' element={<DonorFundStatement />} />
              <Route path='/admin/getLetter' element={<GetLetter />} />
              <Route path='/admin/distribution_statement' element={<Distribute />} />
              <Route path='/admin/status' element={<Adstatus />} />
              <Route path='/admin/report/allreport' element={<Allreport />} />
              <Route path='/admin/report/stureport' element={<Stureport />} />
              <Route path='/admin/report/studawardreport' element={<Catreport />} />
              <Route path='/admin/report/fundavl' element={<Accrej />} />
              <Route path='/admin/report/fundreport' element={<Fundreport />} />
              <Route path='/admin/guidelines' element={<GuideLine />} />
            </Route>
            <Route path="/staff/:staffId/*" element={<Staff />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='attendance' element={<Attend />} />
              <Route path='attendance/sfm' element={<AttendSfm />} />
              <Route path='attendance/sfw' element={<AttendSfw />} />
              <Route path='deeniyath' element={ <Deeniyath />} /> 
              <Route path='moral' element={< Moral />} />
              <Route path='coe' element={< Coe />} />
            </Route> 

        </Routes>
      </Router>

    </div>
  );
}

export default App;
