import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PrintHeader from '../../../assets/printHeader.jpg';
import dayjs from 'dayjs';

const Donar = () => {
  const [name, setName] = useState()
  const [mobileNo, setMobileNo] = useState()
  const [did, setDid] = useState();
  const [pan, setPan] = useState()
  const [emailId, setEmailId] = useState()
  const [address, setAddress] = useState()
  const [state, setState] = useState()
  const [district, setDistrict] = useState()
  const [pin, setPin] = useState()
  const [scholtype, setScholType] = useState()
  // const [scholtypes, setScholTypes] = useState([]); receipt
  const [amount, setAmount] = useState()
  const [receipt, setReceipt] = useState()
  const [scholdate, setScholDate] = useState()
  const [balance, setBalance] = useState()
  const [donordept, setDonordept] = useState()
  const [donorbatch, setDonorbatch] = useState()
  const [zakkath, setZakkath] = useState(false);

  const [zakkathamt, setZakkathamt] = useState('');
  const [zakkathbal, setZakkathbal] = useState();
  // const printSectionRef = useRef(null);
  // const [printData, setPrintData] = useState([]);
  const printRef = useRef();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleCheckboxChange = () => {
    setZakkath(!zakkath);
    if (!zakkath) {
      setZakkathamt(amount);
      setAmount('');
    } else {
      setAmount(zakkathamt);
      setZakkathamt('');
    }
  };


  useEffect(() => {
    setBalance(amount);
    setZakkathbal(zakkathamt);
  }, [amount, zakkathamt]);

  useEffect(() => {
    const fetchLastDonorId = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/admin/last-donor-id`);
        const newDonorId = response.data.lastDid + 1;
        console.log('DonorId:', response.data.lastDid)
        console.log('New DonorId:', newDonorId)
        setDid(newDonorId.toString());
      } catch (error) {
        console.error('Error fetching last donor ID', error);
      }
    };

    fetchLastDonorId();
  }, [apiUrl]);


  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const content = printRef.current.innerHTML;
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };


  const Submit = (e) => {
    e.preventDefault();
    axios.get(`${apiUrl}/api/admin/current-acyear`)
      .then(response => {
        if (response.data.success) {
          const acyear = response.data.acyear.acyear;

          axios.post(`${apiUrl}/api/admin/donardata`, {
            did, name, mobileNo, address, state, district, pin, emailId,
            scholtype, amount, balance, scholdate, pan, receipt, acyear, donordept, donorbatch, zakkathamt, zakkathbal
          })
            .then(result => {
              console.log(result);
              if (result.data.success) {
                // handlePrint();
                alert("Successfully Submited")
              } else if (result.data.message === 'Donor Already Existing') {
                alert("Donor ID Already Existing");
              } else {
                alert('Something went wrong');
              }
            })
            .catch(err => {
              console.log(err);
              window.alert("Submission failed!");
            });
        }
      })
      .catch(error => {
        console.error('Error fetching current academic year:', error);
        window.alert('Error fetching current academic year');
      });
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format('DD-MM-YYYY');
  };

  return (
    <div>
      <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">NEW DONOR </h3>
      <form onSubmit={Submit} >
        <div className=" border border-black p-10 rounded-xl text-lg font-bold">
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className="block mb-1">Donor ID</label>
              <input
                type='text'
                name="ScholarshipCategory"
                value={did}
                onChange={(e) => setDid(e.target.value)}
                className=" w-72 p-2 border border-black rounded-md text-slate-950 bg-gray-300 lg:w-48 "
                required
                readOnly
              />
            </div>
            <div></div>
            <div></div>

            <div>
              <label className="block mb-1">Scholarship Type<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <select
                name="ScholarshipCategory"
                value={scholtype}
                onChange={(e) => setScholType(e.target.value)}
                className=" w-72 p-2 border border-black rounded-md text-slate-950 lg:w-48"
                required
              >
                <option value="">Select</option>
                <option value="Endowment">Endowment</option>
                {/* <option value="JMC Staff">JMC Staff</option> */}
                <option value="Alumni">Alumni</option>
                <option value="Well Wishers">Well Wishers</option>
                {/* <option value="Singapore Chapter">Singapore Chapter</option>
              <option value="Trichy Chapter">Trichy Chapter</option>
              <option value="Chennai Chapter">Chennai Chapter</option>
              <option value="Kerala Chapter">Kerala Chapter</option>
              <option value="Kuwait Chapter">Kuwait Chapter</option>
              <option value="Jeddah Chapter">Jeddah Chapter</option>
              <option value="Koothanallur Chapter">Koothanallur Chapter</option>
              <option value="USA Chapter">USA Chapter</option>
              <option value="Burnei Chapter">Burnei Chapter</option>
              <option value="Riyadh Chapter">Riyadh Chapter</option>
              <option value="Malaysia Chapter">Malaysia Chapter</option>
              <option value="Tenkasi Chapter">Tenkasi Chapter</option>
              <option value="UK Chapter">UK Chapter</option>
              <option value="Kongu Nadu Chapter">Kongu Nadu Chapter</option>
              <option value="Bahrain Chapter">Bahrain Chapter</option>
              <option value="Bengaluru Chapter">Bengaluru Chapter</option>
              <option value="UAE Chapter">UAE Chapter</option>
              <option value="Qatar Chapter">Qatar Chapter</option>
              <option value="Others">Others1</option>
              <option value="Others">Others2</option>
              <option value="Others">Others3</option> */}

              </select>
            </div>
            {scholtype === 'Alumni' && (
              <div className=' grid grid-cols-3 gap-4'>
                <div>
                  <label className="block mb-1 w-80">
                    Programme: <span className='text-red-500  text-lg'><sup>*</sup></span>
                  </label>
                  <input
                    type='text'
                    name='donordept'
                    value={donordept}
                    onChange={(e) => setDonordept(e.target.value)}
                    className="w-72 p-2  border border-black rounded-md text-slate-950 lg:w-48 lg:-ml-2"
                  // required
                  />
                </div>
                <div></div>
                <div>
                  <label className="block mb-1 w-80 ml-28">
                    Studied Year: <span className='text-red-500 text-lg'><sup>*</sup></span>
                  </label>
                  <input
                    type='text'
                    name='donorbatch'
                    value={donorbatch}
                    onChange={(e) => setDonorbatch(e.target.value)}
                    className="w-72 ml-28 p-2 border border-black rounded-md text-slate-950 lg:w-48"
                  // required
                  />
                </div>
                <div>
                </div>

              </div>
            )}
          </div>
          {/* <div>
            <label className="block mb-1">Scholarship Type</label>
            <select
                value={scholtype}
                onChange={(e) => setScholType(e.target.value)}
                className="w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                required
            >
                <option value="">Select Type</option>
                {Array.isArray(scholtypes) && scholtypes.map((type) => (
                    <option key={type._id} value={type.scholtype}>
                                    {type.scholtype}
                                </option>
                ))}
            </select>
          </div> */}
          {/* if alumni show the details */}


          <div className="grid grid-cols-1 md:grid-cols-3 ">
            <div>
              <label className="block mb-1">Name<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
                className=" w-72 p-2 border border-black rounded-md text-slate-950 lg:w-48"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Mobile No. <span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type="text"
                maxlength="10"
                name="mobileNo"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                className="w-72 p-2 border border-black rounded-md text-slate-950 lg:w-48"
              // required
              />
            </div>
            <div>
              <label className="block mb-1">Pan / Aadhar No<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type='text'
                name="ScholarshipCategory"
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                className=" w-72 p-2 border border-black rounded-md text-slate-950 lg:w-48"

              />
            </div>
            <div>
              <label className="block mb-1">Email Id:</label>
              <input
                type="email"
                name="emailId"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-72 p-2 border border-black rounded-md text-slate-950 lg:w-48"
              // required
              />
            </div>
            <div>
              <label className="block mb-1 mt-2">Permanent Address<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value.toUpperCase())}
                className="w-72 p-2 border border-black rounded-md text-slate-950 lg:w-48"
                placeholder='Door No & Street'
              // required
              />
            </div>
            <div>
              <label className="block mb-1 mt-2">State<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <select
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-72 p-2 border border-black rounded-md text-slate-950 lg:w-48"
              // required
              >
                <option value="">Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 mt-2">District<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <select
                name="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-72 p-2 border border-black rounded-md text-slate-950 lg:w-48"
              // required
              >
                <option value="">Select District</option>
                <option value="Ariyalur">Ariyalur</option>
                <option value="Chengalpattu">Chengalpattu</option>
                <option value="Chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Cuddalore">Cuddalore</option>
                <option value="Dharmapuri">Dharmapuri</option>
                <option value="Dindigul">Dindigul</option>
                <option value="Erode">Erode</option>
                <option value="Kallakurichi">Kallakurichi</option>
                <option value="Kanchipuram">Kanchipuram</option>
                <option value="Kanyakumari">Kanyakumari</option>
                <option value="Karur">Karur</option>
                <option value="Krishnagiri">Krishnagiri</option>
                <option value="Madurai">Madurai</option>
                <option value="Nagapattinam">Nagapattinam</option>
                <option value="Namakkal">Namakkal</option>
                <option value="Nilgiris">Nilgiris</option>
                <option value="Perambalur">Perambalur</option>
                <option value="Pudukkottai">Pudukkottai</option>
                <option value="Ramanathapuram">Ramanathapuram</option>
                <option value="Ranipet">Ranipet</option>
                <option value="Salem">Salem</option>
                <option value="Sivaganga">Sivaganga</option>
                <option value="Tenkasi">Tenkasi</option>
                <option value="Thanjavur">Thanjavur</option>
                <option value="Theni">Theni</option>
                <option value="Thoothukudi">Thoothukudi</option>
                <option value="Tiruchirappalli">Tiruchirappalli</option>
                <option value="Tirunelveli">Tirunelveli</option>
                <option value="Tirupathur">Tirupathur</option>
                <option value="Tiruppur">Tiruppur</option>
                <option value="Tiruvallur">Tiruvallur</option>
                <option value="Tiruvannamalai">Tiruvannamalai</option>
                <option value="Tiruvarur">Tiruvarur</option>
                <option value="Vellore">Vellore</option>
                <option value="Viluppuram">Viluppuram</option>
                <option value="Virudhunagar">Virudhunagar</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 mt-2">Pincode<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type="text"
                maxlength="6"
                name="pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-72 p-2 border border-black rounded-md text-slate-950 lg:w-48"
                placeholder='Pincode'
              // required
              />
            </div>

            <div>
              <label className="block mb-1 mt-2"> Date of Payment<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type="date"
                name="dob"
                value={scholdate}
                onChange={(e) => setScholDate(e.target.value)}
                className="w-72 p-2 border border-black rounded-md text-slate-600 lg:w-48"
                required
              />
            </div>

            <div className='flex inline-flex mt-10'>
              <input
                type="radio"
                name="zakkath"
                checked={zakkath}
                onChange={handleCheckboxChange}
                className="ml-2 scale-200"
              />
              <label className="block mt-2 ml-3 font-bold ">Zakkath</label>
              <input
                type="radio"
                name="zakkath"
                className="ml-2 scale-200"
              />
              <label className="block mt-2 ml-3 font-bold ">General</label>
            </div>

            <div>
              <label className="block mb-1 mt-2">Cheque / Receipt No<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type="text"
                name="name"
                value={receipt}
                onChange={(e) => setReceipt(e.target.value.toUpperCase())}
                className=" w-72 p-2 border border-black rounded-md text-slate-950 lg:w-48"
              // required
              />
            </div>

            <div>
              <label className="block mb-1 mt-2">
                Amount<span className="text-red-500 text-lg"><sup>*</sup></span>
              </label>
              <input
                type="text"
                maxLength="10"
                name={zakkath ? "zakkathamt" : "amount"}
                value={zakkath ? zakkathamt : amount}
                onChange={(e) => zakkath ? setZakkathamt(e.target.value) : setAmount(e.target.value)}
                className="w-72 p-2 border border-black rounded-md text-slate-950 lg:w-48"
                required
              />
            </div>

          </div>
          <div className='text-right'>
            <button
              type='submit'
              className=' p-2 border mt-20 px-6 text-white font-bold rounded-md  hover:bg-orange-700 bg-orange-500'

            >
              Submit
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-black p-2 border  ml-6 mt-20 px-6 text-white font-bold rounded-md hover:bg-blue-700"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>

        </div>


      </form>
      <div ref={printRef} style={{ display: 'block', visibility: 'hidden', position: 'absolute' }}>
        <img src={PrintHeader} alt="Print Header" />
        <div className='h-3/4 w-11/12 mx-7 border border-black'>
          <div className='font-bold text-right text-lg mt-10 px-8'>Date: {formatDate(scholdate)}</div>
          <h3 className='font-bold text-lg mt-10 px-8'>{name}</h3>
          <p className='text-justify text-lg mt-5 px-10'>
            <span className='ml-5'>We want to express</span> our heartfelt thanks for your generous scholarship donation to support financially disadvantaged students at Jamal Mohamed College.
            Your kindness has provided these students with invaluable opportunities, allowing them to pursue their education without the weight of financial stress.
            Your commitment to helping those in need has not only transformed their academic journey but also inspired hope and motivation in their lives.<br /><br />
            <span className='ml-5'>We</span> are incredibly grateful for your continued support and the positive impact you've made on our community. Wishing you and your loved ones a joyful and blessed Thanksgiving.<br /><br />
            With deepest appreciation, <br /> <br /> <br />
          </p>
          <div className='font-bold text-right text-lg px-8'>Principal</div>
        </div>
      </div>
    </div>
  )
}
export default Donar;