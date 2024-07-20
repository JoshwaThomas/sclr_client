import { useEffect, useState, React } from 'react';
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function StuReport() {
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
            user.dept.toLowerCase().includes(searchText) ||
            user.registerNo.toLowerCase().includes(searchText) ||
            user.name.toLowerCase().includes(searchText) ||
            user.fresherOrRenewal.toLowerCase().includes(searchText)
        );
        setFilterUsers(filteredUsers);
    };

    const handleRadioChange = (e) => {
        const radioValue = e.target.value.toLowerCase();
        const allUsers = [...users];

        if (radioValue === 'all') {
            setFilterUsers(allUsers);
        } else {
            const filteredUsers = allUsers.filter(user =>
                user.fresherOrRenewal.toLowerCase() === radioValue
            );
            setFilterUsers(filteredUsers);
        }
    };
    const handleRadioChangeSPL = (e) => {
        const radioValue = e.target.value.toLowerCase();
        const allUsers = [...users];

        if (radioValue === 'all') {
            setFilterUsers(allUsers);
        } else {
            const filteredUsers = allUsers.filter(user =>
                user.specialCategory && user.specialCategory.toLowerCase() === radioValue
            );
            setFilterUsers(filteredUsers);
        }
    };
    const handleDepartmentChange = (e) => {
        const department = e.target.value;
        setSelectedDepartment(department);
        filterAndSetUsers(department);
    };

    const filterAndSetUsers = (department) => {
        let filteredUsers = users;

        if (department !== 'All') {
            filteredUsers = filteredUsers.filter(user => user.dept === department);
        }

        setFilterUsers(filteredUsers);
    };
    // useEffect(() => {
    //     let filteredUsers = users;

    //     // Filter based on selected checkboxes
    //     if (specialCategories.fatherExpired) {
    //         filteredUsers = filteredUsers.filter(user =>
    //             user.specialCategory && user.specialCategory.toLowerCase() === 'father expired'
    //         );
    //     }
    //     if (specialCategories.separated) {
    //         filteredUsers = filteredUsers.filter(user =>
    //             user.specialCategory && user.specialCategory.toLowerCase() === 'father & mother separated'
    //         );
    //     }
    //     if (specialCategories.hazrath) {
    //         filteredUsers = filteredUsers.filter(user =>
    //             user.specialCategory && user.specialCategory.toLowerCase() === 'hazrath'
    //         );
    //     }

    //     setFilterUsers(filteredUsers);
    // }, [specialCategories, users]);

    // const handleCheckboxChange = (e) => {
    //     const { name, checked } = e.target;
    //     setSpecialCategories(prevState => ({
    //         ...prevState,
    //         [name]: checked,
    //     }));
    // };


    useEffect(() => {
        axios.get('http://localhost:3001/api/admin/studreport')
            .then(response => {
                setUsers(response.data);
                setFilterUsers(response.data);

                const uniqueDepartments = Array.from(new Set(response.data.map(user => user.dept)));
                setDepartments(['All', ...uniqueDepartments]);
            })
            .catch(err => console.log(err));
    }, []);

    const handleDownload = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'Student_Report';

        // Define headers for Excel
        const headers = [

            'FRESHER/RENEWAL',
            'REGISTER NO',
            'NAME',
            'DEPARTMENT',
            'SECTION',
            'UG/PG',
            'SEMESTER',
            'PROCATEGORY',
            'SPECIAL_CATEGORY',
            'STUDENT_MOBILE',
            'FATHER_NAME',
            'FATHER_MOBILE',
            'FATHER_OCCUPATION',
            'ANNUAL_INCOME',
            'SIBLINGS',
            'ADDRESS',
            'SCHOOL NAME',
            'YEAR OF PASSING',
            'PERCENTAGE OF MARK SCHOOL',
            'SEMESTER PERCENTAGE',
            'CLASS ATTENDANCE PERCENTAGE',
            'DEENIYATH PERCENTAGE',
            'NO OF ARREARS',
            'ACTION'

        ];

        // Add headers to the beginning of the data array
        const dataWithHeaders = [headers, ...users.map(user => [

            user.fresherOrRenewal,
            user.registerNo,
            user.name,
            user.dept,
            user.section,
            user.ugOrPg,
            user.semester,
            user.procategory,
            user.specialCategory,
            user.mobileNo,
            user.fatherName,
            user.fatherNo,
            user.fatherOccupation,
            user.annualIncome,
            user.siblings,
            `${user.address}, ${user.district}, ${user.state} - ${user.pin}`,
            user.schoolName,
            user.yearOfPassing,
            user.percentageOfMarkSchool,
            user.semPercentage,
            user.classAttendancePer,
            user.deeniyathPer,
            user.arrear,
            user.action
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



    return (
        <div>
            <h1 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white" >STUDENT REPORTS</h1>
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
                        {departments.map((dept, index) => (
                            <option key={index} value={dept}>{dept}</option>
                        ))}
                    </select>
                    <div className='end-px text-white border border-white w-72 mt-4'>
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
                    </div>
                </div>

                {/* <div>
                <label className='mr-4'>Special Category:</label>
                <input
                    type="checkbox"
                    id="fatherExpired"
                    name="fatherExpired"
                    className='mr-2'
                    onChange={handleCheckboxChange}
                    checked={specialCategories.fatherExpired}
                />
                <label htmlFor="fatherExpired" className='mr-4'>Father Expired</label>

                <input
                    type="checkbox"
                    id="separated"
                    name="separated"
                    className='mr-2'
                    onChange={handleCheckboxChange}
                    checked={specialCategories.separated}
                />
                <label htmlFor="separated" className='mr-4'>Father & Mother Separated</label>

                <input
                    type="checkbox"
                    id="hazrath"
                    name="hazrath"
                    className='mr-2'
                    onChange={handleCheckboxChange}
                    checked={specialCategories.hazrath}
                />
                <label htmlFor="hazrath" className='mr-4'>Hazrath</label>
            </div> */}
                <div className='end-px text-white border border-white mt-4' >
                    <input
                        type="radio"
                        id="all"
                        name="searchspl"
                        value="All"
                        className='scale-200 ml-8'
                        onChange={handleRadioChange}
                    />
                    <label htmlFor="all" className='form-radio ml-2 text-lg'>All</label>
                    <input
                        type="radio"
                        id="renewal"
                        name="searchspl"
                        value="Muaddin"
                        className='scale-200 ml-4'
                        onChange={handleRadioChangeSPL}
                    />
                    <label htmlFor="renewal" className='form-radio ml-2 text-lg'>Mu-Addin</label>
                    <input
                        type="radio"
                        id="renewal"
                        name="searchspl"
                        value="Hazrath"
                        className='scale-200 ml-4'
                        onChange={handleRadioChangeSPL}
                    />
                    <label htmlFor="renewal" className='form-radio ml-2 text-lg'>Hazrath</label>
                    <input
                        type="radio"
                        id="renewal"
                        name="searchspl"
                        value="FatherMotherSeparated"
                        className='scale-200 ml-4'
                        onChange={handleRadioChangeSPL}
                    />
                    <label htmlFor="renewal" className='form-radio ml-2 text-lg'>FatherMotherSeparated</label>
                    <input
                        type="radio"
                        id="renewal"
                        name="searchspl"
                        value="FatherExpired"
                        className='scale-200 ml-4'
                        onChange={handleRadioChangeSPL}
                    />
                    <label htmlFor="renewal" className='form-radio ml-2 text-lg'>FatherExpired</label>
                    <input
                        type="radio"
                        id="renewal"
                        name="searchspl"
                        value="Singleparent"
                        className='scale-200 ml-4'
                        onChange={handleRadioChangeSPL}
                    />
                    <label htmlFor="renewal" className='form-radio ml-2 text-lg'>Singleparent</label>
                    <input
                        type="radio"
                        id="renewal"
                        name="searchspl"
                        value="Orphan"
                        className='scale-200 ml-4'
                        onChange={handleRadioChangeSPL}
                    />
                    <label htmlFor="renewal" className='form-radio ml-2 text-lg'>Orphan</label>

                </div>

                <button
                    type="button"
                    className="bg-green-500 text-white py-3 px-3 mt-5 hover:bg-black rounded-lg "
                    onClick={handleDownload}
                >
                    Download Excel
                </button>
                <div className='mt-6 grid grid-cols-5 w-auto bg-amber-300'>

                    <div className="font-bold border border-white text-center">Reg. No</div>
                    <div className="font-bold border border-white text-center">Dept</div>
                    <div className="font-bold border border-white text-center">NAME</div>
                    <div className="font-bold border border-white text-center">MOBILE</div>
                    <div className="font-bold border border-white text-center">ACTION</div>
                </div>
                {filterUsers.map((user, index) => (
                    <div key={index} className="grid grid-cols-5 w-auto bg-amber-200">

                        <div className="font-bold border border-white text-center uppercase py-3">{user.registerNo}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.dept}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.name}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.mobileNo}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.action}</div>
                    </div>
                ))}

            </div>
        </div>
    );
}


export default StuReport;
