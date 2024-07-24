import React from 'react';
import { useNavigate } from 'react-router-dom';
function Report() {
    const navigate = useNavigate();
    return (
        <div>
            <div className='grid grid-cols-3 gap-4 font-bold '>
                <button
                    onClick={() => navigate('/admin/report/allreport')}
                    className="px-3 py-9 bg-cyan-500 text-white mt-32 text-xl hover:bg-black rounded-lg"
                >
                    ALL Reports in Excel Format
                </button>

                <button
                    onClick={() => navigate('/admin/report/stureport')}
                    className="px-3 py-9 bg-cyan-500 text-white mt-32 hover:bg-black text-xl rounded-lg"
                >
                    Student Reports
                </button>
                <button
                    onClick={() => navigate('/admin/report/studawardreport')}
                    className="px-4 py-9 ml-2 bg-cyan-500 text-white mt-32 hover:bg-black text-xl rounded-lg"
                >
                    Student Awarded Reports
                </button>
                <div>

                </div>

                <button
                    onClick={() => navigate('/admin/report/fundavl')}
                    className="px-4 py-9 -ml-44 mr-44 ml-2  bg-cyan-500 text-white mt-24 hover:bg-black text-xl rounded-lg"
                >
                    Funds Available
                </button>

                <button
                    onClick={() => navigate('/admin/report/fundreport')}
                    className="px-4 py-9 -ml-44 mr-44 ml-2 bg-cyan-500 text-white mt-24 hover:bg-black text-xl rounded-lg"
                >
                    Year wise Funds Reports
                </button>
                {/* <button
                    onClick={() => navigate('/admin/report/stureport')}
                    className="px-3 py-9 bg-cyan-500 text-white hover:bg-black rounded-lg"
                    >
                    Student Reports
                </button> */}
            </div>
        </div>
    )
}

export default Report;