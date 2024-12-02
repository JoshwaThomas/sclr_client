import { useEffect, useState, React } from 'react';
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function Donoravl() {

    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    // const [departments, setDepartments] = useState([]);
    // const [selectedDepartment, setSelectedDepartment] = useState('All');
    // const [specialCategories, setSpecialCategories] = useState({
    //     fatherExpired: false,
    //     fatherSeparated: false,
    //     hazrath: false
    // });
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
    // const handleDepartmentChange = (e) => {
    //     const department = e.target.value;
    //     setSelectedDepartment(department);
    //     filterAndSetUsers(department);
    // };

    // const filterAndSetUsers = (department) => {
    //     let filteredUsers = users;

    //     if (department !== 'All') {
    //         filteredUsers = filteredUsers.filter(user => user.dept === department);
    //     }

    //     setFilterUsers(filteredUsers);
    // };



    useEffect(() => {
        axios.get(`${apiUrl}/api/admin/donoravl`)
            .then(response => {
                setUsers(response.data);
                setFilterUsers(response.data);

                // const uniqueDepartments = Array.from(new Set(response.data.map(user => user.dept)));
                // setDepartments(['All', ...uniqueDepartments]);
            })
            .catch(err => console.log(err));
    }, [apiUrl]);

    const handleDownload = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'DonorBalance_Report';

        // Define headers for Excel
        const headers = [

            'Donor ID',
            'Scholar Type',
            'NAME',
            'Balance',
            'Zakkath'



        ];

        // Add headers to the beginning of the data array
        const dataWithHeaders = [headers, ...users.map(user => [

            user.did,
            user.scholtype,
            user.name,
            user.balance,
            user.zakkathbal


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

    const totalGeneral = filterUsers.reduce((sum, user) => sum + (user.balance || 0), 0);
    const totalZakat = filterUsers.reduce((sum, user) => sum + (user.zakkathbal || 0), 0);

    return (
        <div>
            <h1 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white" >Funds Available Reports</h1>
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
                    {/* <select
                        className='uppercase py-1 rounded-md ml-4 w-20'
                        onChange={handleDepartmentChange}
                        value={selectedDepartment}
                    >
                        {departments.map((dept, index) => (
                            <option key={index} value={dept}>{dept}</option>
                        ))}
                    </select> */}
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
                <div className=' justify-end flex flex-col'>
                    <div className="text-lg font-bold mb-4  text-right ">Overall Fund:</div>
                    <div className='text-lg font-bold mb-4  text-right'>General: {formatCurrency(totalGeneral)} | Zakat: {formatCurrency(totalZakat)}</div>
                </div>
                <div className='mt-6 grid grid-cols-5 w-auto bg-emerald-500'>

                    <div className="font-bold border border-white text-center py-3">Donor ID</div>
                    <div className="font-bold border border-white text-center py-3">Scholar Type</div>
                    <div className="font-bold border border-white text-center py-3">NAME</div>
                    <div className="font-bold border border-white text-center py-3">General</div>
                    <div className="font-bold border border-white text-center py-3">Zakat</div>
                    {/* <div className="font-bold border border-white text-center">Pan</div> */}
                </div>
                {filterUsers.map((user, index) => (
                    <div key={index} className={`grid grid-cols-5 ${index%2 === 0 ? "bg-emerald-200" : "bg-emerald-200"}`}>

                        <div className="font-bold border border-white text-center uppercase py-3">{user.did}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.scholtype}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.name}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{formatCurrency(user.balance)}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{formatCurrency(user.zakkathbal || 0)}</div>
                        {/* <div className="font-bold border border-white text-center uppercase py-3">{user.pan}</div> */}
                    </div>
                ))}

            </div>
        </div>
    );
}


export default Donoravl;