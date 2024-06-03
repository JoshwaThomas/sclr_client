// src/Dashboard.js
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
    const barData = {
        labels: ['First Year/UG', 'Second Year/UG', 'Third Year/UG', 'First Year/PG','Second Year/PG'],
        datasets: [
            {
                label: 'Applicants',
                data: [120, 100, 190, 570, 200],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const pieData = {
        labels: ['UG', 'PG'],
        datasets: [
            {
                data: [63, 36],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(107, 34, 200, 63)',
                ],
            },
        ],
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-4 gap-4 mb-8 ">
                <div className="bg-gray-100 p-4 py-11 rounded shadow text-center">Total Applicants</div>
                <div className="bg-gray-100 p-4 py-11 rounded shadow text-center">Students Benefitted</div>
                <div className="bg-gray-100 p-4 py-11 rounded shadow text-center">Scholarship Funds Awarded</div>
                <div className="bg-gray-100 p-4 py-11 rounded shadow text-center">Generous Donors</div>
            </div>
            <div className="grid grid-cols-2 gap-6 h-30">
                <div className="bg-white p-4 rounded shadow h-1/2">
                    <Bar data={barData} />
                </div>
                <div className="bg-white p-4  rounded shadow ">
                    <Pie data={pieData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
