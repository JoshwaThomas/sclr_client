
import { useEffect, useState, React } from 'react';
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
// import dayjs from 'dayjs';

function Allreport() {

    const [users, setUsers] = useState([]);
    const [summary, setSummary] = useState([]);
    // const [filterUsers, setFilterUsers] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/api/admin/allreport`)
            .then(response => {
                setUsers(response.data);
                console.log(response.data)
                computeSummary(response.data);
            })
            .catch(err => console.log(err));
    }, [apiUrl]);

    const computeSummary = (data) => {
        const summaryData = {};

        data.forEach((user) => {
            const { specialCategory, scholamt } = user;
            if (!summaryData[specialCategory]) {
                summaryData[specialCategory] = {
                    noOfStudents: 0,
                    totalAmount: 0,
                };
            }
            summaryData[specialCategory].noOfStudents += 1;
            summaryData[specialCategory].totalAmount += scholamt;
        });

        const formattedSummary = Object.entries(summaryData).map(([category, details]) => ({
            specialCategory: category,
            noOfStudents: details.noOfStudents,
            totalAmount: details.totalAmount,
        }));

        setSummary(formattedSummary);
    };

    const handleDownload = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'All_Report';

        // Define headers for Excel
        const headers = [
            'ACADEMIC YEAR',
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
            'PAN',
            'DONOR ID',
            'SCHOLARSHIP TYPE',
            'SCHOLAR DONOR NAME',
            'SCHOLAR DONOR MOBILE'

        ];

        // Add headers to the beginning of the data array
        const dataWithHeaders = [headers, ...users.map(user => [
            user.acyear,
            new Date(user.amtdate).toLocaleDateString(),
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
            user.did,
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
    // const formatDate = (dateString) => {
    //     return dayjs(dateString).format('DD-MM-YYYY');
    // };



    return (
        <div>
            <h1 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white" >All Report</h1>
            <div>
                <button
                    type="button"
                    className="bg-green-500 text-white py-6 font-bold px-6 mt-10 hover:bg-black rounded-lg "
                    onClick={handleDownload}
                >
                    Download Excel
                </button>
                <div className="text-right font-bold text-xl ml-28 ">No of Students:  {users.length}</div>
                <div className='mt-6 grid grid-cols-3 w-auto text-white bg-emerald-500 sticky top-0'>
                    <div className="font-bold border border-black text-center py-3">Special Category</div>
                    <div className="font-bold border border-black text-center py-3">Students</div>
                    <div className="font-bold border border-black text-center py-3">Total Amount</div>
                    {/* <div className="font-bold border border-black text-center py-3">Donor ID</div>
                    <div className='font-bold border border-black text-center py-3'>AMOUNT</div>
                    <div className='font-bold border border-black text-center py-3'>APPLICATION TYPE</div> */}
                </div>
                <div className="overflow-y-auto max-h-[500px] scrollbar-hide">
                {summary.map((user, index) => (
                        <div key={index} className={`grid grid-cols-3 ${index % 2 === 0 ? "bg-emerald-200" : "bg-emerald-200"}`}>
                            {/* <div className="font-bold border border-black text-center uppercase py-3">{new Date(user.amtdate).toLocaleDateString()}</div> */}
                            <div className="font-bold border border-black text-center uppercase py-3">{user.specialCategory}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.noOfStudents}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.totalAmount}</div>
                            {/* <div className="font-bold border border-black text-center uppercase py-3">{user.scholamt}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.fresherOrRenewal}</div> */}
                        </div>
                    ))}
                </div>

                <div className='mt-6 grid grid-cols-6 w-auto text-white bg-emerald-500 sticky top-0'>
                    <div className="font-bold border border-black text-center py-3">DATE</div>
                    <div className="font-bold border border-black text-center py-3">Reg. No</div>
                    <div className="font-bold border border-black text-center py-3">Name</div>
                    <div className="font-bold border border-black text-center py-3">Donor ID</div>
                    <div className='font-bold border border-black text-center py-3'>AMOUNT</div>
                    <div className='font-bold border border-black text-center py-3'>APPLICATION TYPE</div>
                </div>
                <div className="overflow-y-auto max-h-[500px] scrollbar-hide">
                    {users.map((user, index) => (
                        <div key={index} className={`grid grid-cols-6 ${index % 2 === 0 ? "bg-emerald-200" : "bg-emerald-200"}`}>
                            <div className="font-bold border border-black text-center uppercase py-3">{new Date(user.amtdate).toLocaleDateString()}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.registerNo}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.name}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.did}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.scholamt}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.fresherOrRenewal}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div >

    )
}

export default Allreport