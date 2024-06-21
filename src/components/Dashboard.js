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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faGraduationCap, faMoneyCheckAlt, faHandsHelping } from '@fortawesome/free-solid-svg-icons';

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
                label: 'Applicants ',
                data: [120, 100, 190, 570, 200],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                
            },
        ],
    };

    const pieData = {
        labels: ['UG', 'PG', ],
        datasets: [
            {
                
                data: [63, 36],
                backgroundColor: [
                    'rgb(225,29,72)',
                    'rgb(6,95,70)',
                ],
            },
        ],
    };
    const pieData1 = {
        labels: ['SF Men', 'SF Women', 'Aided'],
        datasets: [
            {
                
                data: [43,25,31],
                backgroundColor: [
                    'rgb(225,29,72)',
                    'rgb(6,95,70)',
                    'rgb(14,165,233)',
                ],
            },
        ],
    };
    const pieData2 = {
        labels: ['Men', 'Women', ],
        datasets: [
            {
                
                data: [63, 36],
                backgroundColor: [
                    'rgb(99,102,241)',
                    'rgb(101, 163, 13)',
                ],
            },
        ],
    };
    
    

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-4 gap-4 mb-8 ">
                <div className="bg-gray-100 p-4 py-11 rounded shadow text-center">
                    <FontAwesomeIcon icon={faUsers} size="2x" />
                    <div>Total Applicants</div>
                </div>
                <div className="bg-gray-100 p-4 py-11 rounded shadow text-center">
                    <FontAwesomeIcon icon={faGraduationCap} size="2x" />
                    <div>Students Benefitted</div>
                </div>
                <div className="bg-gray-100 p-4 py-11 rounded shadow text-center">
                    <FontAwesomeIcon icon={faMoneyCheckAlt} size="2x" />
                    <div>Scholarship Funds Awarded</div>
                </div>
                <div className="bg-gray-100 p-4 py-11 rounded shadow text-center">
                    <FontAwesomeIcon icon={faHandsHelping} size="2x" />
                    <div>Generous Donors</div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6 h-30">
            <div className="bg-white p-4 rounded shadow">
                    <Pie data={pieData} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <Pie data={pieData1} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <Pie data={pieData2} />
                </div>
                <div className="bg-white p-4 rounded shadow h-1/1.4">
                    <Bar data={barData} />
                </div>
                
            </div>
        </div>
    );
};

export default Dashboard;
