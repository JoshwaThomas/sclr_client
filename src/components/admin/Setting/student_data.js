import { useEffect, useState, React } from 'react';
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


function Student_data() {

    const [users, setUsers] = useState([]);
    const [select, setSelect] = useState();
    const [showModal, setShowModal] = useState(false);
    // const [filterUsers, setFilterUsers] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        axios.get(`${apiUrl}/api/admin/allreport`)
            .then(response => {
                setUsers(response.data);
                console.log('response.data', response.data)
            })
            .catch(err => console.log(err));
    }, [apiUrl]);

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();

        const filteredUsers = users.filter((user) =>
            (user.dept && user.dept.toLowerCase().includes(searchText)) ||
            (user.registerNo && user.registerNo.toLowerCase().includes(searchText)) ||
            (user.name && user.name.toLowerCase().includes(searchText)) ||
            (user.fresherOrRenewal && user.fresherOrRenewal.toLowerCase().includes(searchText))
        );

        setUsers(filteredUsers);
    };

    // const handleDownload = () => {
    //     const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    //     const fileExtension = '.xlsx';
    //     const fileName = 'All_Report';

    //     const headers = [
    //         'ACADEMIC YEAR',
    //         'DATE',
    //         'FRESHER/RENEWAL',
    //         'REGISTER NO',
    //         'NAME',
    //         'DEPARTMENT',
    //         'SECTION',
    //         'UG/PG',
    //         'SEMESTER',
    //         'PROCATEGORY',
    //         'SPECIAL_CATEGORY',
    //         'STUDENT_MOBILE',
    //         'FATHER_NAME',
    //         'FATHER_OCCUPATION',
    //         'ANNUAL_INCOME',
    //         'AWARDED AMOUNT',
    //         'PAN',
    //         'DONOR ID',
    //         'SCHOLARSHIP TYPE',
    //         'SCHOLAR DONOR NAME',
    //         'SCHOLAR DONOR MOBILE'

    //     ];

    //     const dataWithHeaders = [headers, ...users.map(user => [
    //         user.acyear,
    //         new Date(user.amtdate).toLocaleDateString(),
    //         user.fresherOrRenewal,
    //         user.registerNo,
    //         user.name,
    //         user.dept,
    //         user.section,
    //         user.ugOrPg,
    //         user.semester,
    //         user.procategory,
    //         user.specialCategory,
    //         user.smobileNo,
    //         user.fatherName,
    //         user.fatherOccupation,
    //         user.annualIncome,
    //         user.scholamt,
    //         user.pan,
    //         user.did,
    //         user.scholtype,
    //         user.donarName,
    //         user.mobileNo
    //     ])];

    //     const ws = XLSX.utils.aoa_to_sheet(dataWithHeaders);
    //     const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

    //     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    //     const data = new Blob([excelBuffer], { type: fileType });
    //     saveAs(data, fileName + fileExtension);
    // };
    // const formatDate = (dateString) => {
    //     return dayjs(dateString).format('DD-MM-YYYY');
    // };



    return (
        <div>
            <h1 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white" >Student Data</h1>
            <div>
                {/* <button
                    type="button"
                    className="bg-green-500 text-white py-6 font-bold px-6 mt-10 hover:bg-black rounded-lg "
                    onClick={handleDownload}
                >
                    Download Excel
                </button> */}
                 <input
                        type='text'
                        placeholder='Search Name here'
                        className='uppercase py-1 border border-black rounded-md mr-2'
                        onChange={handleSearch}
                    />
                    <button
                        type="button"
                        className="bg-blue-500 border border-black  text-white py-1 px-3 hover:bg-black rounded-lg mt-1"
                    >
                        Search
                    </button>
                <div className="text-right font-bold text-xl ml-28 ">No of Students:  {users.length}</div>
                {/* <div className='mt-6 grid grid-cols-3 w-auto text-white bg-emerald-500 sticky top-0'>
                    <div className="font-bold border border-black text-center py-3">Special Category</div>
                    <div className="font-bold border border-black text-center py-3">Students</div>
                    <div className="font-bold border border-black text-center py-3">Total Amount</div>
                     </div>
                <div className="overflow-y-auto max-h-[500px] scrollbar-hide">
                {summary.map((user, index) => (
                        <div key={index} className={`grid grid-cols-3 ${index % 2 === 0 ? "bg-emerald-200" : "bg-emerald-200"}`}>
                         <div className="font-bold border border-black text-center uppercase py-3">{user.specialCategory}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.noOfStudents}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.totalAmount}</div>
                           </div>
                    ))}
                </div> */}

                <div className='mt-6 grid grid-cols-7 w-auto text-white bg-emerald-500 sticky top-0'>
                    <div className="font-bold border border-black text-center py-3">S. No</div>
                    <div className="font-bold border border-black text-center py-3">Reg. No</div>
                    <div className="font-bold border border-black text-center py-3">Name</div>
                    <div className="font-bold border border-black text-center py-3">Dept</div>
                    <div className="font-bold border border-black text-center py-3">Mobile</div>
                    <div className='font-bold border border-black text-center py-3'>Aadhar</div>
                    <div className='font-bold border border-black text-center py-3'>Password</div>
                </div>
                <div className="overflow-y-auto max-h-[500px] scrollbar-hide">
                    {users.sort((a,b) => a.registerNo - b.registerNo).map((user, index) => (
                        <div key={index} className={`grid grid-cols-7 ${index % 2 === 0 ? "bg-emerald-200" : "bg-emerald-200"}`}>
                            <div className="font-bold border border-black text-center uppercase py-3">{index+1}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.registerNo}</div>
                            <div className="font-bold border border-black text-center uppercase py-3" onClick={()=>{setShowModal(true); setSelect(user)}}>{user.name}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.dept}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.mobileNo}</div> 
                            <div className="font-bold border border-black text-center uppercase py-3">{user.aadhar}</div>
                            <div className="font-bold border border-black text-center uppercase py-3">{user.password}</div>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && select && (
 <div className="fixed inset-0 flex items-center justify-center">
    <div className="bg-white ml-64 w-5/6 h-full overflow-auto p-6">
      <h2 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Student Details</h2>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      
        {/* <div><span className="text-gray-700">Jamath:</span> <span className="font-semibold">{select.jamath}</span></div> */}
        <div><span className="text-gray-700">Register No:</span> <span className="font-semibold">{select.registerNo}</span></div>
        <div><span className="text-gray-700">Name:</span> <span className="font-semibold">{select.name?select.name:'-'}</span></div>
        <div><span className="text-gray-700">Department:</span> <span className="font-semibold">{select.dept?select.dept:'-'}</span></div>
        <div><span className="text-gray-700">Mobile:</span> <span className="font-semibold">{select.mobileNo?select.mobileNo:'-'}</span></div>
        <div><span className="text-gray-700">Aadhar:</span> <span className="font-semibold">{select.aadhar?select.aadhar:'-'}</span></div>
        {/* <div><span className="text-gray-700">Hostel:</span> <span className="font-semibold">{select["hostel "]}</span></div> */}
        <div><span className="text-gray-700">Address:</span> <span className="font-semibold">{select.address?select.address:'-'}</span></div>
        <div><span className="text-gray-700">District:</span> <span className="font-semibold">{select.district?select.district:'-'}</span></div>
        <div><span className="text-gray-700">Father Name:</span> <span className="font-semibold">{select.fatherName?select.fatherName:'-'}</span></div>
        <div><span className="text-gray-700">Father Mobile:</span> <span className="font-semibold">{select.fatherNo?select.fatherNo:''}</span></div>
        <div><span className="text-gray-700">Father Occupation:</span> <span className="font-semibold">{select.fatherOccupation?select.fatherOccupation:'-'}</span></div>
        <div><span className="text-gray-700">Annual Income:</span> <span className="font-semibold">{select.annualIncome?select.annualIncome:'-'}</span></div>
        <div><span className="text-gray-700">Siblings:</span> <span className="font-semibold">{select.siblings?select.siblings:'-'}</span></div>
        <div><span className="text-gray-700">Siblings' Income:</span> <span className="font-semibold">{select.siblingsIncome?select.siblingsIncome:'-'}</span></div>
        <div><span className="text-gray-700">Siblings Count:</span> <span className="font-semibold">{select.siblingsNo?select.siblingsNo:'-'}</span></div>
        <div><span className="text-gray-700">Siblings Occupation:</span> <span className="font-semibold">{select.siblingsOccupation?select.siblingsOccupation:'-'}</span></div>
        <div><span className="text-gray-700">Sibling Mobile:</span> <span className="font-semibold">{select.smobileNo?select.smobileNo:'-'}</span></div>
        {/* <div><span className="text-gray-700">Percentage of School Marks:</span> <span className="font-semibold">{select.percentageOfMarkSchool}</span></div>        <div><span className="text-gray-700">Pre Semester:</span> <span className="font-semibold">{select.preSemester}</span></div> */}
        
        
        {/* <div><span className="text-gray-700">Religion:</span> <span className="font-semibold">{select.religion}</span></div>
        <div><span className="text-gray-700">Scholar Amount:</span> <span className="font-semibold">{select.scholamt}</span></div>
        <div><span className="text-gray-700">Scholarship:</span> <span className="font-semibold">{select.scholarship}</span></div>
        <div><span className="text-gray-700">Scholar Date:</span> <span className="font-semibold">{select.scholdate}</span></div>
        <div><span className="text-gray-700">Scholar Donor ID:</span> <span className="font-semibold">{select.scholdonar}</span></div>
        <div><span className="text-gray-700">Scholar Type:</span> <span className="font-semibold">{select.scholtype}</span></div>
        <div><span className="text-gray-700">School Name:</span> <span className="font-semibold">{select.schoolName}</span></div>
        <div><span className="text-gray-700">Section:</span> <span className="font-semibold">{select.section}</span></div>
        <div><span className="text-gray-700">Semester:</span> <span className="font-semibold">{select.semester}</span></div>
        <div><span className="text-gray-700">Semester %:</span> <span className="font-semibold">{select.semPercentage}</span></div>
        <div><span className="text-gray-700">Semester Remaining:</span> <span className="font-semibold">{select.semRem}</span></div>
        
        <div><span className="text-gray-700">Special Category:</span> <span className="font-semibold">{select.specialCategory}</span></div>
        <div><span className="text-gray-700">State:</span> <span className="font-semibold">{select.state}</span></div>
        <div><span className="text-gray-700">UG or PG:</span> <span className="font-semibold">{select.ugOrPg}</span></div>
        <div><span className="text-gray-700">Zakkath Amount:</span> <span className="font-semibold">{select.zakkathamt}</span></div>
        <div><span className="text-gray-700">Zakkath Balance:</span> <span className="font-semibold">{select.zakkathbal}</span></div> */}
      </div>
      <div>
        <button
         className='rounded-md px-4 py-2 font-semibold mt-10 bg-gray-100 hover:bg-black hover:text-white'
         onClick={() => setShowModal(false)}
         >
            Back
            </button>
      </div>
       {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {Object.entries(select).map(([key, value]) => {
          // Format key: remove quotes, replace underscores or hyphens with space, capitalize
          const label = key.replace(/["_]/g, '').replace(/\s+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();

          // Format date values if ISO
          let displayValue = '-';
          if (value || value === 0) {
            if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
              displayValue = new Date(value).toLocaleDateString();
            } else {
              displayValue = value.toString().trim() || '-';
            }
          }

          return (
            <div key={key}>
              <span className="text-gray-700">{label}:</span>{' '}
              <span className="font-semibold">{displayValue}</span>
            </div>
          );
        })}
      </div> */}
    </div>
  </div>
)}

        </div>

    )
}

export default Student_data