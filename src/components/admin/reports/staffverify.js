import { useEffect, useState, React } from 'react';
import axios from "axios";
import Loading from '../../../assets/Pulse.svg';

function StaffMaintanance(){
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/api/dashboard/counts')
            .then(response => {
                setData(response.data);

            })
            .catch(err => console.log('Error fetching data:', err));
    }, []);

    if (!data) return <div><center><img src={Loading} alt="" className="w-36 h-80" /></center></div>;


return(
        <div>
         <h1 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white" >STAFF VERIFY REPORTS</h1>
         <div className='mt-6 grid grid-cols-4 w-auto bg-amber-200'>
                     <div className="font-bold border border-white text-center py-3">Staff</div>
                         <div className="font-bold border border-white text-center py-3">Pending</div>
                         <div className="font-bold border border-white text-center py-3">Completed</div>
                         <div className="font-bold border border-white text-center py-3">Total</div>
         </div>
         <div className='grid grid-cols-4 w-auto bg-amber-100'>
                     <div className="font-bold border border-white text-center py-3">Aided</div>
                         <div className="font-bold border border-white text-center py-3">{data.aaCount}</div>
                         <div className="font-bold border border-white text-center py-3">{data.aaComplete}</div>
                         <div className="font-bold border border-white text-center py-3">{data.amCount}</div>
         </div>
         </div>
      )
    }
export default StaffMaintanance;