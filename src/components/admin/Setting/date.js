import React, { useState } from 'react';
import axios from 'axios';

const Date = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSaveDates = async () => {
        await axios.post('http://localhost:3001/api/admin/dates', {
            startDate,
            endDate,
        });
        alert('Application dates saved.');
    };

    return (
        <div>
            <h1>Admin Page</h1>
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
