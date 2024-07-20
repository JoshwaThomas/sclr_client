import React from 'react';
import { useNavigate } from 'react-router-dom';
function Report() {
    const navigate = useNavigate();
    return (
        <div>
            <div className='grid grid-cols-4 gap-4 font-bold'>
            <button
                    onClick={() => navigate('/admin/report/allreport')}
                    className="px-3 py-9 bg-cyan-500 text-white hover:bg-black rounded-lg"
                    >
                    ALL Reports in Excel Format
                </button>

                <button
                    onClick={() => navigate('/admin/report/stureport')}
                    className="px-3 py-9 bg-cyan-500 text-white hover:bg-black rounded-lg"
                    >
                    Student Reports
                </button>
                <button
                    onClick={() => navigate('/admin/report/catreport')}
                    className="px-4 py-9 ml-2 bg-cyan-500 text-white hover:bg-black rounded-lg"
                >
                    Category Reports
                </button>
                <button
                    onClick={() => navigate('/admin/report/accrej')}
                    className="px-4 py-9 ml-2 bg-cyan-500 text-white hover:bg-black rounded-lg"
                >
                    Accepted / Rejected Application
                </button>
                <button
                    onClick={() => navigate('/admin/report/fundreport')}
                    className="px-4 py-9 ml-2 bg-cyan-500 text-white hover:bg-black rounded-lg"
                >
                    Funds Reports
                </button>
                <button
                    onClick={() => navigate('/admin/report/stureport')}
                    className="px-3 py-9 bg-cyan-500 text-white hover:bg-black rounded-lg"
                    >
                    Student Reports
                </button>
            </div>
        </div>
    )
}

export default Report;