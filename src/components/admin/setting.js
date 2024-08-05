import React from 'react'
import { useNavigate } from 'react-router-dom';

function Setting() {
    const navigate = useNavigate();
  
  
    return (
        <div>
            <div className='grid grid-cols-3 gap-10 ml-3 mr-3 font-bold'>
                <button
                    onClick={() => navigate('/admin/setting/staffmang')}
                    className="px-4 py-12 bg-cyan-500 text-white text-2xl mt-32 hover:bg-black rounded-lg"
                    >
                    Staff Manage
                </button>
                <button
                    onClick={() => navigate('/admin/setting/accyears')}
                    className="px-4 py-9 ml-2 bg-cyan-500 text-white text-2xl mt-32 hover:bg-black rounded-lg"
                >
                   Academic Year
                </button>
            </div>
        </div>
    )
}

export default Setting