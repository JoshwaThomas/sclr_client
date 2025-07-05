import React, { useState } from 'react';
import axios from 'axios';

function Accyears() {

    const [acyear, setAcYear] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;

    const Submit = (e) => {
        e.preventDefault();
        axios.post(`${apiUrl}/api/admin/acyear`, { acyear })
            .then(() => {
                alert('Academic year set to active successfully.');
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                alert('Something Went Wrong');
            });
    };

    return (
        <div className="p-6">
            <h3 className="text-xl mb-6 font-semibold bg-gray-600 p-3 rounded text-white">
                Academic Year Selection
            </h3>
            <form onSubmit={Submit} className=" bg-white border border-gray-300 rounded-lg shadow p-6">
                <label htmlFor="acyear" className="block text-lg font-semibold mb-4 text-gray-700 w-[50%]">
                    Select Academic Year :
                </label>
                <div className="flex items-center space-x-4 w-[50%]">
                    <select
                        id="acyear"
                        name="acyear"
                        value={acyear}
                        onChange={(e) => setAcYear(e.target.value)}
                        className="flex-grow border border-gray-400 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                    >
                        <option value="">-- Select --</option>
                        {Array.from({ length: 11 }, (_, i) => {
                            const start = 2022 + i;
                            const end = start + 1;
                            return (
                                <option key={start} value={`${start}-${end}`}>
                                    {start}-{end}
                                </option>
                            )
                        })}
                    </select>
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md transition"
                    >
                        Set
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Accyears;