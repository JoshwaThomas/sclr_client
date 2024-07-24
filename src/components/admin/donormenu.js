import React from 'react';
import { useNavigate } from 'react-router-dom';
function Report() {
    const navigate = useNavigate();
    return (
        <div>
            <div className='grid grid-cols-3 gap-4 font-bold'>
                <button
                    onClick={() => navigate('/admin/donor')}
                    className="px-3 py-9 bg-cyan-500 text-white text-xl mt-32 hover:bg-black rounded-lg"
                    >
                    New Donar
                </button>
                <button
                    onClick={() => navigate('/admin/existing')}
                    className="px-4 py-9 ml-2 bg-cyan-500 text-white text-xl mt-32 hover:bg-black rounded-lg"
                >
                    Existing Donar
                </button>
                <button
                    onClick={() => navigate('/admin/donor/modify')}
                    className="px-4 py-9 ml-2 bg-cyan-500 text-white text-xl mt-32 hover:bg-black rounded-lg"
                >
                    Modify	
                </button>
                <div></div>
                <button
                    onClick={() => navigate('/admin/fundreport')}
                    className="px-4 py-9 -ml-44 mr-44 ml-2 bg-cyan-500 text-xl text-white mt-24 hover:bg-black rounded-lg"
                >
                    Scholarship Received
                </button>
                <button
                    onClick={() => navigate('/admin/getLetter')}
                    className="px-4 py-9 -ml-44 mr-44 ml-2  bg-cyan-500 text-xl text-white mt-24 hover:bg-black rounded-lg"
                >
                    Gratitude Note
                </button>
            </div>
        </div>
    )
}

export default Report;