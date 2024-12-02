import { useEffect, useState, React } from 'react';
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function StuReport() {
    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [radioValue, setRadioValue] = useState('All');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [acceptreject, setAcceptreject] = useState('');
    const [specialCategories, setSpecialCategories] = useState({
        muaddin: false,
        hazrath: false,
        fatherMotherSeparated: false,
        fatherExpired: false,
        singleparent: false,
    });
    const apiUrl = process.env.REACT_APP_API_URL;


    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();

        const filteredUsers = users.filter((user) =>
            (user.dept && user.dept.toLowerCase().includes(searchText)) ||
            (user.registerNo && user.registerNo.toLowerCase().includes(searchText)) ||
            (user.name && user.name.toLowerCase().includes(searchText)) ||
            (user.fresherOrRenewal && user.fresherOrRenewal.toLowerCase().includes(searchText))
        );

        setFilterUsers(filteredUsers);
    };

    useEffect(() => {
        if (radioValue === 'All') {
            setFilterUsers(users);
        } else {
            const filteredUsers = users.filter(user =>
                user.fresherOrRenewal && user.fresherOrRenewal.toLowerCase() === radioValue.toLowerCase()
            );
            setFilterUsers(filteredUsers);
        }
    }, [users, radioValue]);

    const handleRadioChange = (e) => {
        setRadioValue(e.target.value);
    };


    const handleSpecialCategoryChange = (e) => {
        const { name, checked } = e.target;
        setSpecialCategories(prevState => ({ ...prevState, [name.toLowerCase()]: checked }));
    };

    useEffect(() => {
        let filteredUsers = users;
        if (Object.values(specialCategories).some(value => value)) {
            filteredUsers = filteredUsers.filter(user => {
                const specialCategory = (user.specialCategory || '').toLowerCase();
                return (
                    (specialCategories.muaddin && specialCategory.includes('muaddin')) ||
                    (specialCategories.hazrath && specialCategory.includes('hazrath')) ||
                    (specialCategories.fathermotherseparated && specialCategory.includes('fathermotherseparated')) ||
                    (specialCategories.fatherexpired && specialCategory.includes('father expired')) ||
                    (specialCategories.singleparent && specialCategory.includes('singleparent'))
                );
            });
        }

        // console.log('Filtered Users:', filteredUsers);
        setFilterUsers(filteredUsers);
    }, [specialCategories, users]);

    const handleAcceptrejectChange = (e) => {
        const value = e.target.value.toLowerCase();
        setAcceptreject(value);
    };

    useEffect(() => {
        let filteredUsers = users;

        if (acceptreject === 'allar') {
            // Filter out users where action is 'pending'
            filteredUsers = users.filter(user => user.action !== 'pending');
        } else {
            // Filter based on the string value of action
            filteredUsers = users.filter(user => user.action === acceptreject);
        }

        setFilterUsers(filteredUsers);
    }, [acceptreject, users]);


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

    //check donardetails

    useEffect(() => {
        axios.get(`${apiUrl}/api/admin/studreport`)
            .then(response => {
                setUsers(response.data);

                const uniqueDepartments = Array.from(new Set(response.data.map(user => user.dept)));
                setDepartments(['All', ...uniqueDepartments]);

                setFilterUsers(response.data);
            })
            .catch(err => console.log(err));
    }, [apiUrl]);

    useEffect(() => {
        setFilterUsers(users);
    }, [users]);

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
            <h1 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white" >STUDENTS APPLICATION REPORTS</h1>
            <div>
                <div className='end-px '>
                    <input
                        type='text'
                        placeholder='Search text here'
                        className='uppercase py-1 border border-black rounded-md mr-2'
                        onChange={handleSearch}
                    />
                    <button
                        type="button"
                        className="bg-blue-500 border border-black  text-white py-1 px-3 hover:bg-black rounded-lg mt-1"
                    >
                        Search
                    </button>
                    <select
                        className='uppercase py-1 border border-black rounded-md ml-4 w-20'
                        onChange={handleDepartmentChange}
                        value={selectedDepartment}
                    >
                        {departments.map((dept, index) => (
                            <option key={index} value={dept}>{dept}</option>
                        ))}
                    </select>
                    <div className='grid grid-cols-3'>
                        <div className='end-px  border border-black w-72 mt-4 py-2 border-4'>
                            <input
                                type="radio"
                                id="all"
                                name="search"
                                value="All"
                                className='scale-200 ml-8'
                                onChange={handleRadioChange}
                                // checked={radioValue === 'All'}
                                defaultChecked
                            />
                            <label htmlFor="all" className='form-radio ml-2 text-lg'>All</label>

                            <input
                                type="radio"
                                id="fresher"
                                name="search"
                                value="Fresher"
                                className='scale-200 ml-4'
                                onChange={handleRadioChange}
                                checked={radioValue === 'Fresher'}
                            />
                            <label htmlFor="fresher" className='form-radio ml-2 text-lg'>Fresher</label>

                            <input
                                type="radio"
                                id="renewal"
                                name="search"
                                value="Renewal"
                                className='scale-200 ml-4'
                                onChange={handleRadioChange}
                                checked={radioValue === 'Renewal'}
                            />
                            <label htmlFor="renewal" className='form-radio ml-2 text-lg'>Renewal</label>

                        </div>
                        <div className='border border-black w-72 mt-4 py-2 border-4'>
                            <input
                                type="radio"
                                id="all"
                                name="acceptreject"
                                value="allar"
                                className='scale-200 ml-8'
                                onChange={handleAcceptrejectChange}
                                checked={acceptreject === 'allar'}
                            />
                            <label htmlFor="all" className='form-radio ml-2 text-lg'>All</label>
                            <input
                                type="radio"
                                id="accept"
                                name="acceptreject"
                                value="accepted"
                                className='scale-200 ml-4'
                                onChange={handleAcceptrejectChange}
                                checked={acceptreject === 'accepted'}
                            />
                            <label htmlFor="accept" className='form-radio ml-2 text-lg'>Accept</label>
                            <input
                                type="radio"
                                id="reject"
                                name="acceptreject"
                                value="rejected"
                                className='scale-200 ml-4'
                                onChange={handleAcceptrejectChange}
                                checked={acceptreject === 'rejected'}
                            />
                            <label htmlFor="reject" className='form-radio ml-2 text-lg'>Reject</label>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="bg-green-500 text-white mt-4 py-3 px-3 hover:bg-black rounded-lg "
                                onClick={handleDownload}
                            >
                                Download Excel
                            </button>
                        </div>
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
                    </div>  
                     radio button filter splcat
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

                </div>*/}

                <div className='end-px border border-black w-auto mt-4 py-2 px-2 border-4 flex inline-flex'>
                    <input
                        type="checkbox"
                        id="muaddin"
                        name="muaddin"
                        className='scale-200 ml-2'
                        onChange={handleSpecialCategoryChange}
                    />
                    <label htmlFor="muAddin" className='form-checkbox ml-2 text-lg'>Mu-addin</label>

                    <input
                        type="checkbox"
                        id="hazrath"
                        name="hazrath"
                        className='scale-200 ml-4'
                        onChange={handleSpecialCategoryChange}
                    />
                    <label htmlFor="hazrath" className='form-checkbox ml-2 text-lg'>Hazrath</label>

                    <input
                        type="checkbox"
                        id="fathermotherseparated"
                        name="fathermotherseparated"
                        className='scale-200 ml-4'
                        onChange={handleSpecialCategoryChange}
                    />
                    <label htmlFor="FatherMotherSeparated" className='form-checkbox ml-2 text-lg'>Parent Separated</label>

                    <input
                        type="checkbox"
                        id="fatherExpired"
                        name="fatherExpired"
                        className='scale-200 ml-4'
                        onChange={handleSpecialCategoryChange}
                    />
                    <label htmlFor="fatherExpired" className='form-checkbox ml-2 text-lg'>Father Expired</label>
                    <input
                        type="checkbox"
                        id="singleparent"
                        name="singleparent"
                        className='scale-200 ml-4'
                        onChange={handleSpecialCategoryChange}
                    />
                    <label htmlFor="singleparent" className='form-checkbox ml-2 text-lg'>Single Parent</label>
                </div>



                <div className="text-right font-bold text-xl ml-28 ">No of Students:  {filterUsers.length}</div>
                <div className='mt-6 grid grid-cols-5  w-auto bg-emerald-500 sticky top-0'>
                    <div className="font-bold border border-black text-center py-3">Reg. No</div>
                    <div className="font-bold border border-black text-center py-3">Dept</div>
                    <div className="font-bold border border-black text-center py-3">NAME</div>
                    <div className="font-bold border border-black text-center py-3">MOBILE</div>
                    <div className="font-bold border border-black text-center py-3">ACTION</div>
                </div>
                <div className="overflow-y-auto max-h-[500px] scrollbar-hide">
                    {filterUsers.map((user, index) => (
                        <div key={index} className={`grid grid-cols-5 ${index % 2 === 0 ? "bg-emerald-200" : "bg-emerald-200"}`}>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.registerNo}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.dept}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.name}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.mobileNo}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.action}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default StuReport;
