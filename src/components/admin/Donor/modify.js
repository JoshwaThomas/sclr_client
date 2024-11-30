import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

function Modify() {
    const [donar, setDonar] = useState(null);
    const [name, setName] = useState()
    const [mobileNo, setMobileNo] = useState()
    const [pan, setPan] = useState()
    const [did, setDid] = useState();
    // const [emailId, setEmailId] = useState()
    const [address, setAddress] = useState()
    const [state, setState] = useState()
    const [district, setDistrict] = useState()
    const [pin, setPin] = useState()
    const [scholtype, setScholType] = useState()
    const [scholtypes, setScholTypes] = useState([]);
    const [panList, setPanList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [donordept, setDonordept] = useState()
    const [donorbatch, setDonorbatch] = useState()
    const apiUrl = process.env.REACT_APP_API_URL;

    // useEffect(() => {
    //     const fetchScholTypes = async () => {
    //         try {
    //             const response = await axios.get(`${apiUrl}/api/admin/scholtypes`);
    //             setScholTypes(response.data);
    //         } catch (error) {
    //             console.error('Error fetching scholarship types:', error);
    //         }
    //     };

    //     fetchScholTypes();

    // }, [apiUrl]);

    // useEffect(() => {
    //     fetchPanList();
    // }, []);

    // const fetchPanList = async (e) => {
    //     if (e) {
    //         e.preventDefault();
    //     }

    //     try {
    //         const response = await axios.get(`${apiUrl}/api/admin/panlist`);
    //         console.log('Fetched Donors:', response.data);
    //         setPanList(response.data);
    //     } catch (error) {
    //         console.error('Error fetching donors:', error);
    //         setPanList([]);
    //     }
    // };

    // Define fetchPanList before using it in useEffect
    const fetchPanList = useCallback(async (e) => {
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
    }, [apiUrl]); // Memoize with useCallback to avoid re-creation on every render

    // Fetch scholarship types
    useEffect(() => {
        const fetchScholTypes = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/admin/scholtypes`);
                setScholTypes(response.data);
            } catch (error) {
                console.error('Error fetching scholarship types:', error);
            }
        };

        fetchScholTypes();
    }, [apiUrl]);

    // Fetch pan list
    useEffect(() => {
        fetchPanList();
    }, [fetchPanList]);

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
            const result = await axios.get(`${apiUrl}/api/admin/donarUpdate`, {
                params: { did }
            });
            setDonar(result.data);
            setName(result.data.name);
            setPan(result.data.pan);
            setDid(result.data.did);
            setMobileNo(result.data.mobileNo);
            setAddress(result.data.address);
            setState(result.data.state);
            setDistrict(result.data.district);
            setPin(result.data.pin);
            setScholType(result.data.scholtype);
            setDonordept(result.data.donordept);
            setDonorbatch(result.data.donorbatch);

        } catch (err) {
            setDonar(null);
            alert('Donor Data not found');
        }
    }

    const Submit = (e) => {

        e.preventDefault();
        axios.post(`${apiUrl}/api/admin/donarUpdate`, {
            did, name, mobileNo, address, state, district, pin,
            scholtype, pan, donordept, donorbatch
        })
            .then(result => {
                console.log(result);
                window.alert("Your Modify Updated Successfully");
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                window.alert("Submission failed!");
                window.location.reload();
            });
    }

    return (
        <div>
            <div>
                <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">DONOR DETAILS</h3>
                <form onSubmit={Submit} className='font-bold'>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-black p-10 rounded-xl">
                        <div onChange={(e) => fetchPanList(e)} className=''>
                            {/* <label className="block mb-1">PAN No</label>
                        <select
                            value={pan}
                            onChange={(e) => setPan(e.target.value)}
                            className="w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                            // required
                        >
                            <option value="">Select Donor</option>
                            {Array.isArray(panList) && panList.map((panItem) => (
                                <option key={panItem.pan} value={panItem.pan}>
                                    {panItem.pan}
                                </option>
                            ))}
                        </select> */}
                            {/* <label className="block mb-1">Name</label>
                        <select
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                            required
                        >
                            <option value="">Select Donor</option>
                            {Array.isArray(panList) && panList.map((panItem) => (
                                <option key={panItem.pan} value={panItem.name}>
                                    {panItem.name}
                                </option>
                            ))}
                        </select> */}
                            <div ref={dropdownRef} className="relative grid grid-cols-2  gap-4">
                                <div>
                                    <label className="block mb-1">Name or ID</label>
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
                                {/* DID */}
                                <div className=' '>
                                    {/* <label className="block mb-1 ml-16 ">PAN</label>
                                <div className='flex inline-flex'>
                                <input
                                    type="text"
                                    value={panSearchTerm}
                                    onChange={(e) => {
                                        setPanSearchTerm(e.target.value);
                                        setIsDropdownOpen(true);
                                    }}
                                    onClick={() => setIsDropdownOpen(true)}
                                    className="w-72 p-2 border rounded-md text-slate-950 ml-16 lg:w-20"
                                    placeholder="Search DID"
                                    required
                                />
                                {isDropdownOpen && (
                                    <ul className="absolute z-10 w-72 p-2 border rounded-md bg-white lg:w-20 ml-16 mt-11 max-h-60 overflow-y-auto">
                                        {filteredPanList.length > 0 ? (
                                            filteredPanList.map((panItem) => (
                                                <li
                                                    key={panItem.pan}
                                                    onClick={() => handleSelect(panItem.name, panItem.pan)}
                                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                                >
                                                    {panItem.pan}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="p-2">No results found</li>
                                        )}
                                    </ul>
                                )} */}

                                    {/* </div> */}
                                    <button onClick={handleData} className='bg-blue-500 text-white font-b py-2 px-4 ml-16 hover:bg-black rounded-lg mt-7'>
                                        Get
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {donar && (
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl'>
                            <div>
                                <label className="block mb-1">Scholarship Type</label>
                                <select
                                    name="ScholarshipCategory"
                                    value={scholtype}
                                    onChange={(e) => setScholType(e.target.value)}
                                    className=" w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                                    required
                                >
                                    <option value="">Select</option>
                                    {scholtypes.map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value.toUpperCase())}
                                    className=" w-72 p-2 border rounded-md text-slate-950"

                                />
                            </div>
                            <div>
                                <label className="block mb-1">Donor ID:</label>
                                <input
                                    type="text"
                                    name="did"
                                    value={did}
                                    onChange={(e) => setDid(e.target.value.toUpperCase())}
                                    className=" w-72 p-2 border rounded-md text-slate-950"

                                />
                            </div>

                            <div>
                                <label className="block mb-1">Mobile No.:</label>
                                <input
                                    type="text"
                                    maxlength="10"
                                    name="mobileNo"
                                    value={mobileNo}
                                    onChange={(e) => setMobileNo(e.target.value)}
                                    className="w-72 p-2 border rounded-md text-slate-950 lg:w-48"

                                />
                            </div>
                            <div>
                                <label className="block mb-1">Pan No:</label>
                                <input
                                    type="text"
                                    name="pan"
                                    value={pan}
                                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                                    className=" w-72 p-2 border rounded-md text-slate-950"

                                />
                            </div>
                            <div>
                                <label className="block mb-1">Permanent Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value.toUpperCase())}
                                    className="w-72 p-2 border rounded-md text-slate-950"
                                    placeholder='Door No & Street'

                                />
                            </div>
                            <div>
                                <label className="block mb-1">State:</label>
                                <select
                                    name="state"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="w-72 p-2 border rounded-md text-slate-950"

                                >
                                    <option value="">Select State</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal</option>
                                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                    <option value="Chandigarh">Chandigarh</option>
                                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                    <option value="Ladakh">Ladakh</option>
                                    <option value="Lakshadweep">Lakshadweep</option>
                                    <option value="Puducherry">Puducherry</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1">District:</label>
                                <select
                                    name="district"
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    className="w-72 p-2 border rounded-md text-slate-950"

                                >
                                    <option value="">Select District</option>
                                    <option value="Ariyalur">Ariyalur</option>
                                    <option value="Chengalpattu">Chengalpattu</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Coimbatore">Coimbatore</option>
                                    <option value="Cuddalore">Cuddalore</option>
                                    <option value="Dharmapuri">Dharmapuri</option>
                                    <option value="Dindigul">Dindigul</option>
                                    <option value="Erode">Erode</option>
                                    <option value="Kallakurichi">Kallakurichi</option>
                                    <option value="Kanchipuram">Kanchipuram</option>
                                    <option value="Kanyakumari">Kanyakumari</option>
                                    <option value="Karur">Karur</option>
                                    <option value="Krishnagiri">Krishnagiri</option>
                                    <option value="Madurai">Madurai</option>
                                    <option value="Nagapattinam">Nagapattinam</option>
                                    <option value="Namakkal">Namakkal</option>
                                    <option value="Nilgiris">Nilgiris</option>
                                    <option value="Perambalur">Perambalur</option>
                                    <option value="Pudukkottai">Pudukkottai</option>
                                    <option value="Ramanathapuram">Ramanathapuram</option>
                                    <option value="Ranipet">Ranipet</option>
                                    <option value="Salem">Salem</option>
                                    <option value="Sivaganga">Sivaganga</option>
                                    <option value="Tenkasi">Tenkasi</option>
                                    <option value="Thanjavur">Thanjavur</option>
                                    <option value="Theni">Theni</option>
                                    <option value="Thoothukudi">Thoothukudi</option>
                                    <option value="Tiruchirappalli">Tiruchirappalli</option>
                                    <option value="Tirunelveli">Tirunelveli</option>
                                    <option value="Tirupathur">Tirupathur</option>
                                    <option value="Tiruppur">Tiruppur</option>
                                    <option value="Tiruvallur">Tiruvallur</option>
                                    <option value="Tiruvannamalai">Tiruvannamalai</option>
                                    <option value="Tiruvarur">Tiruvarur</option>
                                    <option value="Vellore">Vellore</option>
                                    <option value="Viluppuram">Viluppuram</option>
                                    <option value="Virudhunagar">Virudhunagar</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1">Pincode:</label>
                                <input
                                    type="text"
                                    maxlength="6"
                                    name="pin"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    className="w-72 p-2 border rounded-md text-slate-950"
                                    placeholder='Pincode'

                                />
                            </div>
                            {scholtype === 'Alumni' && (
                                <div className=' grid grid-cols-3 gap-4'>
                                    <div>
                                        <label className="block mb-1 w-80">
                                            Programme: <span className='text-red-500  text-lg'><sup>*</sup></span>
                                        </label>
                                        <input
                                            type='text'
                                            name='donordept'
                                            value={donordept}
                                            onChange={(e) => setDonordept(e.target.value)}
                                            className="w-72 p-2  border rounded-md text-slate-950 lg:w-48"

                                        />
                                    </div>
                                    <div></div>
                                    <div>
                                        <label className="block mb-1 w-80 ml-24">
                                            Studied Year: <span className='text-red-500 text-lg'><sup>*</sup></span>
                                        </label>
                                        <input
                                            type='text'
                                            name='donorbatch'
                                            value={donorbatch}
                                            onChange={(e) => setDonorbatch(e.target.value)}
                                            className="w-72 ml-24 p-2 border rounded-md text-slate-950 lg:w-48"

                                        />
                                    </div>
                                    <div>
                                    </div>

                                </div>
                            )}
                            <div></div>
                            <div></div>
                            <div className='text-right'>
                                <button type='submit' className=' p-2 border mt-7 w-24 text-center text-white font-bold rounded-md  hover:bg-black bg-orange-500'>Submit</button>
                            </div>
                        </div>

                    )}

                </form>
            </div>
            {/* <div className='mt-10'>
                <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">SCHOLARSHIP TYPE DETAIL ADD</h3>
                <form onSubmit={AddSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl">
                        <div>
                            <label className="block mb-1">ScholarshipType</label>
                            <input
                                type='text'
                                name="ScholarshipType"
                                value={scholtype}
                                onChange={(e) => setScholType(e.target.value)}
                                className=" w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                                required
                            />
                            <button type='submit' className='bg-blue-500 text-white py-2 px-4 ml-3 hover:bg-black rounded-lg mt-1'>
                                ADD
                            </button>
                        </div>
                    </div>
                </form>
            </div> */}
        </div>
    )
}

export default Modify