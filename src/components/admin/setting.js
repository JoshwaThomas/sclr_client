import React from 'react'
import { useNavigate } from 'react-router-dom';

function Setting() {

    const navigate = useNavigate();
    const role = Number(localStorage.getItem('role'))

    return (
        <div className='grid grid-cols-3 gap-10 ml-3 mr-3 font-bold p-8 px-10'>
            <button
                onClick={() => navigate('/admin/setting/staffmang')}
                className={`${role !== 1 ? 'hidden' : ''} px-4 py-9 bg-green-500 text-white text-xl mt-32 border-y-8 border-x-4 border-l-gray-500 border-b-gray-500 border-r-gray-400 border-t-gray-400 shadow-2xl hover:bg-green-700 hover:border-l-gray-400 hover:border-b-gray-400 hover:border-r-gray-500 hover:border-t-gray-500 rounded-full w-76 h-32`}
            >
                Staff Manage
            </button>
            <button
                onClick={() => navigate('/admin/setting/accyears')}
                className={`${role !== 1 ? 'hidden' : ''} px-4 py-9 ml-2 bg-orange-500 text-white text-xl mt-32 border-y-8 border-x-4 border-l-gray-500 border-b-gray-500 border-r-gray-400 border-t-gray-400 shadow-2xl hover:bg-orange-700 hover:border-l-gray-400 hover:border-b-gray-400 hover:border-r-gray-500 hover:border-t-gray-500 rounded-full `}
            >
                Academic Year
            </button>
            <button
                onClick={() => navigate('/admin/setting/date')}
                className={`${role !== 1 ? 'hidden' : ''} px-4 py-9 ml-2 bg-purple-500 text-white text-xl mt-32 border-y-8 border-x-4 border-l-gray-500 border-b-gray-500 border-r-gray-400 border-t-gray-400 shadow-2xl hover:bg-purple-700 hover:border-l-gray-400 hover:border-b-gray-400 hover:border-r-gray-500 hover:border-t-gray-500 rounded-full `}
            >
                Application Date
            </button>
            <button
                onClick={() => navigate('/admin/setting/studentdata')}
                className={`px-4 py-9 bg-amber-500 text-xl text-white mt-16 border-y-8 border-x-4 border-l-gray-500 border-b-gray-500 border-r-gray-400 border-t-gray-400 shadow-2xl hover:bg-amber-700 hover:border-l-gray-400 hover:border-b-gray-400 hover:border-r-gray-500 hover:border-t-gray-500 rounded-full w-76 h-32`}
            >
                Student Data
            </button>
        </div>
    )
}

export default Setting