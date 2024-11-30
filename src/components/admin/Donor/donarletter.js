import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PrintHeader from '../../../assets/printHeader.jpg';

function DonarLetter() {
    const [users, setUsers] = useState(null);
    const [did, setDid] = useState('');
    const [name, setName] = useState('');
    const [panList, setPanList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [printData, setPrintData] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchPanList();
    }, []);

    const fetchPanList = async (e) => {
        if (e) {
            e.preventDefault();
        }

        try {
            const response = await axios.get(`${apiUrl}/api/admin/panlist`);
            console.log('Fetched Donors:', response.data);
            setPanList(response.data);
        } catch (error) {
            console.error('Error fetching donors:', error);
            setPanList([]);
        }
    };

    // const filteredPanList = panList.filter(panItem =>
    //     panItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     panItem.did.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    const filteredPanList = panList.filter(panItem => {
        // Ensure panItem.did is a string before calling toLowerCase
        const didString = String(panItem.did).toLowerCase();
        const nameString = String(panItem.name).toLowerCase();
        const searchTermString = searchTerm.toLowerCase();

        return nameString.includes(searchTermString) || didString.includes(searchTermString);
    });

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
            const result = await axios.get(`${apiUrl}/api/admin/donarletter`, {
                params: { name, did }
            });
            if (result.data) {
                setUsers([result.data]);
                setPrintData([result.data]);
                console.log(result.data);
            } else {
                setUsers([]);
                alert('Donor Data not found');
            }
        } catch (err) {
            console.error('Error fetching donor data:', err);
            setUsers([]);
            alert('Data not found');
        }
    };

    const handlePrint = (e) => {
        e.preventDefault();
        const printContent = document.getElementById('print-section').innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
    };


    return (
        <div>
            <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">Gratitude Letter</h3>
            <div className="grid grid-cols-1 border  border-black p-10 rounded-xl text-lg font-bold md:grid-cols-2 gap-4">
                <div onChange={(e) => fetchPanList(e)} className=''>
                    <div ref={dropdownRef} className="relative grid grid-cols-2  gap-4">
                        <div>
                            <label className="block mb-1">Donor Name or ID</label>
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

                    </div>
                </div>
            </div>
            <div className='mt-5 flex inline-flex '>
                <button onClick={handleData} className='bg-blue-500 text-white px-5 py-1 rounded-md ml-3 justify-end'>
                    Get
                </button>
                <button onClick={handlePrint} className='bg-blue-500 text-white px-5 py-1 rounded-md  ml-3 justify-end ' >Print</button>
            </div> 
            <div className='mt-10'>
    {users && users.length > 0 ? (
        <>
            <div className="grid grid-cols-5 w-auto bg-amber-200">
                <div className="font-bold border border-white text-center py-3">REGISTER No.</div>
                <div className="font-bold border border-white text-center py-3">NAME</div>
                <div className="font-bold border border-white text-center py-3">DEPARTMENT</div>
                <div className="font-bold border border-white text-center py-3">AMOUNT</div>
                <div className="font-bold border border-white text-center py-3">MOBILE No.</div>
            </div>

            {users.map((user, index) => (
                <div key={`${user.studreg}-${index}`} className="grid grid-cols-5 w-auto bg-amber-100">
                    <div className="font-bold border border-white text-center uppercase py-3">{user.studreg}</div>
                    <div className="font-bold border border-white text-center uppercase py-3">{user.studname}</div>
                    <div className="font-bold border border-white text-center uppercase py-3">{user.studdept}</div>
                    <div className="font-bold border border-white text-center uppercase py-3">{user.donoramtscholamt}</div>
                    <div className="font-bold border border-white text-center uppercase py-3">{user.studmobileNo}</div>
                </div>
            ))}
        </>
    ) : (
        <div className='hidden'>No data found</div>
    )}
</div>

            {/* print area */}
            <div id="print-section" hidden>
                <img src={PrintHeader} alt="Header" className="w-full" />
                {/* <h1 className='text-center text-2xl font-bold'></h1> */}
                <div className='border border-black h-[9in]  mx-auto p-6'> 
                    <div className=' mt-20' >
                        {printData.length > 0 && (
                            <div className='text-xl  text-justify'>
                                <p className='ml-10'>With gratitude, we acknowledge the receipt of <b>Rs.{printData[0].donar.amount}</b> from <b>{printData[0].donar.name} </b>
                                   </p>
                                   <p> towards the JMC Scholarship on<b>{printData[0].donar.scholdate}</b> .</p>
                                <p className='mt-4'>

                                    The following students have benefited from your generous donation.
                                </p>
                            </div>
                        )}
                    </div>


                    <div className="grid grid-cols-5 w-auto mt-3  px-3">
                        <div className="font-bold border border-black text-center py-3">REGISTER No.</div>
                        <div className="font-bold border border-black text-center py-3">NAME</div>
                        <div className="font-bold border border-black text-center py-3">DEPARTMENT</div>
                        <div className="font-bold border border-black text-center py-3">AMOUNT</div>
                        <div className="font-bold border border-black text-center py-3">MOBILE No.</div>
                    </div>
                    {printData.length > 0 && printData.map((data, index) => (
                        <div key={index} className='grid grid-cols-5 w-auto px-3 '>
                            <div className="font-bold border border-black text-center py-2">{data.studreg}</div>
                            <div className="font-bold border border-black text-center py-2">{data.studname}</div>
                            <div className="font-bold border border-black text-center py-2">{data.studdept}</div>
                            <div className="font-bold border border-black text-center py-2">{data.donoramtscholamt}</div>
                            <div className="font-bold border border-black text-center py-2">{data.studmobileNo}</div>
                        </div>
                    ))}
                </div>
            </div>

            
        </div>
    );
}

export default DonarLetter;