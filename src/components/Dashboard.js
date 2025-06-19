import React, { useState, useEffect } from 'react';
import axios from "axios";
import Loading from '../assets/Pulse.svg';
import { Pie, Bar } from 'react-chartjs-2';
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
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
    LineElement,
    ChartDataLabels
);

const Dashboard = () => {

    const [data, setData] = useState(null);
    const [totalamount, setTotalAmount] = useState(0);
    const [columnBarData, setColumnBarData] = useState(null); // New state for column bar chart data
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // Fetching the dashboard data
        axios.get(`${apiUrl}/api/dashboard/counts`)
            .then(response => {
                setData(response.data);
                console.log(response.data);

                const total = response.data.scholamt.reduce((add, amount) => add + amount, 0);
                setTotalAmount(total);
            })
            .catch(err => console.log('Error fetching data:', err));

        // Fetching the column bar chart data
        axios.get(`${apiUrl}/api/dashboard/columnBarData`)
            .then(response => {
                setColumnBarData(response.data); // Set the fetched column bar data
            })
            .catch(err => console.log('Error fetching column bar chart data:', err));
    }, [apiUrl]);

    if (!data || !columnBarData) return <div><center><img src={Loading} alt="" className="w-36 h-80" /></center></div>;

    const barData = {
        labels: [`First Year UG ${data.firstYear + data.rfirstYear} / ${data.totalApplication}`, `Second Year UG ${data.secYear + data.rsecYear} / ${data.totalApplication}`, `Third Year UG ${data.thirdYear + data.rthirdYear} / ${data.totalApplication}`, `First Year PG ${data.pgfirstYear + data.rpgfirstYear} / ${data.totalApplication}`, `Second Year PG ${data.pgsecYear + data.rpgsecYear} / ${data.totalApplication}`],
        datasets: [
            {
                label: `'Applicants'`,
                data: [data.firstYear + data.rfirstYear, data.secYear + data.rsecYear, data.thirdYear + data.rthirdYear, data.pgfirstYear + data.rpgfirstYear, data.pgsecYear + data.rpgsecYear],
                backgroundColor: ['rgb(34,139,34)', 'rgb(251,79,20)', 'rgb(30,144,255)', 'rgb(34,139,34)', 'rgb(99,102,241)'],
                borderWidth: 1,
            },
        ],
    };

    const pieOptions = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16,
                    },
                    color: '#333',
                },
                position: 'top',
            },
            datalabels: {
                color: '#FFFFFF',
                formatter: (value) => value?value.toFixed(2) + '%':'',
                font: {
                    weight: 'bold',
                    size: 14,
                },
            },
        },
    };

    const pieData = {
        labels: [`FRESHERS ${data.ugCount} `, `RENEWALS ${data.pgCount}`,],
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
        labels: [[`Aided ${data.amCount + data.ramCount}`], [`SF Men ${data.sfmCount + data.rsfmCount}`], [`SF Women ${data.sfwCount + data.rsfwCount}`]],
        datasets: [
            {
                data: [(data.amCount + data.ramCount) / data.totalApplication * 100, (data.sfmCount + data.rsfmCount) / data.totalApplication * 100, (data.sfwCount + data.rsfwCount) / data.totalApplication * 100],
                backgroundColor: [
                    'rgb(6,95,70)',
                    'rgb(99,102,241)',
                    'rgb(251,79,20)',
                ],
            },
        ],
    };

    const pieData2 = {
        labels: [`Men ${data.amCount + data.ramCount + data.sfmCount + data.rsfmCount}`, `Women ${data.sfwCount + data.rsfwCount}`,],
        datasets: [
            {
                data: [(data.amCount + data.ramCount + data.sfmCount + data.rsfmCount) / data.totalApplication * 100, (data.sfwCount + data.rsfwCount) / data.totalApplication * 100],
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

    const barColors = [" bg-fuchsia-500", "bg-green-900", "bg-blue-500", "bg-teal-500", "bg-orange-500"];

    // Column Bar Chart Data preparation
    const columnBarChartData = {
        labels: ['I UG', 'II UG', 'III UG', 'I PG', 'II PG'],
        datasets: [
            {
                label: 'Men',
                data: [
                    columnBarData['I UG'].Men,
                    columnBarData['II UG'].Men,
                    columnBarData['III UG'].Men,
                    columnBarData['I PG'].Men,
                    columnBarData['II PG'].Men,
                ],
                backgroundColor: 'rgb(99,102,241)',
            },
            {
                label: 'Women',
                data: [

                    columnBarData['I UG'].Women,
                    columnBarData['II UG'].Women,
                    columnBarData['III UG'].Women,
                    columnBarData['I PG'].Women,
                    columnBarData['II PG'].Women,
                ],
                backgroundColor: '#fb4f14',
            },
            {
                label: 'Total',
                data: [
                    columnBarData['I UG'].Total,
                    columnBarData['II UG'].Total,
                    columnBarData['III UG'].Total,
                    columnBarData['I PG'].Total,
                    columnBarData['II PG'].Total,
                ],
                backgroundColor: 'rgb(6,95,70)',

            },
        ],
    };

    return (
        <div className="container mx-auto p-4 2xl:w-screen">
            {/* Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 2xl:gap-10">
                <div className="bg-gray-200 p-4 rounded shadow text-center text-xl font-bold 2xl:text-3xl">
                    <FontAwesomeIcon icon={faUsers} size="2x" />
                    <div>Total Applicants</div>
                    <div>{data.totalApplication}</div>
                </div>
                <div className="bg-gray-200 p-4 rounded shadow text-center text-xl font-bold 2xl:text-3xl">
                    <FontAwesomeIcon icon={faGraduationCap} size="2x" />
                    <div>Students Benefitted</div>
                    <div>{data.totalBenefit}</div>
                </div>
                <div className="bg-gray-200 p-4 rounded shadow text-center text-xl font-bold 2xl:text-3xl">
                    <FontAwesomeIcon icon={faMoneyCheckAlt} size="2x" />
                    <div>Scholarship Awarded</div>
                    <div>{formatCurrency(totalamount)}</div>
                </div>
                <div className="bg-gray-200 p-4 rounded shadow text-center text-xl font-bold 2xl:text-3xl">
                    <FontAwesomeIcon icon={faHandsHelping} size="2x" />
                    <div>Generous Donors</div>
                    <div>{data.totalDonars}</div>
                </div>
            </div>

            {/* Pie Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 2xl:gap-10">
                <div className="bg-gray-200 p-4 rounded shadow 2xl:text-3xl">
                    <Pie options={pieOptions} data={pieData} />
                </div>
                <div className="bg-gray-200 p-4 rounded shadow 2xl:text-3xl">
                    <Pie options={pieOptions} data={pieData1} />
                </div>
                <div className="bg-gray-200 p-4 rounded shadow 2xl:text-3xl">
                    <Pie options={pieOptions} data={pieData2} />
                </div>
            </div>
            {/* Bar Charts */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-8">
                {/* Right: Column Bar Chart */}
                <div className="bg-gray-200 p-4 rounded shadow 2xl:text-3xl">
                    <Bar
                        data={columnBarChartData}
                        height={200}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                datalabels: {
                                    color: 'white', // Change this to whatever color you want for the label text
                                    font: {
                                        weight: 'bold', // Optional: Make the label text bold
                                        size: 12, // Optional: Adjust the size of the label text
                                    },
                                    align: 'center', // Optional: Controls the positioning of the label inside the bar
                                },
                                title: {
                                    display: true,
                                    text: 'Student Distribution by Year and Gender',
                                    font: {
                                        size: 20,
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Year',
                                        font: {
                                            size: 20,
                                        },
                                    },
                                    grid: {
                                        display: false,
                                    },
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Count',
                                    },
                                    grid: {
                                        display: false,
                                    },
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                </div>
                {/* Left: Horizontal Bar Chart */}
                <div className="bg-gray-200 p-4 rounded shadow 2xl:text-3xl">
                    {barData.labels.map((label, index) => (
                        <div key={label} className="mb-4">
                            <div className="flex justify-between mb-1">
                                <span className="text-base font-medium text-gray-700 2xl:text-3xl">{label}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-5">
                                <div
                                    className={`${barColors[index % barColors.length]} h-5 rounded-full`}
                                    style={{
                                        width: `${(barData.datasets[0].data[index] / Math.max(...barData.datasets[0].data)) * 100}%`,
                                    }}
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
