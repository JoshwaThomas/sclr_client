import React from 'react';
import { useNavigate } from 'react-router-dom';

function Report() {

    const navigate = useNavigate();

    return (
        <div className='grid grid-cols-3 gap-10 ml-3 mr-3 font-bold p-8 px-10'>
            <button
                // onClick={() => navigate('/admin/report/allreport')}
                className="px-4 py-9 bg-orange-500 text-white text-xl mt-32 border-y-8 border-x-4 border-l-gray-500 border-b-gray-500 border-r-gray-400 border-t-gray-400 shadow-2xl hover:bg-orange-600 hover:border-l-gray-400 hover:border-b-gray-400 hover:border-r-gray-500 hover:border-t-gray-500 rounded-full w-76 h-32"
            >
                ALL Reports
            </button>
            <button
                // onClick={() => navigate('/admin/report/stureport')}
                className="px-4 py-9 bg-blue-500 text-white text-xl mt-32 border-y-8 border-x-4 border-l-gray-500 border-b-gray-500 border-r-gray-400 border-t-gray-400 shadow-2xl hover:bg-blue-600 hover:border-l-gray-400 hover:border-b-gray-400 hover:border-r-gray-500 hover:border-t-gray-500 rounded-full w-76 h-32"
            >
                Student Reports
            </button>
            <button
                // onClick={() => navigate('/admin/report/studawardreport')}
                className="px-4 py-9 bg-teal-500 text-white text-xl mt-32 border-y-8 border-x-4 border-l-gray-500 border-b-gray-500 border-r-gray-400 border-t-gray-400 shadow-2xl hover:bg-teal-600 hover:border-l-gray-400 hover:border-b-gray-400 hover:border-r-gray-500 hover:border-t-gray-500 rounded-full w-76 h-32"
            >
                Funds Recieved by Students
            </button>
            <button
                onClick={() => navigate('/admin/report/fundavl')}
                className="px-4 py-9 bg-green-500 text-xl text-white mt-16 border-y-8 border-x-4 border-l-gray-500 border-b-gray-500 border-r-gray-400 border-t-gray-400 shadow-2xl hover:bg-green-600 hover:border-l-gray-400 hover:border-b-gray-400 hover:border-r-gray-500 hover:border-t-gray-500 rounded-full w-76 h-32"
            >
                Funds Available
            </button>
            <button
                // onClick={() => navigate('/admin/report/fundreport')}
                className="px-4 py-9 bg-purple-600 text-white text-xl mt-16 border-y-8 border-x-4 border-l-gray-500 border-b-gray-500 border-r-gray-400 border-t-gray-400 shadow-2xl hover:bg-purple-700 hover:border-l-gray-400 hover:border-b-gray-400 hover:border-r-gray-500 hover:border-t-gray-500 rounded-full w-76 h-32"
            >
                Yearly Fund Reports
            </button>
            <button
                // onClick={() => navigate('/admin/report/staffmaint')}
                className="px-4 py-9 bg-red-500 text-xl text-white mt-16 border-y-8 border-x-4 border-l-gray-500 border-b-gray-500 border-r-gray-400 border-t-gray-400 shadow-2xl hover:bg-red-600 hover:border-l-gray-400 hover:border-b-gray-400 hover:border-r-gray-500 hover:border-t-gray-500 rounded-full w-76 h-32"
            >
                Record Verification
            </button>
        </div>

    )
}

export default Report;