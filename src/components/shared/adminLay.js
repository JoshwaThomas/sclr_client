import React,  { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png'; 
import Jmc from '../../assets/jmc_logo.png';
import axios from 'axios';

function StudentLayout() {
  let menus = [
    { icon: 'menu', 
    name: 'Dashboard', 
    path: 'dashboard' 
   },
    { icon: 'add-circle', 
    name: 'Application', 
    path: '/admin/application'
   },
    { icon: 'people', 
    name: 'Status', 
    path: 'guidelines' },
  
  { icon: 'add-circle', 
    name: 'Donor', 
    path: '/admin/donor'
   },
   { icon: 'add-circle', 
   name: 'Action', 
   path: '/admin/action'
  },
   { icon: 'add-circle', 
    name: 'Reports', 
    path: '/admin/report'
   },
   { icon: 'add-circle', 
    name: 'GuideLines', 
    path: 'guidelines'
   },
   { icon: 'add-circle', 
    name: 'Logout', 
    path: '/'
   },
  ];

  const [acyear, setAcYear] = useState();

  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/api/admin/acyear", {acyear})
    .then(result => {
      if(result.data.success){
        window.alert("Academic Year Set Successfully");
      }
      else if(result.data.message === 'Already Existing'){
        alert("Already Existing")
      }
      else{
        alert('Something went worng')
      }
    })
    .catch(err => {
      console.log(err);
      window.alert("Something Went Wrong");
    });
  }

  return (
    <div className="flex flex-row bg-slate-500 h-screen w-screen ">
      <div className="bg-emerald-700 w-64 p-3 flex flex-col text-black">
        <div className=' flex flex-col mb-10 place-items-center'>
        <img src={Jmclogo} alt="" className=" w-36 h-40  " />
        <img src={Jmc} alt="" className=" w-60 " />
        <div>
          <form  onSubmit= {Submit} >
              <label className="block mb-1">Academic:</label>
              <select
                name="acyear"
                value={acyear}
                onChange={(e) => setAcYear(e.target.value)}
                className=" w-28 p-1 border  rounded-md text-slate-950"
                required
                readOnly
              >
                <option value="">Select</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2025-2026">2026-2027</option>
                <option value="2027-2028">2027-2028</option>
                <option value="2028-2029">2028-2029</option>
                <option value="2029-2030">2029-2030</option>
                <option value="2030-2031">2030-2031</option>
                <option value="2031-203">2031-2032</option>
                <option value="2032-2033">2032-2033</option>
                
              </select>
              <button type='submit' className=" p-1 border px-3 ml-3 rounded-md bg-orange-500">set</button>
              </form>
            </div>
        </div>
        {menus.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `space-x-4 text-xl pl-[5px] flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50 ${
                isActive ? 'bg-black rounded-[5px] bg-opacity-50' : ''
              }`
            }
          >
            <ion-icon name={item.icon}></ion-icon>
            <label className="text-center cursor-pointer font-medium text-base text-white relative z-10">
              {item.name}
            </label>
          </NavLink>
        ))}
      </div>
      <div className="p-4 flex-1 overflow-auto overflow-scroll">
        
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default StudentLayout;
