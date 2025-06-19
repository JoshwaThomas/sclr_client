import { useEffect, useState, React } from 'react';
import axios from "axios";
import Loading from '../../assets/Pulse.svg';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function Action() {

    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [donorMapping, setDonorMapping] = useState({});
    const [data, setData] = useState(null);
    const [totalamount, setTotalAmount] = useState(0);
    const [totaldonaramt, setDonaramt] = useState(0);
    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        const fetchUsersAndDonors = async () => {
            try {
                const usersResponse = await axios.get(`${apiUrl}/api/admin/freshamt`);
                const donorsResponse = await axios.get(`${apiUrl}/api/admin/donors`);

                const usersData = usersResponse.data;
                const donorsData = donorsResponse.data;

                const donorMap = donorsData.reduce((map, donor) => {
                    map[donor._id] = donor.name;
                    return map;
                }, {});

                setUsers(usersData);
                setFilterUsers(usersData);
                setDonorMapping(donorMap);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsersAndDonors();
    }, [apiUrl]);



    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();

        const filteredUsers = users.filter((user) =>
            user.dept.toLowerCase().includes(searchText) ||
            user.registerNo.toLowerCase().includes(searchText) ||
            user.name.toLowerCase().includes(searchText) ||
            // user.fresherOrRenewal.toLowerCase().includes(searchText) ||
            user.scholdonar.toLowerCase().includes(searchText)
        );
        setFilterUsers(filteredUsers);
    };

    // show the no of applicant in footer
    useEffect(() => {
        axios.get(`${apiUrl}/api/dashboard/counts`)
            .then(response => {
                setData(response.data)
                const total = response.data.scholamt.reduce((add, amount) => add + amount, 0);
                setTotalAmount(total);
                const total1 = response.data.donaramt.reduce((add, amount) => add + amount, 0);
                setDonaramt(total1);
            })
            .catch(err => console.log('Error fetching data:', err))
    }, [apiUrl]);

    // console.log("Data : ", filterUsers)

    if (!data) return <div ><center><img src={Loading} alt="" className=" w-36 h-80  " /></center></div>; 

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    };
    const handleDownload = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'Distribution_Statement';

        const headers = [
            'REGISTER NO',
            'NAME',
            'DEPARTMENT',
            'SCHOLARSHIP TYPE',
            'SCHOLAR DONOR NAME',
            'AMOUNT'

        ];

        const dataWithHeaders = [headers, ...users.map(user => [
            user.registerNo,
            user.name,
            user.dept,
            user.scholtype,
            donorMapping[user.scholdonar] || user.scholdonar ,
            formatCurrency(user.scholamt),
        ])];

        const ws = XLSX.utils.aoa_to_sheet(dataWithHeaders);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        const data = new Blob([excelBuffer], { type: fileType });
        saveAs(data, fileName + fileExtension);
    };

    return (
        <div>
            <div className='end-px'>

                <h1 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white" >Distribution Statement</h1>
                <input
                    type='text'
                    placeholder='Search text here'
                    className='uppercase py-1 rounded-md mr-2 border border-black'
                    onChange={handleSearch}
                />
                <button
                    type="button"
                    className="bg-blue-500 text-white py-1 px-3 hover:bg-black rounded-lg mt-1"
                >
                    Search
                </button>
                <button
                    type="button"
                    className="bg-green-500 text-white font-bold py-2  px-3 hover:bg-black rounded-lg m-1 "
                    onClick={handleDownload}
                >
                    Download Excel
                </button>

            </div>
            <div className="text-right font-bold text-xl ml-28 ">No of Students:  {filterUsers.length}</div>
            <div className="grid grid-cols-6 text-white w-auto bg-emerald-500 mt-4 sticky top-0">
                {/* <div className=""> */}
                {/* <div className="grid grid-cols-4 w-auto bg-amber-200 p-4  gap-1 text-center"> */}
                {/* <div className="font-bold border border-white text-center">Application</div> */}
                <div className="font-bold border border-black text-center py-3">REGISTER NO.</div>
                <div className="font-bold border border-black text-center py-3">NAME</div>
                <div className="font-bold border border-black text-center py-3">DEPARTMENT</div>
                <div className="font-bold border border-black text-center py-3">SCHOLARSHIP TYPE</div>
                <div className="font-bold border border-black text-center py-3">DONOR NAME</div>
                <div className='font-bold border border-black text-center py-3'>AMOUNT</div>
                {/* <div className="font-bold border border-white text-center">Action</div> */}

            </div>
            <div className="overflow-y-auto max-h-[500px] scrollbar-hide">
                {filterUsers.map((user, index) => (
                    <div key={user.registerNo} className={`grid grid-cols-6 ${index % 2 === 0 ? "bg-emerald-200" : "bg-emerald-200"}`}>
                        {/* <div className="font-bold border border-white text-center uppercase">{user.fresherOrRenewal}</div> */}
                        <div className="font-bold border border-black text-center py-3 uppercase">{user.registerNo}</div>
                        <div className="font-bold border border-black text-center py-3 uppercase">{user.name}</div>
                        <div className="font-bold border border-black text-center py-3 uppercase">{user.dept}</div>
                        <div className="font-bold border border-black text-center py-3 uppercase">{user.scholtype}</div>
                        <div className="font-bold border border-black text-center py-3 uppercase">{donorMapping[user.scholdonar] || user.scholdonar}</div>
                        <div className="font-bold border border-black text-center py-3 uppercase">{formatCurrency(user.scholamt)}</div>

                    </div>
                ))}
            </div>
            <div></div>

            <div className='flex inline-flex text-xl py-5 grid grid-cols-2 gap-4 mt-4'>
                <div className='border border-white rounded-lg  grid grid-cols-2 p-4 bg-blue-600 '>
                    <div className=' w-72 ml-7' > Number of Students Applied    </div><div className='ml-16'> :   {data.totalApplication} </div>
                    <div className=' w-72 ml-7' > Number of Students Benefitted : </div><div className='ml-20'> {data.totalBenefit} </div>
                </div>
                <div className='border border-white rounded-lg   p-4 grid grid-cols-2 bg-blue-600 '>
                    <div className='  '>Scholarship Received :</div><div className='-ml-10'> {formatCurrency(totaldonaramt)}</div>
                    <div className=' '>Scholarship Awarded  : </div><div className='-ml-10'> {formatCurrency(totalamount)}  </div>
                </div>
            </div>
        </div >
    );
}

export default Action;
