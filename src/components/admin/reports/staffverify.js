import { useEffect, useState, React } from 'react';
import axios from "axios";
import Loading from '../../../assets/Pulse.svg';

function StaffMaintanance(){
    const [data, setData] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/api/dashboard/counts`)
            .then(response => {
                setData(response.data);

            })
            .catch(err => console.log('Error fetching data:', err));
    }, [apiUrl]);

    if (!data) return <div><center><img src={Loading} alt="" className="w-36 h-80" /></center></div>;


return(
        <div>
         <h1 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white" >STAFF VERIFY REPORTS</h1>
         <div className='mt-6 grid grid-cols-4 w-auto bg-amber-200'>
                     <div className="font-bold border border-white text-center py-3">Particulars</div>
                         <div className="font-bold border border-white text-center py-3">Pending</div>
                         <div className="font-bold border border-white text-center py-3">Completed</div>
                         <div className="font-bold border border-white text-center py-3">Total</div>
         </div>
         <div className='grid grid-cols-4 w-auto bg-amber-100'>
                     <div className="font-bold border border-white text-center py-3">RA - Aided</div>
                         <div className="font-bold border border-white text-center py-3">{data.aaCount}</div>
                         <div className="font-bold border border-white text-center py-3">{data.aaComplete}</div>
                         <div className="font-bold border border-white text-center py-3">{data.amCount}</div>
         </div>
         <div className='grid grid-cols-4 w-auto bg-amber-100'>
                     <div className="font-bold border border-white text-center py-3">RA - SFM</div>
                         <div className="font-bold border border-white text-center py-3">{data.selfmCount}</div>
                         <div className="font-bold border border-white text-center py-3">{data.selfmComplete}</div>
                         <div className="font-bold border border-white text-center py-3">{data.sfmCount}</div>
         </div>
         <div className='grid grid-cols-4 w-auto bg-amber-100'>
                     <div className="font-bold border border-white text-center py-3">RA - SFW</div>
                         <div className="font-bold border border-white text-center py-3">{data.selfwCount}</div>
                         <div className="font-bold border border-white text-center py-3">{data.selfwComplete}</div>
                         <div className="font-bold border border-white text-center py-3">{data.sfwCount}</div>
         </div>
         <div className='grid grid-cols-4 w-auto bg-amber-100'>
                     <div className="font-bold border border-white text-center py-3">Deeniyath Men</div>
                         <div className="font-bold border border-white text-center py-3">{data.damCount}</div>
                         <div className="font-bold border border-white text-center py-3">{data.aCompleted}</div>
                         <div className="font-bold border border-white text-center py-3">{data.damTotal}</div>
         </div>
         <div className='grid grid-cols-4 w-auto bg-amber-100'>
                     <div className="font-bold border border-white text-center py-3">Deeniyath Women</div>
                         <div className="font-bold border border-white text-center py-3">{data.dwCount}</div>
                         <div className="font-bold border border-white text-center py-3">{data.wCompleted}</div>
                         <div className="font-bold border border-white text-center py-3">{data.dwTotal}</div>
         </div>
         <div className='grid grid-cols-4 w-auto bg-amber-100'>
                     <div className="font-bold border border-white text-center py-3">Moral Men</div>
                         <div className="font-bold border border-white text-center py-3">{data.mamCount}</div>
                         <div className="font-bold border border-white text-center py-3">{data.maCompleted}</div>
                         <div className="font-bold border border-white text-center py-3">{data.mamTotal}</div>
         </div>
         <div className='grid grid-cols-4 w-auto bg-amber-100'>
                     <div className="font-bold border border-white text-center py-3">Moral Women</div>
                         <div className="font-bold border border-white text-center py-3">{data.mwCount}</div>
                         <div className="font-bold border border-white text-center py-3">{data.mwCompleted}</div>
                         <div className="font-bold border border-white text-center py-3">{data.mwTotal}</div>
         </div>
         <div className='grid grid-cols-4 w-auto bg-amber-100'>
                     <div className="font-bold border border-white text-center py-3">COE</div>
                         <div className="font-bold border border-white text-center py-3">{data.semCount}</div>
                         <div className="font-bold border border-white text-center py-3">{data.semComplete}</div>
                         <div className="font-bold border border-white text-center py-3">{data.totalApplicants}</div>
         </div>
         </div>
      )
    }
export default StaffMaintanance;