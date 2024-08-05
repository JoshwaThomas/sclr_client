import React from 'react';
import { useState } from 'react';
import axios from "axios";

function Status() {
    const [registerNo, setRegisterNo] = useState()
    const [mobileNo, setMobileNo] = useState()
    // const [student, setStudent] = useState(null);

    const Submit = async (e) => {
        e.preventDefault();
        axios.get("http://localhost:3001/api/admin/studstatus", {
            params: { registerNo, mobileNo }
        })
            .then(res => {
                console.log("Response from server:", res.data);
                if (res.data.success) {
                    alert(res.data.message);
                } else {
                    alert(res.data.message); // Display the message returned from the backend
                }
            })
            .catch(e => {
                alert("An error occurred. Please try again.");
                console.log(e);
            });
    };

    // const handleChange = (e) => {
    //     const value = e.target.value;
    //     // Only set the state if the value is empty or a number
    //     if (value === '' || /^\d+$/.test(value)) {
    //         setMobileNo(value);
    //     }
    // };

    return (
        <div>
            <div className="container mx-auto p-8">
                <form onSubmit={Submit} className="space-y-4 ">

                    <div className=' text-white'>
                        <h3 className="text-xl mb-2 font-bold bg-gray-600 p-1">Application Status</h3>
                        <div className="grid grid-rows-2 md:grid-cols-1 gap-4 ">

                            <div >
                                <label className="block mb-1">Register No:</label>
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
                                <label className="block mb-1">Mobile No:</label>
                                <input
                                    type='number'
                                    id='mobileNo'
                                    name='mobileNo'
                                    inputMode="numeric"
                                    value={mobileNo}
                                    pattern="\d*"
                                    onChange={(e) => setMobileNo(e.target.value.toUpperCase())}
                                    className="w-72 p-2 uppercase border rounded-md text-slate-950 rem"
                                    required
                                />
                            </div>


                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-8 "
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