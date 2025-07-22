import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../assets/Pulse.svg';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function Distribution() {

    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [donorMapping, setDonorMapping] = useState({});
    const [data, setData] = useState(null);
    const [totalamount, setTotalAmount] = useState(0);
    const [totaldonaramt, setDonaramt] = useState(0);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, donorsRes] = await Promise.all([
                    axios.get(`${apiUrl}/api/admin/freshamt`),
                    axios.get(`${apiUrl}/api/admin/donors`)
                ]);
                const donorMap = donorsRes.data.reduce((map, donor) => {
                    map[donor._id] = donor.name;
                    return map;
                }, {});
                setUsers(usersRes.data);
                console.log('Users :', users)
                setFilterUsers(usersRes.data);
                console.log('Filters :', users)
                setDonorMapping(donorMap);
                console.log('DonarMap :', users)

            } catch (err) { console.error(err) }
        };
        fetchData();
    }, [apiUrl]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/dashboard/counts`)
            .then(res => {
                setData(res.data);
                setTotalAmount(res.data.scholamt.reduce((a, b) => a + b, 0));
                setDonaramt(res.data.donaramt.reduce((a, b) => a + b, 0));
            })
            .catch(err => console.error(err));
    }, [apiUrl]);

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filtered = users.filter(user => {
            const dept = typeof user.dept === 'string' ? user.dept.toLowerCase() : '';
            const regNo = typeof user.registerNo === 'string' ? user.registerNo.toLowerCase() : '';
            const name = typeof user.name === 'string' ? user.name.toLowerCase() : '';
            const donorName = typeof donorMapping[user.scholdonar] === 'string' ? donorMapping[user.scholdonar].toLowerCase() : '';
            return (
                dept.includes(searchText) ||
                regNo.includes(searchText) ||
                name.includes(searchText) ||
                donorName.includes(searchText)
            )
        })
        setFilterUsers(filtered);
    }

    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    }).format(amount);

    const handleDownload = () => {
        const headers = ['REG NO', 'NAME', 'DEPARTMENT', 'TYPE', 'DONOR NAME', 'AMOUNT'];
        const sheetData = [headers, ...users.map(u => [
            u.registerNo,
            u.name,
            u.dept,
            u.scholtype,
            donorMapping[u.scholdonar] || u.scholdonar,
            formatCurrency(u.scholamt)
        ])];

        const ws = XLSX.utils.aoa_to_sheet(sheetData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        });
        saveAs(data, 'Distribution_Statement.xlsx');
    }

    if (!data) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <img src={Loading} alt="Loading..." className="w-28" />
            </div>
        )
    }

    return (
        <div className="p-6">
            <h1 className="text-xl mb-6 font-semibold bg-gray-600 p-3 rounded text-white">
                Distribution Statement
            </h1>
            <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search ..."
                    className="p-2 border border-gray-400 rounded-md w-72 uppercase"
                    onChange={handleSearch}
                />
                <button
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
                    onClick={handleDownload}
                >
                    Download Excel
                </button>
            </div>
            <div className="text-right font-semibold mb-3 text-lg">
                Total Students : {filterUsers.length}
            </div>
            <div className="overflow-x-auto rounded-lg shadow ring-1 font-semibold ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-emerald-700">
                        <tr>
                            <th className="px-4 py-3 text-center text-md font-semibold text-white border-r border-gray-300 w-[6%]">
                                S.No
                            </th>
                            {['Reg No', 'Name', 'Department', 'Type', 'Donor Name', 'Amount'].map((heading) => (
                                <th
                                    key={heading}
                                    className="px-6 py-4 text-center text-md font-semibold text-white border-r border-gray-300"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {filterUsers.length > 0 ? (
                            filterUsers.map((user, index) => (
                                <tr
                                    key={user.index}
                                    className="hover:bg-gray-50 font-semibold transition-colors border-t border-gray-300 h-20"
                                >
                                    <td className="px-4 py-3 text-center text-sm text-gray-700 uppercase border-r">{index + 1}</td>
                                    <td className="px-6 py-3 text-center text-sm text-gray-700 uppercase border-r">
                                        {user.registerNo}
                                    </td>
                                    <td className="px-6 py-3 text-center text-sm text-gray-700 uppercase border-r">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-3 text-center text-sm text-gray-700 uppercase border-r">
                                        {user.dept}
                                    </td>
                                    <td className="px-6 py-3 text-center text-sm text-gray-700 uppercase border-r">
                                        {user.scholtype}
                                    </td>
                                    <td className="px-6 py-3 text-center text-sm text-gray-700 uppercase border-r">
                                        {donorMapping[user.scholdonar] || user.scholdonar}
                                    </td>
                                    <td className="px-6 py-3 text-center text-sm text-gray-700">
                                        {formatCurrency(user.scholamt)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center py-6 text-gray-500 font-semibold tracking-wide"
                                >
                                    No record found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <div className="bg-white border-l-4 border-blue-600 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        📋 Application Summary
                    </h3>
                    <div className="flex justify-between text-gray-700">
                        <span>Applied Students :</span>
                        <span className="font-bold">{data.totalApplicants}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 mt-2">
                        <span>Benefitted Students :</span>
                        <span className="font-bold">{data.totalBenefit}</span>
                    </div>
                </div>
                <div className="bg-white border-l-4 border-green-600 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        💰 Scholarship Summary
                    </h3>
                    <div className="flex justify-between text-gray-700">
                        <span>Total Received :</span>
                        <span className="font-bold">{formatCurrency(totaldonaramt)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 mt-2">
                        <span>Total Awarded :</span>
                        <span className="font-bold">{formatCurrency(totalamount)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Distribution;