import { useEffect, useState, React } from 'react';
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function FundReport(){

    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    // const [specialCategories, setSpecialCategories] = useState({
    //     fatherExpired: false,
    //     fatherSeparated: false,
    //     hazrath: false
    // });


    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
    
        const filteredUsers = users.filter((user) =>
            (user.did?.toLowerCase() || '').includes(searchText) ||
            (user.name?.toLowerCase() || '').includes(searchText) ||
            (user.pan?.toLowerCase() || '').includes(searchText)
        );
    
        setFilterUsers(filteredUsers);
    };

    // const handleRadioChange = (e) => {
    //     const radioValue = e.target.value.toLowerCase();
    //     const allUsers = [...users];

    //     if (radioValue === 'all') {
    //         setFilterUsers(allUsers);
    //     } else {
    //         const filteredUsers = allUsers.filter(user =>
    //             user.fresherOrRenewal.toLowerCase() === radioValue
    //         );
    //         setFilterUsers(filteredUsers);
    //     }
    // };
    // const handleRadioChangeSPL = (e) => {
    //     const radioValue = e.target.value.toLowerCase();
    //     const allUsers = [...users];

    //     if (radioValue === 'all') {
    //         setFilterUsers(allUsers);
    //     } else {
    //         const filteredUsers = allUsers.filter(user =>
    //             user.specialCategory && user.specialCategory.toLowerCase() === radioValue
    //         );
    //         setFilterUsers(filteredUsers);
    //     }
    // };
    const handleDepartmentChange = (e) => {
        const department = e.target.value;
        setSelectedDepartment(department);
        filterAndSetUsers(department);
    };

    const filterAndSetUsers = (department) => {
        let filteredUsers = users;

        if (department !== 'All') {
            filteredUsers = filteredUsers.filter(user => user.acyear === department);
        }

        setFilterUsers(filteredUsers);
    };
   


    useEffect(() => {
        axios.get('http://localhost:3001/api/admin/donoracyear-report')
            .then(response => {
                setUsers(response.data);
                setFilterUsers(response.data);

                const uniqueDepartments = Array.from(new Set(response.data.map(user => user.acyear)));
                setDepartments(['All', ...uniqueDepartments]);
            })
            .catch(err => console.log(err));
    }, []);



    const handleDownload = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'DonorYearWise_Report';

        // Define headers for Excel
        const headers = [
            'acyear',
            'Donor ID',
            'Scholar Type',
            'NAME',
            'Amount',
            'Pan'
            
           

        ];

        // Add headers to the beginning of the data array
        const dataWithHeaders = [headers, ...users.map(user => [

            user.acyear,
            user.did,
            user.scholtype,
            user.name,
            user.amount,
            user.pan
        
        ])];

        // Convert data to sheet format
        const ws = XLSX.utils.aoa_to_sheet(dataWithHeaders);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

        // Convert workbook to Excel buffer
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        // Create Blob and trigger download
        const data = new Blob([excelBuffer], { type: fileType });
        saveAs(data, fileName + fileExtension);
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    return (
        <div>
            <h1 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white" >Year wise Funds Reports</h1>
            <div>
                <div className='end-px '>
                    <input
                        type='text'
                        placeholder='Search text here'
                        className='uppercase py-1 rounded-md mr-2'
                        onChange={handleSearch}
                    />
                    <button
                        type="button"
                        className="bg-blue-500 text-white py-1 px-3 hover:bg-black rounded-lg mt-1"
                    >
                        Search
                    </button>
                    <select
                        className='uppercase py-1 rounded-md ml-4 w-20'
                        onChange={handleDepartmentChange}
                        value={selectedDepartment}
                    >
                        {departments.map((acyear, index) => (
                            <option key={index} value={acyear}>{acyear}</option>
                        ))}
                    </select>
                    {/* <div className='end-px text-white border border-white w-72 mt-4'>
                        <input
                            type="radio"
                            id="all"
                            name="search"
                            value="All"
                            className='scale-200 ml-8'
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="all" className='form-radio ml-2 text-lg'>All</label>

                        <input
                            type="radio"
                            id="fresher"
                            name="search"
                            value="Fresh"
                            className='scale-200 ml-4'
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="fresher" className='form-radio ml-2 text-lg'>Fresher</label>

                        <input
                            type="radio"
                            id="renewal"
                            name="search"
                            value="Renewal"
                            className='scale-200 ml-4'
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="renewal" className='form-radio ml-2 text-lg'>Renewal</label>
                    </div> */}
                </div>

                <button
                    type="button"
                    className="bg-green-500 text-white py-3 px-3 mt-5 hover:bg-black rounded-lg "
                    onClick={handleDownload}
                >
                    Download Excel
                </button>
                <div className='mt-6 grid grid-cols-7 w-auto bg-amber-200'>
                <div className="font-bold border border-white text-center py-3">Academic Year</div>
                    <div className="font-bold border border-white text-center py-3">Donor ID</div>
                    <div className="font-bold border border-white text-center py-3">Scholar Type</div>
                    <div className="font-bold border border-white text-center py-3">NAME</div>
                    <div className="font-bold border border-white text-center py-3">AMOUNT</div>
                    <div className="font-bold border border-white text-center py-3">ZAKKATH</div>
                    <div className="font-bold border border-white text-center py-3">Pan</div>
                </div>
                {filterUsers.map((user, index) => (
                    <div key={index} className="grid grid-cols-6 w-auto bg-amber-100">
                        <div className="font-bold border border-white text-center uppercase py-3">{user.acyear}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.did}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.scholtype}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.name}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{formatCurrency(user.amount || 0)}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{formatCurrency(user.zakkathamt || 0) }</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.pan}</div>
                    </div>
                
                ))}

            </div>
        </div>
    );
}


export default FundReport;
