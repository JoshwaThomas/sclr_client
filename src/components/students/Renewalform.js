import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ScholarshipForm = () => {

  const navigate = useNavigate();

  const [personalDetails, setPersonalDetails] = useState({
    ugOrPg: '',
    semester: '',
    name: '',
    registerNo: '',
    dept: '',
    section: '',
    religion: '',
    procategory: '',
   
    address: '',
    specialCategory: '',
    community: '',
    hostel: '',
    mobileNo: '',
    emailId: '',
    aadhar: '',
    fatherName: '',
    fatherNo: '',
    fatherOccupation: '',
    annualIncome: '',
    fresherOrRenewal: '',
    lastCreditedAmount: '',
  });
  const [additionalDetails, setAdditionalDetails] = useState({
    arrear: '',
    siblings: '',
    deeniyathEducationDays: '',
    classAttendance: '',

  })
  const [educationDetails, setEducationDetails] = useState({
    semesters: [
      { semester: '', mark: '', maximumMark: '', percentage: '' }
    ]
  });


  const handleChangePersonal = (e) => {
    const { name, value } = e.target;
    setPersonalDetails({
      ...personalDetails,
      [name]: value
    });
  };
  const handleChangeAdditional = (e) => {
    const { name, value } = e.target;
    setAdditionalDetails({
      ...additionalDetails,
      [name]: value
    });
  };

  const handleChangeEducation = (e, index) => {
    const { name, value } = e.target;
    const updatedSemesters = [...educationDetails.semesters];
    updatedSemesters[index][name] = value;
    setEducationDetails({
      ...educationDetails,
      semesters: updatedSemesters
    });
  };

  const addSemesterRow = () => {
    setEducationDetails({
      ...educationDetails,
      semesters: [...educationDetails.semesters, { semester: '', mark: '', maximumMark: '', percentage: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...personalDetails,
      ...educationDetails
    };
    console.log(formData);
    // Here you can send the formData to the server or perform other actions
  };

  return (
    <div>
      <div className="container mx-auto p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='  '>
            <div>
              <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 text-white">Application</h3>

              <div className="space-x-4 inline-flex border p-10 rounded-xl">
                <div>
                  <input
                    type="radio"
                    id="Fresher"
                    name="fresherOrRenewal"
                    value="fresher"
                    className=' scale-200'
                    onChange={handleChangePersonal}
                    onClick={() => navigate('/student/application/fresh')}
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
                    checked={personalDetails.fresherOrRenewal === 'renewal'}
                    onChange={handleChangePersonal}
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
              <div className="space-x-4 inline-flex">
                <div>
                  <input
                    type="radio"
                    id="Ug"
                    name="ugOrPg"
                    value="ug"
                     className=' scale-200'
                    checked={personalDetails.ugOrPg === 'ug'}
                    onChange={handleChangePersonal}
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
                    checked={personalDetails.ugOrPg === 'pg'}
                    onChange={handleChangePersonal}
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
                    checked={personalDetails.procategory === 'Aided Mens'}
                    onChange={handleChangePersonal}
                    required
                  />
                  <label className=' form-radio ml-2 text-lg'> Aided Mens</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="sfmens"
                    name="procategory"
                    value="SF Mens"
                     className=' scale-200'
                    checked={personalDetails.procategory === 'SF Mens'}
                    onChange={handleChangePersonal}
                    required
                  />
                  <label className=' form-radio ml-2 text-lg' > SF Mens</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="sfwomens"
                    name="procategory"
                    value="SF Womens"
                     className=' scale-200'
                    checked={personalDetails.procategory === 'SF Womens'}
                    onChange={handleChangePersonal}
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
                    checked={personalDetails.semester === 'Isemester'}
                    onChange={handleChangePersonal}
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
                    checked={personalDetails.semester === 'IIsemester'}
                    onChange={handleChangePersonal}
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
                    checked={personalDetails.semester === 'IIIsemester'}
                    onChange={handleChangePersonal}
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
                    checked={personalDetails.semester === 'IVsemester'}
                    onChange={handleChangePersonal}
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
                    checked={personalDetails.semester === 'Vsemester'}
                    onChange={handleChangePersonal}
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
                    checked={personalDetails.semester === 'VIsemester'}
                    onChange={handleChangePersonal}
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
                    checked={personalDetails.hostel === 'yes'}
                    onChange={handleChangePersonal}
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
                    checked={personalDetails.hostel === 'no'}
                    onChange={handleChangePersonal}
                    required
                  />
                  <label htmlFor="hostelNo" className=' form-radio ml-2 text-lg'> No</label>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10 rounded-xl">
           
            <div>
              <label className="block mb-1">Register No.:</label>
              <input
                type="text"
                name="registerNo"
                value={personalDetails.registerNo}
                onChange={handleChangePersonal}
                className="w-72 p-2 border rounded-md text-slate-950"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={personalDetails.name}
                onChange={handleChangePersonal}
                className="w-72 p-2 border rounded-md text-slate-950"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Department:</label>
              <input
                type="text"
                name="dept"
                value={personalDetails.dept}
                onChange={handleChangePersonal}
                className="w-72 p-2 border rounded-md text-slate-950"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Section</label>
              <input
                type="text"
                name="section"
                value={personalDetails.section}
                onChange={handleChangePersonal}
                className="w-72 p-2 border rounded-md text-slate-950"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Last Time Credited Amount:</label>
              <input
                type="text"
                name="lastCreditedAmount"
                value={personalDetails.lastCreditedAmount}
                onChange={handleChangePersonal}
                className="w-72 p-2 border rounded-md text-slate-950"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl">

            <div>
              <label className="block mb-1">Special Category:</label>
              <select
                name="specialCategory"
                value={personalDetails.specialCategory}
                onChange={handleChangePersonal}
                className="w-48 p-2 border rounded-md text-slate-950"
                required
              >
                <option value="">Select</option>
                <option value="none">None</option>
                <option value="muaddin">Mu-addin</option>
                <option value="hazrath">Hazrath</option>
                <option value="fatherMotherSeparated">Father & Mother Separated</option>
                <option value="fatherExpired">Father Expired</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Religion:</label>
              <select
                name="religion"
                value={personalDetails.religion}
                onChange={handleChangePersonal}
                className="w-48 p-2 border rounded-md text-slate-950"
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
                value={personalDetails.community}
                onChange={handleChangePersonal}
                className="w-48 p-2 border rounded-md text-slate-950"
                required
              >
                <option value="">Select</option>
                <option value="MBC">MBC</option>
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
                value={personalDetails.mobileNo}
                onChange={handleChangePersonal}
                className="w-48 p-2 border rounded-md text-slate-950"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Email Id:</label>
              <input
                type="email"
                name="emailId"
                value={personalDetails.emailId}
                onChange={handleChangePersonal}
                className="w-48 p-2 border rounded-md text-slate-950"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Aadhar no:</label>
              <input
                type="text"
                name="aadhar"
                 maxlength="12"
                value={personalDetails.aadhar}
                onChange={handleChangePersonal}
                className="w-48 p-2 border rounded-md text-slate-950"
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
                value={personalDetails.fatherName}
                onChange={handleChangePersonal}
                className="w-72  p-2 border rounded-md text-slate-950"
                required
              />
                        
              <label className="block mb-1">Father's Contact No.:</label>
              <input
                type="text"
                name="fatherNo"
                value={personalDetails.fatherNo}
                onChange={handleChangePersonal}
                className="w-72  p-2 border rounded-md text-slate-950"
                required
              />
            
            
              <label className="block mb-1">Father's Occupation:</label>
              <input
                type="text"
                name="fatherOccupation"
                value={personalDetails.fatherOccupation}
                onChange={handleChangePersonal}
                className="w-72  p-2 border rounded-md text-slate-950"
                required
              />
            
            
              <label className="block mb-1">Annual Income:</label>
              <input
                type="text"
                name="annualIncome"
                value={personalDetails.annualIncome}
                onChange={handleChangePersonal}
                className="w-72  p-2 border rounded-md text-slate-950"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Permanent Address</label>
              <input
                type="text"
                name="address"
                value={personalDetails.address}
                onChange={handleChangePersonal}
                className="w-72  p-2 border rounded-md text-slate-950"
                placeholder='Door No & Street'
                required
              />
               <label className="block mb-1">State:</label>
              <select
                name="state"
                value={personalDetails.state}
                onChange={handleChangePersonal}
                className="w-72  p-2 border rounded-md text-slate-950"
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
                value={personalDetails.district}
                onChange={handleChangePersonal}
                className="w-72  p-2 border rounded-md text-slate-950"
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
                value={personalDetails.pin}
                onChange={handleChangePersonal}
                className="w-72  p-2 border rounded-md text-slate-950"
                placeholder='Pincode'
                required
              />
          
            </div>  
          </div>
          {/* Education Details section */}
          <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Education Details</h3>
          <div>
            <div className='pt-3'>
              <table className="w-full ">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Semester</th>
                    <th className="border px-4 py-2">Mark</th>
                    <th className="border px-4 py-2">Maximum Mark</th>
                    <th className="border px-4 py-2">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {educationDetails.semesters.map((semester, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">
                        <input
                          type="text"
                          name="semester"
                          value={semester.semester}
                          onChange={(e) => handleChangeEducation(e, index)}
                          className="w-full border rounded-md p-2 text-slate-950"
                          required
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="text"
                          name="mark"
                          value={semester.mark}
                          onChange={(e) => handleChangeEducation(e, index)}
                          className="w-full border rounded-md p-2 text-slate-950"
                          required
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="text"
                          name="maximumMark"
                          value={semester.maximumMark}
                          onChange={(e) => handleChangeEducation(e, index)}
                          className="w-full border rounded-md p-2 text-slate-950"
                          required
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="text"
                          name="percentage"
                          value={semester.percentage}
                          onChange={(e) => handleChangeEducation(e, index)}
                          className="w-full border rounded-md p-2 text-slate-950"
                          required
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={addSemesterRow}
                className="bg-blue-500 text-white py-2 px-4 rounded-md "
              >
                Add Semester
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10 rounded-xl">
              
              <div>
                <label className="block mb-1">Class Attendance:</label>
                <input
                  type="text"
                  name="classAttendance"
                  value={educationDetails.classAttendance}
                  onChange={handleChangeAdditional}
                  className="w-72 p-2 border rounded-md text-slate-950"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Deeniyath Education Days:</label>
                <input
                  type="text"
                  name="deeniyathEducationDays"
                  value={educationDetails.deeniyathEducationDays}
                  onChange={handleChangeAdditional}
                  className="w-72 p-2 border rounded-md text-slate-950"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Do you have arrear (fill No. of Peppers if no arrear put '0'):</label>
                <input
                  type="text"
                  name="arrear"
                  value={educationDetails.arrear}
                  onChange={handleChangeAdditional}
                  className="w-72  p-2 border rounded-md text-slate-950"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Siblings:</label>
                <input
                  type="text"
                  name="siblings"
                  value={educationDetails.siblings}
                  onChange={handleChangeAdditional}
                  className="w-72 p-2 border rounded-md text-slate-950"
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
