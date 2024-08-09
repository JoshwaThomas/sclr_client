import { useEffect, useState, React } from 'react';
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';

function Allreport() {

    const [users, setUsers] = useState([]);
    // const [filterUsers, setFilterUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/admin/allreport')
            .then(response => {
                setUsers(response.data);

            })
            .catch(err => console.log(err));
    }, []);

    const handleDownload = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'All_Report';

        // Define headers for Excel
        const headers = [
            'DATE',
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
            'FATHER_OCCUPATION',
            'ANNUAL_INCOME',
            'AWARDED AMOUNT',
            'PAN OR DONOR ID',
            'SCHOLARSHIP TYPE',
            'SCHOLAR DONOR NAME',
            'SCHOLAR DONOR MOBILE'

        ];

        // Add headers to the beginning of the data array
        const dataWithHeaders = [headers, ...users.map(user => [
            formatDate(user.amtdate),
            user.fresherOrRenewal,
            user.registerNo,
            user.name,
            user.dept,
            user.section,
            user.ugOrPg,
            user.semester,
            user.procategory,
            user.specialCategory,
            user.smobileNo,
            user.fatherName,
            user.fatherOccupation,
            user.annualIncome,
            user.scholamt,
            user.pan,
            user.scholtype,
            user.donarName,
            user.mobileNo
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
    const formatDate = (dateString) => {
        return dayjs(dateString).format('DD-MM-YYYY');
    };



    return (
        <div>
            <h1 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white" >All Report</h1>
            <div>
                <button
                    type="button"
                    className="bg-green-500 text-white py-6 px-6 mt-10 hover:bg-black rounded-lg "
                    onClick={handleDownload} 
                >
                    Download Excel
                </button>
                {/* <div className='mt-6 grid grid-cols-12 w-auto bg-amber-300'>
                    <div className="font-bold border border-white text-center">DATE</div>
                    <div className="font-bold border border-white text-center">Reg. No</div>
                    <div className="font-bold border border-white text-center">Dept</div>
                    <div className="font-bold border border-white text-center">NAME</div>
                    <div className="font-bold border border-white text-center">MOBILE</div>
                    <div className="font-bold border border-white text-center">PAN</div>
                    <div className="font-bold border border-white text-center">ADDRESS</div>
                    <div className='font-bold border border-white text-center'>SCHOLARSHIP TYPE</div>
                    <div className='font-bold border border-white text-center'>AMOUNT</div>
                    <div className='font-bold border border-white text-center'>SCHOLAR DONAR</div>
                    <div className="font-bold border border-white text-center">MOBILE</div>
                    <div className="font-bold border border-white text-center">MOBILE</div>
                </div>
                {users.map((user, index) => (
                    <div key={index} className="grid grid-cols-12 bg-amber-200">
                        <div className="font-bold border border-white text-center uppercase py-3">{user.scholdate}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.registerNo}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.dept}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.name}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.smobileNo}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.pan}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.address}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.scholtype}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.scholamt}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.donarName}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.mobileNo}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.specialCategory}</div>
                    </div>
                ))} */}

            </div>
        </div>

    )
}

export default Allreport