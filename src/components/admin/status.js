import React from 'react';
import { useState } from 'react';
import axios from "axios";

function Status() {
    const [registerNo, setRegisterNo] = useState()
    const [student, setStudent] = useState(null);
    
    const Submit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(`http://localhost:3001/api/admin/adstatus/${registerNo}`);
            setStudent(result.data);
            // alert('Application verify Successfully')
        } catch (err) {
            setStudent(null);
            alert('Student not found');
        }
    }


    return (
        <div>
            <div className="container mx-auto p-8">
                <form onSubmit={Submit} className="space-y-4 ">

                    <div className='  text-white'>
                        <h3 className="text-xl mb-2 font-bold bg-gray-600 p-1">Application Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">

                            <div>
                                <label className="block mb-1">Register No.:</label>
                                <input
                                    type="text"
                                    id="registerNo"
                                    name="registerNo"
                                    value={registerNo}
                                    onChange={(e) => setRegisterNo(e.target.value.toUpperCase())}
                                    className="w-72 p-2 uppercase border rounded-md text-slate-950"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 "
                        >
                            Check Status
                        </button>
                        {student && (
                            <div> <h1> Application verify Successfully </h1>  </div>
                        )}
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Status