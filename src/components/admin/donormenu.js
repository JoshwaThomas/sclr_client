import React from 'react';
import { useNavigate } from 'react-router-dom';
function Report() {
    const navigate = useNavigate();
    return (
        <div>
            <div className='grid grid-cols-3 gap-10 ml-3 mr-3 font-bold'>
                <button
                    onClick={() => navigate('/admin/donor')}
                    className="px-4 py-12 bg-cyan-500 text-white text-2xl mt-32 hover:bg-cyan-700 rounded-lg"
                    >
                    New Donor
                </button>
                <button
                    onClick={() => navigate('/admin/existing')}
                    className="px-4 py-9 ml-2 bg-cyan-500 text-white text-2xl mt-32 hover:bg-cyan-700 rounded-lg"
                >
                    Existing Donor
                </button>
                <button
                    onClick={() => navigate('/admin/donor/modify')}
                    className="px-4 py-9 ml-2 bg-cyan-500 text-white text-2xl mt-32 hover:bg-cyan-700 rounded-lg"
                >
                    Modify	
                </button>
                <button
                    onClick={() => navigate('/admin/fundreport')}
                    className="px-4 py-12  ml-48 -mr-48 bg-cyan-500 text-2xl text-white mt-16 hover:bg-cyan-700 rounded-lg"
                >
                    Scholarship Received
                </button>
                <button
                    onClick={() => navigate('/admin/getLetter')}
                    className="px-4 py-9 -mr-52 ml-52   bg-cyan-500 text-2xl text-white mt-16 hover:bg-cyan-700 rounded-lg"
                >
                    Gratitude Note
                </button>
            </div>
        </div>
    )
}

export default Report;