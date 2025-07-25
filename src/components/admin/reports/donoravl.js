import { useEffect, useState, React } from 'react';
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function Donoravl() {

    const [users, setUsers] = useState([]);
    const [data, setData] = useState(null);
    const [totalamount, setTotalAmount] = useState(0);
    const [filterUsers, setFilterUsers] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredUsers = users.filter((user) =>
            (user.dept?.toLowerCase() || '').includes(searchText) ||
            (user.registerNo?.toLowerCase() || '').includes(searchText) ||
            (user.name?.toLowerCase() || '').includes(searchText) ||
            (user.fresherOrRenewal?.toLowerCase() || '').includes(searchText)
        );
        setFilterUsers(filteredUsers);
    }

    useEffect(() => {
        axios.get(`${apiUrl}/api/admin/donoravl`)
            .then(response => {
                setUsers(response.data);
                setFilterUsers(response.data);
            })
            .catch(err => console.log(err));
    }, [apiUrl]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/dashboard/counts`)
            .then(response => {
                setData(response.data);
                // console.log("tftfty",response.data)
                const total = response.data.scholamt.reduce((add, amount) => add + amount, 0);
                // console.log(total)
                setTotalAmount(total);
            })
            .catch(err => console.log('Error fetching data:', err));
    }, [apiUrl]);

    const handleDownload = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'DonorBalance_Report';
        const headers = ['Donor ID', 'Scholar Type', 'NAME', 'Balance', 'Zakkath']
        const dataWithHeaders = [headers, ...users.map(user => [user.did,
        user.scholtype, user.name, user.balance, user.zakkathbal
        ])]
        const ws = XLSX.utils.aoa_to_sheet(dataWithHeaders);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        saveAs(data, fileName + fileExtension);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency', currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    }

    const totalGeneral = filterUsers.reduce((sum, user) => sum + (user.balance || 0), 0);
    const totalZakat = filterUsers.reduce((sum, user) => sum + (user.zakkathbal || 0), 0);
    const openGeneral = filterUsers.reduce((sum, user) => sum + (user.amount || 0), 0);
    const openZaakat = filterUsers.reduce((sum, user) => sum + (user.zakkathamt || 0), 0);

    return (
        <div className="p-6">
            {/* Title */}
            <h1 className="text-xl mb-6 font-semibold bg-gray-600 p-3 rounded text-white">
                Funds Available Reports
            </h1>
            {/* Search Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex flex-wrap gap-3">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="uppercase p-2 border border-gray-400 rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-black"
                        onChange={handleSearch}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleDownload}
                    className="bg-green-600 text-lg hover:bg-green-700 text-white px-6 py-2 rounded-md"
                >
                    Download Excel
                </button>
            </div>
            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 mb-8">
                {/* Opening Balance */}
                <div className="bg-white border-l-4 border-orange-600 p-5 rounded-xl shadow-md space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        💼 Opening Balance
                    </h3>
                    <div className='flex gap-10 items-end'>
                        <p className="text-gray-800 font-medium text-lg">
                            General : <span className="font-bold">{formatCurrency(openGeneral)}</span>
                        </p>
                        <p className="text-gray-800 font-medium text-lg">
                            Zakat : <span className="font-bold">{formatCurrency(openZaakat)}</span>
                        </p>
                    </div>
                </div>
                {/* Students Benefitted */}
                <div className="bg-white border-l-4 border-indigo-600 p-5 rounded-xl shadow-md space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        💼 Student Benefitted
                    </h3>
                    <div className='flex gap-10 items-end'>
                        <p className="text-gray-800 font-medium text-lg">
                            Amount : <span className="font-bold">{formatCurrency(totalamount)}</span>
                        </p>
                    </div>
                </div>
                {/* Overall Fund */}
                <div className="bg-white border-l-4 border-green-600 p-5 rounded-xl shadow-md space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        👥 Fund Available
                    </h3>
                    <div className='flex gap-10 items-end'>
                        <p className="text-gray-800 font-medium text-lg">
                            General : <span className="font-bold">{formatCurrency(totalGeneral)}</span>
                        </p>
                        <p className="text-gray-800 font-medium text-lg">
                            Zakat : <span className="font-bold">{formatCurrency(totalZakat)}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-right font-semibold mb-5 text-lg">
                Total Donars : {filterUsers.length}
            </div>
            {/* Table Header */}
            <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                    {/* Table Header */}
                    <thead className="bg-emerald-700 text-white font-semibold">
                        <tr>
                            {['Donor ID', 'Scholar Type', 'Name', 'General', 'Zakat'].map((title, i) => (
                                <th
                                    key={i}
                                    className="px-6 py-3 text-center text-md font-semibold border-r border-emerald-800"
                                >
                                    {title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-100 text-gray-800 text-md font-medium">
                        {filterUsers.length > 0 ? (
                            filterUsers.map((user, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 transition-colors h-[60px]"
                                >
                                    <td className="px-6 py-3 text-center uppercase border-r border-gray-300">
                                        {user.did}
                                    </td>
                                    <td className="px-6 py-3 text-center uppercase border-r border-gray-300">
                                        {user.scholtype}
                                    </td>
                                    <td className="px-6 py-3 text-center uppercase border-r border-gray-300">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-3 text-center border-r border-gray-300">
                                        {formatCurrency(user.balance || 0)}
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        {formatCurrency(user.zakkathbal || 0)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center py-6 text-gray-500 font-semibold tracking-wide"
                                >
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default Donoravl;