import React from 'react';
import { useNavigate } from 'react-router-dom';

function Report() {

    const navigate = useNavigate();

    return (
        <div className='grid grid-cols-3 gap-10 ml-3 mr-3 font-bold p-8 px-10'>
            <button
                onClick={() => navigate('/admin/donor')}
                className="px-4 py-9 bg-green-500 text-white text-xl mt-32 border-y-8 border-x-4 border-l-gray-500 border-b-gray-500 border-r-gray-400 border-t-gray-400 shadow-2xl hover:bg-green-700 hover:border-l-gray-400 hover:border-b-gray-400 hover:border-r-gray-500 hover:border-t-gray-500 rounded-full w-76 h-32"
            >
                New Donor
            </button>
            <button
                onClick={() => navigate('/admin/existing')}
                className="px-4 py-9 bg-blue-500 text-white text-xl mt-32 border-y-8 border-x-4 border-l-gray-500 border-b-gray-500 border-r-gray-400 border-t-gray-400 shadow-2xl hover:bg-blue-700 hover:border-l-gray-400 hover:border-b-gray-400 hover:border-r-gray-500 hover:border-t-gray-500 rounded-full w-76 h-32"
            >
                Existing Donor
            </button>
            <button
                // onClick={() => navigate('/admin/donor/modify')}
                className="px-4 py-9 bg-orange-600 text-white text-xl mt-32 border-y-8 border-x-4 border-l-gray-500 border-b-gray-500 border-r-gray-400 border-t-gray-400 shadow-2xl hover:bg-orange-700 hover:border-l-gray-400 hover:border-b-gray-400 hover:border-r-gray-500 hover:border-t-gray-500 rounded-full w-76 h-32"
            >
                Modify
            </button>
            <button
                // onClick={() => navigate('/admin/fundreport')}
                className="px-4 py-9 ml-48 -mr-48 bg-purple-600 text-xl text-white mt-16 border-y-8 border-x-4 border-l-gray-500 border-b-gray-500 border-r-gray-400 border-t-gray-400 shadow-2xl hover:bg-purple-700 hover:border-l-gray-400 hover:border-b-gray-400 hover:border-r-gray-500 hover:border-t-gray-500 rounded-full w-76 h-32"
            >
                Scholarship Received
            </button>
            <button
                // onClick={() => navigate('/admin/getLetter')}
                className="px-4 py-9 -mr-52 ml-52   bg-yellow-500 text-xl text-white mt-16 border-y-8 border-x-4 border-l-gray-500 border-b-gray-500 border-r-gray-400 border-t-gray-400 shadow-2xl hover:bg-yellow-600 hover:border-l-gray-400 hover:border-b-gray-400 hover:border-r-gray-500 hover:border-t-gray-500 rounded-full w-76 h-32"
            >
                Gratitude Note
            </button>
        </div>
    )
}

export default Report;