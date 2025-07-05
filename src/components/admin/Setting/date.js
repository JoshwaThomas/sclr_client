import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DateAdmin = () => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [date, setDate] = useState({});
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSaveDates = async () => {
        try {
            await axios.post(`${apiUrl}/api/admin/dates`, { startDate, endDate });
            alert('Application dates saved.');
        } catch (error) {
            console.error('Error saving dates:', error);
            alert('Failed to save dates.');
        }
    };

    useEffect(() => {
        const fetchDates = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/admin/dates`);
                setDate(response.data);
            } catch (error) {
                console.error('Error fetching dates:', error);
            }
        };
        fetchDates();
    }, [apiUrl]);

    return (
        <div className="p-6">
            <h3 className="text-xl mb-6 font-semibold bg-gray-600 p-3 rounded text-white">
                Application Date Limitation
            </h3>
            <div className="bg-white border border-gray-300 rounded-lg shadow p-6 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-start">
                {/* Start Date */}
                <div className="w-full md:w-auto">
                    <label className="block text-lg font-semibold text-gray-700 mb-4">
                        Start Date :
                        <span className="ml-2 text-md text-blue-600">
                            {date.startDate ? new Date(date.startDate).toLocaleDateString('en-IN') : '—'}
                        </span>
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border border-gray-400 rounded-md px-3 py-1.5 text-gray-800 w-full md:w-[180px]"
                    />
                </div>
                {/* End Date */}
                <div className="w-full md:w-auto">
                    <label className="block text-lg font-semibold text-gray-700 mb-4">
                        End Date :
                        <span className="ml-2 text-md text-blue-600">
                            {date.endDate ? new Date(date.endDate).toLocaleDateString('en-IN') : '—'}
                        </span>
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border border-gray-400 rounded-md px-3 py-1.5 text-gray-800 w-full md:w-[180px]"
                    />
                </div>
                {/* Save Button with invisible label for alignment */}
                <div className="w-full md:w-auto">
                    <label className="block mb-5 invisible">Action</label>
                    <button
                        type="button"
                        onClick={handleSaveDates}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 h-[39px] rounded-md transition w-full md:w-auto"
                    >
                        Save Dates
                    </button>
                </div>
            </div>
        </div>

    )
}

export default DateAdmin;
