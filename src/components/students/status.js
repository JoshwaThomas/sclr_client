import React from 'react';
import { useState } from 'react';
import axios from "axios";

function Status() {
    const [registerNo, setRegisterNo] = useState()
    const [mobileNo, setMobileNo] = useState()
    // const [student, setStudent] = useState(null);
    
    const Submit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/api/admin/status", {
            registerNo, mobileNo
        })
        .then(res => {
            console.log("Response from server:", res.data);
            if (res.data.status === 'exist') {
                const action = res.data.action;
                if (action === 1) {
                   alert("Success")
                } else if (action === 0) {
                    alert("not Success")
                }
            } else if (res.data.status === 'wrong password') {
                alert("Wrong Password");
            } else if (res.data.status === 'not exist') {
                alert("User does not exist");
            }
        })
        .catch(e => {
            alert("An error occurred. Please try again.");
            console.log(e);
        });
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
                            <div>
                                <input
                                    type='text'
                                    id='mobileNo'
                                    name='mobileNo'
                                    value={mobileNo}
                                    onChange={(e) => setMobileNo(e.target.value.toUpperCase())}
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
                        {/* {student && (
                            <div> <h1> Application verify Successfully </h1>  </div>
                        )} */}
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Status