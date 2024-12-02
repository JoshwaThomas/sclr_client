import { useEffect, useState, React } from 'react';
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';


function Fundstatement() {

    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/api/admin/donardata`)
            .then(response => {
                setUsers(response.data);
                setFilterUsers(response.data);
            })
            .catch(err => console.log(err));
    }, [apiUrl]);

    // const handleSearch = (e) => {
    //     const searchText = e.target.value.toLowerCase();

    //     const filteredUsers = users.filter((user) => {
    //         return (
    //             (user.pan && user.pan.toLowerCase().includes(searchText)) ||
    //             (user.name && user.name.toLowerCase().includes(searchText)) ||
    //             (user.scholdate && user.scholdate.toLowerCase().includes(searchText)) || 
    //             (user.mobileNo && user.mobileNo.toString().toLowerCase().includes(searchText)) 
    //         );
    //     });
    //     setFilterUsers(filteredUsers);
    // };


    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();

        const filteredUsers = users.filter((user) =>
            (user.name && user.name.toLowerCase().includes(searchText)) ||
            (user.pan && user.pan.toLowerCase().includes(searchText))
            // (user.name && user.name.toLowerCase().includes(searchText)) ||
            // (user.fresherOrRenewal && user.fresherOrRenewal.toLowerCase().includes(searchText))
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

    const formatDate = (dateString) => {
        return dayjs(dateString).format('DD-MM-YYYY');
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
            <h1 className='text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white'>FUND Statement</h1>
            <div className='end-px'>
                <input
                    type='text'
                    placeholder='Search text here'
                    className='uppercase py-1 border border-black rounded-md mr-2'
                    onChange={handleSearch}
                />
                <button
                    type="button"
                    className="bg-blue-500 text-white py-1 px-3 font-bold hover:bg-black rounded-lg mt-1"
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
                    className="bg-green-500 text-white py-3 px-3 font-bold hover:bg-black rounded-lg ml-3 mt-1"
                    onClick={handleDownload} // Call handleDownload on button click
                >
                    Download Excel
                </button>
            </div>
            <div className='grid grid-cols-8 text-white w-auto bg-emerald-500 mt-6 sticky top-0'>
                {/* <div className=""> */}
                {/* <div className="grid grid-cols-4 w-auto bg-amber-200 p-4  gap-1 text-center"> */}
                {/* <div className="font-bold border border-white text-center">Application</div> */}
                <div className="font-bold border border-white text-center py-3 col-span-1">DATE</div>
                <div className="font-bold border border-white text-center py-3 col-span-3">NAME</div>
                <div className="font-bold border border-white text-center py-3 col-span-1">MOBILE</div>
                <div className="font-bold border border-white text-center py-3 col-span-1">SCHOLARSHIP TYPE</div>
                <div className='font-bold border border-white text-center py-3 col-span-1'>PAN</div>
                <div className='font-bold border border-white text-center py-3 col-span-1'>AMOUNT</div>
                {/* <div className='font-bold border border-white text-center'> Balance </div> */}
                {/* <div className="font-bold border border-white text-center">Action</div> */}

            </div>
            <div className="overflow-y-auto max-h-[500px] scrollbar-hide">
                {filterUsers.map((user, index) => (
                    <div key={user.pan} className={`grid grid-cols-8 ${index % 2 === 0 ? "bg-emerald-200" : "bg-emerald-200"}`}>
                        {/* <div className="font-bold border border-white text-center uppercase">{user.fresherOrRenewal}</div> */}
                        <div className="font-bold border border-white text-center items-center align-middle uppercase py-3 col-span-1"> {formatDate(user.scholdate)}</div>
                        <div className="font-bold border border-white text-center text-wrap uppercase py-3 col-span-3">{user.name}</div>
                        <div className="font-bold border border-white text-center uppercase py-3 col-span-1">{user.mobileNo || '-'}</div>
                        {/* <div className="font-bold border border-white text-center uppercase py-3">{user.}</div> */}
                        <div className="font-bold border border-white text-center uppercase py-3 col-span-1">{user.scholtype}</div>
                        <div className="font-bold border border-white text-center uppercase py-3 col-span-1">{user.pan}</div>
                        <div className="font-bold border border-white text-center uppercase py-3 col-span-1">{formatCurrency(user.amount || user.zakkathamt || 0)}</div>
                        {/* <div className="font-bold border border-white text-center uppercase">{user.balance}</div> */}

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Fundstatement