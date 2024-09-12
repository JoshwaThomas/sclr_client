import React, { useState } from 'react';
import axios from 'axios';

const Date = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSaveDates = async () => {
        await axios.post(`${apiUrl}/api/admin/dates`, {
            startDate,
            endDate,
        });
        alert('Application dates saved.');
    };

    return (
        <div>
            <h1>Set Application Date Limitation</h1>
            <form>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleSaveDates}>
                    Save Dates
                </button>
            </form>
        </div>
    );
};

export default Date;
