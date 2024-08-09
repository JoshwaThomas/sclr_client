import React, { useState,  } from 'react';
import axios from 'axios';

function Accyears() {

    const [acyear, setAcYear] = useState('');

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/api/admin/acyear", { acyear })
            .then(result => {
                alert('Academic year set to active successfully.');
                // fetchActiveAcademicYear(); // Update active academic year after setting
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                alert('Something Went Wrong');
            });
    };

    return (
        <div>
             <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">Academic Year</h3>

            <div>
                <form onSubmit={Submit}>
                    {/* <label className="block mb-1 flex inline-flex text-white ml-10">Academic: {activeAcYear}</label> */}
                    <select
                        name="acyear"
                        value={acyear}
                        onChange={(e) => setAcYear(e.target.value)}
                        className="w-28 p-1 border rounded-md text-slate-950 ml-4 mt-5"
                        required
                    >
                        <option value="">Select</option>
                        <option value="2022-2023">2022-2023</option>
                        <option value="2023-2024">2023-2024</option>
                        <option value="2024-2025">2024-2025</option>
                        <option value="2025-2026">2025-2026</option>
                        <option value="2026-2027">2026-2027</option>
                        <option value="2027-2028">2027-2028</option>
                        <option value="2028-2029">2028-2029</option>
                        <option value="2029-2030">2029-2030</option>
                        <option value="2030-2031">2030-2031</option>
                        <option value="2031-2032">2031-2032</option>
                        <option value="2032-2033">2032-2033</option>
                    </select>
                    <button type='submit' className="p-1 border px-3 ml-3 rounded-md bg-orange-500">Set</button>

                </form>
            </div>

        </div>
    )
}

export default Accyears