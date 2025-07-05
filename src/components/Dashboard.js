import React, { useState, useEffect } from 'react';
import axios from "axios";
import Loading from '../assets/Pulse.svg';
import { Pie, Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faGraduationCap, faMoneyCheckAlt, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
    ArcElement, PointElement, LineElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, ChartDataLabels);

const Dashboard = () => {

    const [data, setData] = useState(null);
    const [totalamount, setTotalAmount] = useState(0);
    const [columnBarData, setColumnBarData] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/api/dashboard/counts`)
            .then(response => {
                setData(response.data);
                const total = response.data.scholamt.reduce((add, amount) => add + amount, 0);
                setTotalAmount(total);
            })
            .catch(err => console.log('Error fetching data:', err));

        axios.get(`${apiUrl}/api/dashboard/columnBarData`)
            .then(response => setColumnBarData(response.data))
            .catch(err => console.log('Error fetching column bar chart data:', err));
    }, [apiUrl]);

    if (!data || !columnBarData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <img src={Loading} alt="Loading..." className="w-36 h-36" />
            </div>
        )
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    };

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
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                color: '#fff',
                formatter: (value) => (value ? value.toFixed(1) + '%' : ''),
                font: {
                    weight: 'bold',
                    size: 12,
                },
            },
        },
    };

    const pieData = {
        labels: [`FRESHERS (${data.ugCount})`, `RENEWALS (${data.pgCount})`],
        datasets: [{
            data: [data.ugPercent, data.pgPercent],
            backgroundColor: ['rgb(251,79,20)', 'rgb(6,95,70)'],
        }],
    };

    const pieData1 = {
        labels: [
            `Aided (${data.amCount + data.ramCount})`,
            `SF Men (${data.sfmCount + data.rsfmCount})`,
            `SF Women (${data.sfwCount + data.rsfwCount})`,
        ],
        datasets: [{
            data: [
                ((data.amCount + data.ramCount) / data.totalApplication) * 100,
                ((data.sfmCount + data.rsfmCount) / data.totalApplication) * 100,
                ((data.sfwCount + data.rsfwCount) / data.totalApplication) * 100,
            ],
            backgroundColor: ['rgb(6,95,70)', 'rgb(99,102,241)', 'rgb(251,79,20)'],
        }],
    };

    const pieData2 = {
        labels: [
            `Men (${data.amCount + data.ramCount + data.sfmCount + data.rsfmCount})`,
            `Women (${data.sfwCount + data.rsfwCount})`,
        ],
        datasets: [{
            data: [
                (data.amCount + data.ramCount + data.sfmCount + data.rsfmCount) / data.totalApplication * 100,
                (data.sfwCount + data.rsfwCount) / data.totalApplication * 100,
            ],
            backgroundColor: ['rgb(99,102,241)', 'rgb(251,79,20)'],
        }],
    };

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

    const barColors = ['bg-fuchsia-500', 'bg-green-900', 'bg-blue-500', 'bg-teal-500', 'bg-orange-500'];

    return (
        <div className='min-h-screen p-6 2xl:p-10'>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 2xl:mb-12 2xl:gap-12">
                {[
                    { icon: faUsers, label: 'Total Applicants', value: data.totalApplication },
                    { icon: faGraduationCap, label: 'Students Benefitted', value: data.totalBenefit },
                    { icon: faMoneyCheckAlt, label: 'Scholarship Awarded', value: formatCurrency(totalamount) },
                    { icon: faHandsHelping, label: 'Generous Donors', value: data.totalDonars },
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300 2xl:p-7">
                        <FontAwesomeIcon icon={item.icon} className="text-blue-600 text-3xl mb-3" />
                        <div className="text-gray-700 text-lg font-semibold mb-1">{item.label}</div>
                        <div className="text-black text-2xl font-bold">{item.value}</div>
                    </div>
                ))}
            </div>
            {/* Pie Charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6 mb-6 2xl:mb-12 2xl:gap-12">
                {[pieData, pieData1, pieData2].map((chartData, i) => (
                    <div
                        key={i}
                        className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-between 2xl:p-7"
                    >
                        <div className="relative w-[240px] h-[240px]">
                            <Pie data={chartData} options={pieOptions} />
                        </div>
                        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-700 2xl:p-7">
                            {chartData.labels.map((label, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                    <div
                                        className="w-3 h-3 rounded-sm"
                                        style={{ backgroundColor: chartData.datasets[0].backgroundColor[idx] }}
                                    ></div>
                                    <span className="whitespace-nowrap">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {/* Bar Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 2xl:gap-12">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <Bar
                        data={columnBarChartData}
                        height={300}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                datalabels: {
                                    color: '#333',
                                    font: { weight: 'bold', size: 12 },
                                    align: 'end',
                                },
                                title: {
                                    display: true,
                                    text: 'Student Distribution by Year and Gender',
                                    font: { size: 18 },
                                },
                            },
                            scales: {
                                x: {
                                    title: { display: true, text: 'Year', font: { size: 14 } },
                                    grid: { display: false },
                                },
                                y: {
                                    beginAtZero: true,
                                    title: { display: true, text: 'Count', font: { size: 14 } },
                                    grid: { display: false },
                                },
                            },
                        }}
                    />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="space-y-5">
                        {barData.labels.map((label, index) => {
                            const value = barData.datasets[0].data[index];
                            const percentage = (value / Math.max(...barData.datasets[0].data)) * 100;
                            const [labelText] = label.split(/(?=\d)/);
                            const countText = label.match(/\d+ \/ \d+/)?.[0] || '';

                            return (
                                <div key={index}>
                                    <div className="flex justify-between mb-1 text-gray-700 font-medium">
                                        <span>{labelText.trim()}</span>
                                        <span>{countText}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div
                                            className={`${barColors[index % barColors.length]} h-4 rounded-full`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;