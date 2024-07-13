import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Donar = () => {
  const [name, setName] = useState()
  const [mobileNo, setMobileNo] = useState()
  const [pan, setPan] = useState()
  // const [emailId, setEmailId] = useState()
  const [address, setAddress] = useState()
  const [state, setState] = useState()
  const [district, setDistrict] = useState()
  const [pin, setPin] = useState()
  const [scholtype, setScholType] = useState()
  const [amount, setAmount] = useState()
  const [scholdate, setScholDate] = useState()
  const [balance, setBalance] = useState()

  useEffect(() => {
    setBalance(amount);
  }, [amount]);

  const Submit = (e) => {

    e.preventDefault();
    axios.post('http://localhost:3001/api/admin/donardata', {
      name, mobileNo, address, state, district, pin,
      scholtype, amount, balance, scholdate, pan
    })
      .then(result => {
        console.log(result);
        if (result.data.success) {
          window.alert("Your Data Submitted Successfully");
        }
        else if (result.data.message === 'Donor Already Existing') {
          alert("Pan No. Already Existing")
        }
        else {
          alert('Something went worng')
        }
       
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        window.alert("Submission failed!");
        window.location.reload();
      });
  }



  return (
    <div>
      <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">DONOR DETAILS</h3>
      <form onSubmit={Submit} >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl">
          <div>
            <label className="block mb-1">PAN or DID No</label>
            <input
            type='text'
              name="ScholarshipCategory"
              value={pan}
              onChange={(e) => setPan(e.target.value)}
              className=" w-72 p-2 border rounded-md text-slate-950 lg:w-48"
              required
            />
            </div>
            <div>
              <label className="block mb-1">Scholarship Type</label>
              <select
                name="ScholarshipCategory"
                value={scholtype}
                onChange={(e) => setScholType(e.target.value)}
                className=" w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                required
              >
                <option value="">Select</option>
                <option value="Endowment">Endowment</option>
                <option value="JMC Staff">JMC Staff</option>
                <option value="Alumni">Alumni</option>
                <option value="Well Wishers">Well Wishers</option>
                <option value="Singapore Chapter">Singapore Chapter</option>
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
                <option value="Others">Others</option>
              </select>
          </div>
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              className=" w-72 p-2 border rounded-md text-slate-950"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Mobile No.:</label>
            <input
              type="text"
              maxlength="10"
              name="mobileNo"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              className="w-72 p-2 border rounded-md text-slate-950 lg:w-48"
              required
            />
          </div>
          {/* Email not need
          <div>
            <label className="block mb-1">Email Id:</label>
            <input
              type="email"
              name="emailId"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-72 p-2 border rounded-md text-slate-950 lg:w-48"
              required
            />
          </div> */}
          <div>
            <label className="block mb-1">Permanent Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value.toUpperCase())}
              className="w-72 p-2 border rounded-md text-slate-950"
              placeholder='Door No & Street'
              required
            />
          </div>
          <div>
            <label className="block mb-1">State:</label>
            <select
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-72 p-2 border rounded-md text-slate-950"
              required
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
            <label className="block mb-1">District:</label>
            <select
              name="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-72 p-2 border rounded-md text-slate-950"
              required
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
            <label className="block mb-1">Pincode:</label>
            <input
              type="text"
              maxlength="6"
              name="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-72 p-2 border rounded-md text-slate-950"
              placeholder='Pincode'
              required
            />
          </div>

          <div>
            <label className="block mb-1">Amount:</label>
            <input
              type="text"
              maxlength="10"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-72 p-2 border rounded-md text-slate-950 lg:w-48"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Date</label>
            <input
              type="date"
              name="dob"
              value={scholdate}
              onChange={(e) => setScholDate(e.target.value)}
              className="w-72 p-2 border rounded-md text-slate-600"
              required
            />
          </div>

        </div>
        <button type='submit' className=' p-2 border px-3 mr-3 mt-10 rounded-md bg-orange-500'>Submit</button>
      </form>

    </div>
  )
}
export default Donar;