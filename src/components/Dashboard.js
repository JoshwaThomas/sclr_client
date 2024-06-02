import React from 'react';
import { BsPeopleFill } from "react-icons/bs";
import { PiStudentFill } from "react-icons/pi";


function dashboard() {
  return (
    <div>
      <div className=' flex flex-row'>
        <div className=' bg-white box-border h-32 w-44 p-4 border-4'>
        <BsPeopleFill />
          No. of Students
        </div>
        <div className=' bg-white box-border h-32 w-44 p-4 ml-16 border-4'>
        <PiStudentFill />
          No. of Students Apply
        </div>
      </div>
    </div>
  )
}

export default dashboard