import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function DonarLetter() {
    const [users, setUsers] = useState(null);
    const [did, setDid] = useState('');
    const [name, setName] = useState('');
    const [panList, setPanList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        fetchPanList();
    }, []);

    const fetchPanList = async (e) => {
        if (e) {
            e.preventDefault(); 
        }

        try {
            const response = await axios.get('http://localhost:3001/api/admin/panlist');
            console.log('Fetched Donors:', response.data); 
            setPanList(response.data);
        } catch (error) {
            console.error('Error fetching donors:', error);
            setPanList([]); 
        }
    };

    const filteredPanList = panList.filter(panItem =>
        panItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        panItem.did.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (name, did) => {
        setSearchTerm(name);
        setName(name);
        setDid(did);
        setIsDropdownOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleData = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.get('http://localhost:3001/api/admin/donarletter', {
                params: { name, did }
            });
            if (result.data) {
                setUsers(result.data);
            } else {
                setUsers(null);
                alert('Donor Data not found');
            }
        } catch (err) {
            console.error('Error fetching donor data:', err);  // Improved error logging
            setUsers(null);
            alert('Donor Data not found');
        }
    }

    return (
        <div>
            <h1>Donor Letter</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div onChange={(e) => fetchPanList(e)} className=''>
                    <div ref={dropdownRef} className="relative grid grid-cols-2  gap-4">
                        <div>
                            <label className="block mb-1">Name</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setIsDropdownOpen(true);
                                }}
                                onClick={() => setIsDropdownOpen(true)}
                                className="w-72 p-2 border rounded-md text-slate-950 lg:w-44 "
                                placeholder="Search Donor"
                                required
                            />
                            {isDropdownOpen && (
                                <ul className="absolute z-10 w-72 p-2 border rounded-md bg-white lg:w-48 max-h-60 overflow-y-auto">
                                    {filteredPanList.length > 0 ? (
                                        filteredPanList.map((panItem) => (
                                            <React.Fragment key={panItem.did}>
                                                <li
                                                    onClick={() => handleSelect(panItem.name, panItem.did)}
                                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                                >
                                                    {panItem.name}
                                                </li>
                                                <li
                                                    onClick={() => handleSelect(panItem.name, panItem.did)}
                                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                                >
                                                    {panItem.did}
                                                </li>
                                            </React.Fragment>
                                        ))
                                    ) : (
                                        <li className="p-2">No results found</li>
                                    )}
                                </ul>
                            )}
                        </div>
                        <button onClick={handleData} className='bg-blue-500 text-white py-2 px-4 ml-16 hover:bg-black rounded-lg mt-7'>
                            Get
                        </button>
                    </div>
                </div>
            </div>
           <div>
                {users ? (
                    <div>
                        <p>Name: {users.name}</p>
                        <p>Donor ID: {users.did}</p>
                        {/* Add other fields you want to display here */}
                    </div>
                ) : (
                    <p>No donor data available</p>
                )}
           </div>
        </div>
    );
}

export default DonarLetter;