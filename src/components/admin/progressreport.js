import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ProgressReport() {

    const apiUrl = process.env.REACT_APP_API_URL;
    const [staffData, setStaffData] = useState(null);

    useEffect(() => {
        const fetchStaffCounts = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/admin/staffCounts`);
                setStaffData(response.data);
            } catch (error) {
                console.error('Error fetching staff counts:', error);
            }
        };
        fetchStaffCounts();
    }, [apiUrl]);

    const formatCategory = (key) => {
        const caps = ['aided', 'sfm', 'sfw'];
        if (caps.includes(key)) return key.toUpperCase();
        return key
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/\b\w/g, char => char.toUpperCase());
    }

    const renderTableRows = () => {
        if (!staffData) return null;
        return Object.entries(staffData).map(([key, { total, finished, unfinished }]) => (
            <tr key={key} className="hover:bg-emerald-50 text-center">
                <td className="px-4 py-2 font-medium border-r">{formatCategory(key)}</td>
                <td className="px-4 py-2 border-r">{finished}</td>
                <td className="px-4 py-2  border-r">{unfinished}</td>
                <td className="px-4 py-2">{total}</td>
            </tr>
        ))
    }

    return (
        <div className="p-6">
            <h3 className="text-xl mb-6 font-semibold bg-gray-600 p-3 rounded text-white">
                Staff Password Management
            </h3>
            <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-10 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-emerald-600 text-white">
                        <tr>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Finished</th>
                            <th className="px-4 py-3">Unfinished</th>
                            <th className="px-4 py-3">Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {renderTableRows()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProgressReport;