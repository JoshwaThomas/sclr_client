import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Date from 'some-library';

const DateAdmin = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [date, setDate] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSaveDates = async () => {
        await axios.post(`${apiUrl}/api/admin/dates`, {
            startDate,
            endDate,
        });
        alert('Application dates saved.');
    };

    useEffect(() => {
        const fetchDates = async () => {
          const response = await axios.get(`${apiUrl}/api/admin/dates`);
          const { startDate, endDate } = response.data;
          setDate(response.data);
          console.log("StartDate", startDate ,"- EndDate", endDate)
        //   const today = new Date();
        //   setIsOpen(today >= new Date(startDate) && today <= new Date(endDate));
        };
        fetchDates();
      }, [apiUrl]);
    

    return (
        <div>
            <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">Set Application Date Limitation</h3>

            <div className='flex gap-10 border border-white p-10 rounded-lg w-2/3 mt-10 mb-10'>
                <div>
                {/* <div>Start Date {date.startDate} - End Date {date.endDate}</div> */}
                    <label className='mr-5 font-bold text-lg'>Start Date: {new Date(date.startDate || '').toLocaleDateString('en-IN')}</label><br/>
                    <input
                        type="date"
                        value={startDate}
                        className='p-2 rounded-md'
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className='mr-5 font-bold text-lg'>End Date: {new Date(date.endDate || '').toLocaleDateString('en-IN')}</label><br/>
                    <input
                        type="date"
                        value={endDate}
                        className='p-2 rounded-md'
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
            <button type="button"
                onClick={handleSaveDates}
                className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 "
            >
                Save Date
            </button>
        </div>
    );
};

export default DateAdmin;
