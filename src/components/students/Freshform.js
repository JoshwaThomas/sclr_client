import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ScholarshipForm = () => {

  const navigate = useNavigate();

  const [fresherOrRenewal, setFresherOrRenewal] = useState()
  const [ugOrPg, setUgOrPg] = useState()
  const [semester, setSemester] = useState()
  const [name, setName] = useState()
  const [registerNo, setRegisterNo] = useState()
  const [dept, setDept] = useState()
  const [section, setSection] = useState()
  const [religion, setReligion] = useState()
  const [procategory, setProcategory] = useState()
  const [address, setAddress] = useState()
  const [state, setState] = useState()
  const [district, setDistrict] = useState()
  const [pin, setPin] = useState()
  const [specialCategory, setSpecialCategory] = useState()
  const [community, setCommunity] = useState()
  const [hostel, setHostel] = useState()
  const [mobileNo, setMobileNo] = useState()
  const [emailId, setEmailId] = useState()
  const [aadhar, setAadhar] = useState()
  const [fatherName, setFatherName] = useState()
  const [fatherNo, setFatherNo] = useState()
  const [fatherOccupation, setFatherOccupation] = useState()
  const [annualIncome, setAnnualIncome] = useState()
  const [schoolName, setSchoolName] = useState()
  const [yearOfPassing, setYearOfPassing] = useState()
  const [marksSecuredSchool, setMarksSecuredSchool] = useState()
  const [percentageOfMarkSchool, setPercentageOfMarkSchool] = useState()
  const [siblings, setSiblings] = useState()
  const [deeniyathEducationDays, setDeeniyathEducationDays] = useState()
  const [deeniyathPer, setDeeniyathPer] = useState()
  const [classAttendance, setClassAttendance] = useState()
  const [classAttendancePer, setClassAttendancePer] = useState()
  const [maximumMarkSchool, setMaximumMarkSchool] = useState()
  const [classMaxAttendance, setClassMaxAttendance] = useState()
  const [deeniyathMaxDays, setDeeniyathMaxDays] = useState()
  const [preSemester, setPreSemester] = useState()
  const [maxMark, setMaxMark] = useState()
  const [mark, setMark] = useState()
  const [semPercentage, setSemPercentage] = useState()
  


  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/fresh", { fresherOrRenewal, ugOrPg,semester, name, registerNo, dept, section, religion,  procategory, address, district,  state,   pin,  specialCategory, 
      community, hostel, mobileNo, emailId, aadhar, fatherName, fatherNo,  fatherOccupation, annualIncome, schoolName, 
        yearOfPassing, percentageOfMarkSchool, siblings, deeniyathPer,  classAttendancePer, semPercentage     })
      .then(result =>{ console.log(result);
      window.alert("Your Application Submitted Successfully");
    })
      .catch(err =>{
        console.log(err);
        window.alert("Something Went Wrong");
      });

   /* const formData = {
      ...fresherOrRenewal,ugOrPg,semester, name, registerNo, dept, section, religion,  procategory, address,  state,  district, pin,  specialCategory, 
      community, hostel, mobileNo, emailId, aadhar, fatherName, fatherNo,  fatherOccupation, annualIncome, schoolName, 
        yearOfPassing, marksSecuredSchool, percentageOfMarkSchool, siblings, deeniyathEducationDays, 
        deeniyathPer, classAttendance, classAttendancePer
      
    };
    console.log(formData);
    // Here you can send the formData to the server or perform other actions*/
  };

  return (
    <div>
      <div className="container mx-auto p-8">
        <form onSubmit={Submit} className="space-y-4">
          <div className=' '>
            <div>
              <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">Application</h3>

              <div className="space-x-4 inline-flex border p-10 rounded-xl">
                <div>
                  <input
                    type="radio"
                    id="Fresher"
                    name="fresherOrRenewal"
                    value="fresher"
                    className=' scale-200'
                    checked={fresherOrRenewal === 'fresher'}
                    onChange={(e) => setFresherOrRenewal(e.target.value)}
                    required
                  />
                  <label htmlFor="Fresher" className=' form-radio ml-2 text-xl'>Fresher</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Renewal"
                    name="fresherOrRenewal"
                    value="renewal"
                    className=' scale-200'
                    checked={fresherOrRenewal === 'renewal'}
                    onChange={(e) => setFresherOrRenewal(e.target.value)}
                    onClick={() => navigate('/student/application/renewal')}
                    required
                  />
                  <label htmlFor="Renewal" className=' form-radio ml-2 text-xl'>Renewal</label>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Personal Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10 rounded-xl">

            <div>
              <label className="block mb-1">UG or PG:</label>
              <div className=" space-x-7 inline-flex">
                <div>
                  <input
                    type="radio"
                    id="Ug"
                    name="ugOrPg"
                    value="ug"
                    className=' scale-200'
                    checked={ugOrPg === 'ug'}
                    onChange={(e) => setUgOrPg(e.target.value)}
                    required
                  />
                  <label htmlFor="Ug" className=' form-radio ml-2 text-lg'> UG</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Pg"
                    name="ugOrPg"
                    value="pg"
                    className=' scale-200'
                    checked={ugOrPg === 'pg'}
                    onChange={(e) => setUgOrPg(e.target.value)}
                    required
                  />
                  <label htmlFor="Pg" className=' form-radio ml-2 text-lg'> PG</label>
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-1">Programme Category</label>
              <div className="space-x-4 inline-flex">
                <div>
                  <input
                    type="radio"
                    id="aided"
                    name="procategory"
                    value="Aided Mens"
                    className=' scale-200'
                    checked={procategory === 'Aided Mens'}
                    onChange={(e) => setProcategory(e.target.value)}
                    required
                  />
                  <label htmlFor="Aided Mens" className=' form-radio ml-2 text-lg'> Aided Mens</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="sfmens"
                    name="procategory"
                    value="SF Mens"
                    className=' scale-200'
                    checked={procategory === 'SF Mens'}
                    onChange={(e) => setProcategory(e.target.value)}
                    required
                  />
                  <label htmlFor="SF Mens" className=' form-radio ml-2 text-lg'> SF Mens</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="sfwomens"
                    name="procategory"
                    value="SF Womens"
                    className=' scale-200'
                    checked={procategory === 'SF Womens'}
                    onChange={(e) => setProcategory(e.target.value)}
                    required
                  />
                  <label htmlFor="SF Womens" className=' form-radio ml-2 text-lg'> SF Womens </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-1">Semester:</label>
              <div className="space-x-4 inline-flex">
                <div>
                  <input
                    type="radio"
                    id="ISemester"
                    name="semester"
                    value="Isemester"
                    className=' scale-200'
                    checked={semester === 'Isemester'}
                    onChange={(e) =>  setSemester(e.target.value)}
                    required
                  />
                  <label htmlFor="ISemester" className=' form-radio ml-2 text-lg'> I </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="IISemester"
                    name="semester"
                    value="IIsemester"
                    className=' scale-200'
                    checked={semester === 'IIsemester'}
                    onChange={(e) =>  setSemester(e.target.value)}
                    required
                  />
                  <label htmlFor="IISemester" className=' form-radio ml-2 text-lg'> II </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="IIISemester"
                    name="semester"
                    value="IIIsemester"
                    className=' scale-200'
                    checked={semester === 'IIIsemester'}
                    onChange={(e) =>  setSemester(e.target.value)}
                    required
                  />
                  <label htmlFor="IIISemester" className=' form-radio ml-2 text-lg'> III </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="IVSemester"
                    name="semester"
                    value="IVsemester"
                    className=' scale-200'
                    checked={semester === 'IVsemester'}
                    onChange={(e) =>  setSemester(e.target.value)}
                    required
                  />
                  <label htmlFor="IVSemester" className=' form-radio ml-2 text-lg'> IV </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="VSemester"
                    name="semester"
                    value="Vsemester"
                    className=' scale-200'
                    checked={semester === 'Vsemester'}
                    onChange={(e) =>  setSemester(e.target.value)}
                    required
                  />
                  <label htmlFor="VSemester" className=' form-radio ml-2 text-lg'> V </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="VIsemester"
                    name="semester"
                    value="VIsemester"
                    className=' scale-200'
                    checked={semester === 'VIsemester'}
                    onChange={(e) =>  setSemester(e.target.value)}
                    required
                  />
                  <label htmlFor="VISemester" className=' form-radio ml-2 text-lg'> VI </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-1">Hostel:</label>
              <div className="space-x-4 inline-flex">
                <div>
                  <input
                    type="radio"
                    id="hostelYes"
                    name="hostel"
                    value="yes"
                    className=' scale-200'
                    checked={hostel === 'yes'}
                    onChange={(e) =>  setHostel(e.target.value)}
                    required
                  />
                  <label htmlFor="hostelYes" className=' form-radio ml-2 text-lg'> Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="hostelNo"
                    name="hostel"
                    value="no"
                    className=' scale-200'
                    checked={hostel === 'no'}
                    onChange={(e) =>  setHostel(e.target.value)}
                    required
                  />
                  <label htmlFor="hostelNo" className=' form-radio ml-2 text-lg'> No</label>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10  rounded-xl">
            <div>
              <label className="block mb-1">Register No.:</label>
              <input
                type="text"
                name="registerNo"
                value={registerNo}
                onChange={(e) =>  setRegisterNo(e.target.value)}
                className=" w-96 p-2 border rounded-md text-slate-950"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) =>  setName(e.target.value)}
                className=" w-96 p-2 border rounded-md text-slate-950"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Department:</label>
              <input
                type="text"
                name="dept"
                value={dept}
                onChange={(e) =>  setDept(e.target.value)}
                className=" w-96 p-2 border rounded-md text-slate-950"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Section</label>
              <select
                name="specialCategory"
                value={section}
                onChange={(e) =>  setSection(e.target.value)}
                className=" w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                required
              >
                <option value="">Select</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
                <option value="H">H</option>
                <option value="I">I</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl">
            <div>
              <label className="block mb-1">Special Category:</label>
              <select
                name="specialCategory"
                value={specialCategory}
                onChange={(e) =>  setSpecialCategory(e.target.value)}
                className=" w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                required
              >
                <option value="">Select</option>
                <option value="none">None</option>
                <option value="muaddin">Mu-addin</option>
                <option value="hazrath">Hazrath</option>
                <option value="fatherMotherSeparated">Father & Mother Separated</option>
                <option value="fatherExpired">Father Expired</option>
                <option value="singleparent">Single Parent</option>
                <option value="Orphan">Orphan</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Religion:</label>
              <select
                name="religion"
                value={religion}
                onChange={(e) =>  setReligion(e.target.value)}
                className="w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                required
              >
                <option value="">Select</option>
                <option value="Muslim">Muslim</option>
                <option value="Hindu">Hindu</option>
                <option value="Christian">Christian</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Community:</label>
              <select
                name="community"
                value={community}
                onChange={(e) =>  setCommunity(e.target.value)}
                className="w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                required
              >
                <option value="">Select</option>
                <option value="MBC">MBC</option>
                <option value="BCM">BCM</option>
                <option value="BC">BC</option>
                <option value="SC/ST">SC / ST</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Mobile No.:</label>
              <input
                type="text"
                maxlength="10"
                name="mobileNo"
                value={mobileNo}
                onChange={(e) =>  setMobileNo(e.target.value)}
                className="w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Email Id:</label>
              <input
                type="email"
                name="emailId"
                value={emailId}
                onChange={(e) =>  setEmailId(e.target.value)}
                className="w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Aadhar no:</label>
              <input
                type="text"
                name="aadhar"
                value={aadhar}
                onChange={(e) =>  setAadhar(e.target.value)}
                className="w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10 rounded-xl">
            <div>
              <label className="block mb-1">Father's Name:</label>
              <input
                type="text"
                name="fatherName"
                value={fatherName}
                onChange={(e) =>  setFatherName(e.target.value)}
                className="w-96 p-2 border rounded-md text-slate-950"
                required
              />

              <label className="block mb-1">Father's Contact No.:</label>
              <input
                type="text"
                name="fatherNo"
                value={fatherNo}
                onChange={(e) =>  setFatherNo(e.target.value)}
                className="w-96 p-2 border rounded-md text-slate-950"
                required
              />


              <label className="block mb-1">Father's Occupation:</label>
              <input
                type="text"
                name="fatherOccupation"
                value={fatherOccupation}
                onChange={(e) =>  setFatherOccupation(e.target.value)}
                className="w-96 p-2 border rounded-md text-slate-950"
                required
              />

              <label className="block mb-1">Annual Income:</label>
              <input
                type="text"
                name="annualIncome"
                value={annualIncome}
                onChange={(e) =>  setAnnualIncome(e.target.value)}
                className="w-96 p-2 border rounded-md text-slate-950"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Permanent Address</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) =>  setAddress(e.target.value)}
                className="w-96 p-2 border rounded-md text-slate-950"
                placeholder='Door No & Street'
                required
              />
              <label className="block mb-1">State:</label>
              <select
                name="state"
                value={state}
                onChange={(e) =>  setState(e.target.value)}
                className="w-96 p-2 border rounded-md text-slate-950"
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
              <label className="block mb-1">District:</label>
              <select
                name="district"
                value={district}
                onChange={(e) =>  setDistrict(e.target.value)}
                className="w-96 p-2 border rounded-md text-slate-950"
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
              <label className="block mb-1">Pincode:</label>
              <input
                type="text"
                maxlength="6"
                name="pin"
                value={pin}
                onChange={(e) =>  setPin(e.target.value)}
                className="w-96 p-2 border rounded-md text-slate-950"
                placeholder='Pincode'
                required
              />

            </div>
          </div>
          {/* Education Details section */}
          <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Education Details</h3>
          <div>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10 rounded-xl">
                <div>
                  <label className="block mb-1">Last School Name:</label>
                  <input
                    type="text"
                    name="schoolName"
                    value={schoolName}
                    onChange={(e) =>  setSchoolName(e.target.value)}
                    className="w-96 p-2 border rounded-md text-slate-950"

                  />
                </div>
                <div>
                  <label className="block mb-1">Year of Passing:</label>
                  <input
                    type="text"
                    name="yearOfPassing"
                    value={yearOfPassing}
                    onChange={(e) =>  setYearOfPassing(e.target.value)}
                    className="w-96 p-2 border rounded-md text-slate-950"

                  />
                </div>
                <div>
                  <label className="block mb-1">Maximum Mark:</label>
                  <input
                    type="text"
                    name="maximumMarkSchool"
                    value={maximumMarkSchool}
                    onChange={(e) =>  setMaximumMarkSchool(e.target.value)}
                    className="w-96 p-2 border rounded-md text-slate-950"

                  />
                </div>
                <div>
                  <label className="block mb-1">Marks Secured:</label>
                  <input
                    type="text"
                    name="marksSecuredSchool"
                    value={marksSecuredSchool}
                    onChange={(e) =>  setMarksSecuredSchool(e.target.value)}
                    className="w-96 p-2 border rounded-md text-slate-950"

                  />
                </div>
                <div>
                  <label className="block mb-1">Percentage of Mark:</label>
                  <input
                    type="text"
                    name="percentageOfMarkSchool"
                    value={percentageOfMarkSchool}
                    onChange={(e) =>  setPercentageOfMarkSchool(e.target.value)}
                    className="w-96 p-2 border rounded-md text-slate-950"

                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border p-10 rounded-xl">
              <div>
                  <label className="block mb-1">Semester:</label>
                  <input
                    type="text"
                    name="preSemester"
                    value={preSemester}
                    onChange={(e) =>  setPreSemester(e.target.value)}
                    className=" w-52 p-2 border rounded-md text-slate-950"

                  />
                </div>
                <div>
                  <label className="block mb-1">Mark (PartIII Only):</label>
                  <input
                    type="text"
                    name="mark"
                    value={mark}
                    onChange={(e) =>  setMark(e.target.value)}
                    className="w-52 p-2 border rounded-md text-slate-950"

                  />
                </div>
                <div>
                  <label className="block mb-1">Maximum Mark (PartIII Only):</label>
                  <input
                    type="text"
                    name="maxMark"
                    value={maxMark}
                    onChange={(e) =>  setMaxMark(e.target.value)}
                    className="w-52 p-2 border rounded-md text-slate-950"

                  />
                </div>
                <div>
                  <label className="block mb-1">Percentage of Mark:</label>
                  <input
                    type="text"
                    name="semPercentage"
                    value={semPercentage}
                    onChange={(e) =>  setSemPercentage(e.target.value)}
                    className=" w-52 p-2 border rounded-md text-slate-950"

                  />
                </div>
              </div>
              
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl">
              <div>
                <label className="block mb-1">Class Attendance:</label>
                <input
                  type="text"
                  name="classAttendance"
                  value={classAttendance}
                  onChange={(e) =>  setClassAttendance(e.target.value)}
                  className="w-92 p-2 border rounded-md text-slate-950"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Class Max Attendance:</label>
                <input
                  type="text"
                  name="classMaxAttendance"
                  value={classMaxAttendance}
                  onChange={(e) =>  setClassMaxAttendance(e.target.value)}
                  className="w-92 p-2 border rounded-md text-slate-950"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Class Attendance Percentage:</label>
                <input
                  type="text"
                  name="classAttendancePer"
                  value={classAttendancePer}
                  onChange={(e) =>  setClassAttendancePer(e.target.value)}
                  className="w-92 p-2 border rounded-md text-slate-950"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Deeniyath Education Days Attendance:</label>
                <input
                  type="text"
                  name="deeniyathEducationDays"
                  value={deeniyathEducationDays}
                  onChange={(e) =>  setDeeniyathEducationDays(e.target.value)}
                  className="w-92 p-2 border rounded-md text-slate-950"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Deeniyath Max Days:</label>
                <input
                  type="text"
                  name="deeniyathMaxDays"
                  value={deeniyathMaxDays}
                  onChange={(e) =>  setDeeniyathMaxDays(e.target.value)}
                  className="w-92 p-2 border rounded-md text-slate-950"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Deeniyath Percentage:</label>
                <input
                  type="text"
                  name="deeniyathPer"
                  value={deeniyathPer}
                  onChange={(e) =>  setDeeniyathPer(e.target.value)}
                  className="w-92 p-2 border rounded-md text-slate-950"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Siblings</label>
                <input
                  type="text"
                  name="siblings"
                  value={siblings}
                  onChange={(e) =>  setSiblings(e.target.value)}
                  className="w-92 p-2 border rounded-md text-slate-950"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScholarshipForm;
