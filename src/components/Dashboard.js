import React, { useState, useEffect } from 'react';
import axios from "axios";
import Loading from '../assets/Pulse.svg';
import {  Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
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
    ArcElement,
    PointElement,
    LineElement
);

const Dashboard = () => {

    const [data, setData] = useState(null);
    const [totalamount, setTotalAmount] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3001/api/dashboard/counts')
            .then(response => {
                setData(response.data);
                const total = response.data.scholamt.reduce((add, amount) => add + amount, 0);
                setTotalAmount(total);
            })
            .catch(err => console.log('Error fetching data:', err));
    }, []);

    if (!data) return <div><center><img src={Loading} alt="" className="w-36 h-80" /></center></div>;

    const barData = {
        labels: ['First Year UG', 'Second Year UG', 'Third Year UG', 'First Year PG', 'Second Year PG'],
        datasets: [
            {
                label: 'Applicants',
                data: [data.firstYear, data.secYear, data.thirdYear, data.pgfirstYear, data.pgsecYear],
                backgroundColor: ['rgb(34,139,34)', 'rgb(251,79,20)', 'rgb(30,144,255)', 'rgb(34,139,34)', 'rgb(99,102,241)'],
                borderWidth: 1,
            },
        ],
    };


    // const options = {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     indexAxis: 'y',
    //     plugins: {
    //         legend: {
    //             position: 'top',
    //         },
    //         title: {
    //             display: true,
    //             text: 'Number of Applicants by Year',
    //         },
    //     },
    // };

    const pieData = {
        labels: ['UG', 'PG',],
        datasets: [
            {

                data: [data.ugPercent, data.pgPercent],
                backgroundColor: [
                    'rgb(251,79,20)',
                    'rgb(6,95,70)',
                ],
            },
        ],
    };
    const pieData1 = {
        labels: ['SF Men', 'SF Women', 'Aided'],
        datasets: [
            {

                data: [data.sfmPercent, data.sfwPercent, data.amPercent],
                backgroundColor: [
                    'rgb(6,95,70)',
                    'rgb(99,102,241)',
                    'rgb(251,79,20)',
                ],
            },
        ],
    };
    const pieData2 = {
        labels: ['Men', 'Women',],
        datasets: [
            {

                data: [data.mensTotal, data.sfwPercent],
                backgroundColor: [
                    'rgb(99,102,241)',
                    'rgb(251,79,20)',
                ],
            },
        ],
    };

    const totalApplicants = barData.datasets[0].data.reduce((sum, value) => sum + value, 0);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-100 p-4 py-6 rounded shadow text-center text-xl font-bold">
                    <FontAwesomeIcon icon={faUsers} size="2x" />
                    <div>Total Applicants</div>
                    <div>{data.totalApplicants}</div>
                </div>
                <div className="bg-gray-100 p-4 py-6 rounded shadow text-center text-xl font-bold">
                    <FontAwesomeIcon icon={faGraduationCap} size="2x" />
                    <div>Students Benefitted</div>
                    <div>{data.totalBenefit}</div>
                </div>
                <div className="bg-gray-100 p-4 py-6 rounded shadow text-center text-xl font-bold">
                    <FontAwesomeIcon icon={faMoneyCheckAlt} size="2x" />
                    <div>Scholarship Funds Awarded</div>
                    <div>{formatCurrency(totalamount)}</div>
                </div>
                <div className="bg-gray-100 p-4 py-6 rounded shadow text-center text-xl font-bold">
                    <FontAwesomeIcon icon={faHandsHelping} size="2x" />
                    <div>Generous Donors</div>
                    <div>{data.totalDonars}</div>
                </div>
            </div>
            <div className="grid grid-cols-3 pb-4 gap-6 h-30">
                <div className="bg-white p-4 rounded shadow">
                    <Pie data={pieData} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <Pie data={pieData1} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <Pie data={pieData2} />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 h-30">
                {/* <div className="bg-white p-4 rounded shadow h-80 w-full">
                    <div className="relative h-72 w-full">
                        <Bar data={barData} options={options} />
                    </div>
                </div> */}
                <div className="bg-white p-4 rounded shadow w-full">
                    {barData.labels.map((label, index) => (
                        <div key={label} className="mb-4">
                            <div className="flex justify-between mb-1">
                                <span className="text-base font-medium text-gray-700">{label}</span>
                                <span className="text-base font-medium text-gray-700">
                                    {((barData.datasets[0].data[index] / totalApplicants) * 100).toFixed(2)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-5">
                                <div
                                    className="bg-blue-600 h-5 rounded-full"
                                    style={{ width: `${(barData.datasets[0].data[index] / totalApplicants) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;