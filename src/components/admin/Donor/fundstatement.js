import { useEffect, useState, React } from 'react';
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


function Fundstatement() {

    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/admin/donardata')
            .then(response => {
                setUsers(response.data);
                setFilterUsers(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();

        const filteredUsers = users.filter((user) =>
            user.pan.toLowerCase().includes(searchText) ||
            user.name.toLowerCase().includes(searchText) ||
            user.scholdate.toLowerCase().includes(searchText) ||
            // user.fresherOrRenewal.toLowerCase().includes(searchText) ||
            user.amount.toLowerCase().includes(searchText)
        );
        setFilterUsers(filteredUsers);
    };

    const handleDownload = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'Fund_statement';

        // Define headers for Excel
        const headers = [
            'DATE',
            'PAN',
            'NAME',
            'MOBILE',
            'ADDRESS',
            'SCHOLARSHIP TYPE',
            'AMOUNT'
        ];

        // Add headers to the beginning of the data array
        const dataWithHeaders = [headers, ...filterUsers.map(user => [
            user.scholdate,
            user.pan,
            user.name,
            user.mobileNo,
            user.district,
            user.scholtype,
            user.amount
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

    const formatDateString = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
      };
      

    return (
        <div>
            <h1 className='text-white'>FUND Statement</h1>
            <div className='end-px'>
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
                {/* <input
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
         <label htmlFor="renewal" className='form-radio ml-2 text-lg'>Renewal</label> */}
                <button
                    type="button"
                    className="bg-green-500 text-white py-1 px-3 hover:bg-black rounded-lg ml-3 mt-1"
                    onClick={handleDownload} // Call handleDownload on button click
                >
                    Download Excel
                </button>
            </div>
            <div className='mt-6 grid grid-cols-6  w-auto bg-amber-300'>
                {/* <div className=""> */}
                {/* <div className="grid grid-cols-4 w-auto bg-amber-200 p-4  gap-1 text-center"> */}
                {/* <div className="font-bold border border-white text-center">Application</div> */}
                <div className="font-bold border border-white text-center py-3">DATE</div>
                {/* <div className="font-bold border border-white text-center py-3"></div> */}
                <div className="font-bold border border-white text-center py-3">NAME</div>
                <div className="font-bold border border-white text-center py-3">MOBILE</div>
                <div className="font-bold border border-white text-center py-3">SCHOLARSHIP TYPE</div>
                <div className='font-bold border border-white text-center py-3'>PAN</div>
                <div className='font-bold border border-white text-center py-3'>AMOUNT</div>
                {/* <div className='font-bold border border-white text-center'> Balance </div> */}
                {/* <div className="font-bold border border-white text-center">Action</div> */}

            </div>
            {filterUsers.map((user) => (
                <div key={user.pan} className="grid grid-cols-6 bg-amber-200">
                    {/* <div className="font-bold border border-white text-center uppercase">{user.fresherOrRenewal}</div> */}
                    <div className="font-bold border border-white text-center items-center align-middle uppercase py-3"> {formatDateString(user.scholdate)}</div>
                    <div className="font-bold border border-white text-center uppercase py-3">{user.name}</div>
                    <div className="font-bold border border-white text-center uppercase py-3">{user.mobileNo}</div>
                    {/* <div className="font-bold border border-white text-center uppercase py-3">{user.}</div> */}
                    <div className="font-bold border border-white text-center uppercase py-3">{user.scholtype}</div>
                    <div className="font-bold border border-white text-center uppercase py-3">{user.pan}</div>
                    <div className="font-bold border border-white text-center uppercase py-3">{user.amount}</div>
                    {/* <div className="font-bold border border-white text-center uppercase">{user.balance}</div> */}

                </div>
            ))}

        </div>
    )
}

export default Fundstatement