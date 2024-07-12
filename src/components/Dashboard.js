// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Loading from '../assets/Pulse.svg'
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
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

    const [data, setData] = useState(null);
    const [totalamount, setTotalAmount] = useState(0);


    useEffect(() => {
        axios.get('http://localhost:3001/api/dashboard/counts')
            .then(response => {
                setData(response.data)
                const total = response.data.scholamt.reduce((add, amount) => add + amount, 0);
                setTotalAmount(total);
            })
            .catch(err => console.log('Error fetching data:', err))
    }, []);

    if (!data) return <div ><center><img src={Loading} alt="" className=" w-36 h-80  " /></center></div>;


    const barData = {
        labels: ['First Year/UG', 'Second Year/UG', 'Third Year/UG', 'First Year/PG', 'Second Year/PG'],
        datasets: [
            {
                label: 'Applicants ',
                data: [data.firstYear, data.secYear, data.thirdYear, data.pgfirstYear, data.pgsecYear],
                backgroundColor: 'rgb(0,66,37)',
                borderColor: 'rgb(0,66,37)',
                borderWidth: 1,

            },
        ],
    };

    const options = {
        responsive: true,
        indexAxis: 'y',
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Number of Applicants by Year',
            },
        },
    };

    //   const outcomesData = [
    //     {
    //         title: "UG",
    //         values: [
    //             { label: "I Year", value: data.firstYear, maxValue: 100 },
    //             { label: "II Year", value: data.secYear, maxValue: 100 },
    //             { label: "III Year", value: data.thirdYear, maxValue: 100 },
    //         ],
    //     },
    //     {
    //         title: "PG",
    //         values: [
    //             { label: "I Year", value: data.pgfirstYear, maxValue: 100 },
    //             { label: "II Year", value: data.pgsecYear, maxValue: 100 },
    //         ],
    //     },
    // ];

    // const flattenedData = outcomesData.flatMap(group => group.values);
    // const labels = flattenedData.map(item => item.label);
    // const values = flattenedData.map(item => item.value);


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
                    ' rgb(253,88,0)',
                    'rgb(225,29,72)',
                    'rgb(14,165,233)',
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
                    'rgb(233,105,44)',
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
                    <div>{data.totalApplicants}</div>
                </div>

                <div className="bg-gray-100 p-4 py-11 rounded shadow text-center">
                    <FontAwesomeIcon icon={faGraduationCap} size="2x" />
                    <div>Students Benefitted</div>
                    <div>{data.totalBenefit}</div>
                </div>
                <div className="bg-gray-100 p-4 py-11 rounded shadow text-center">
                    <FontAwesomeIcon icon={faMoneyCheckAlt} size="2x" />
                    <div>Scholarship Funds Awarded</div>
                    <div>{totalamount}</div>

                </div>
                <div className="bg-gray-100 p-4 py-11 rounded shadow text-center">
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
                <div className="bg-white p-4 rounded shadow h-1/1.5">
                    <Bar data={barData} options={options} />
                </div>
            </div>
            {/* <div>
                {outcomesData.map((group, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="font-bold text-lg mb-2">{group.title}</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {group.values.map((item, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <span>{item.label}</span>
                                    <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
                                        <div
                                            className="bg-blue-600 h-6 rounded-full"
                                            style={{ width: `${(item.value / item.maxValue) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default Dashboard;
