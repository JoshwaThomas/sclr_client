import React, { useState } from 'react';

const ScholarshipForm = () => {
  const [personalDetails, setPersonalDetails] = useState({
    ugOrPg: '',
    semester: '',
    name: '',
    registerNo: '',
    dept: '',
    gender: '',
    address: '',
    permanentAddress: '',
    specialCategory: '',
    hostel: '',
    mobileNo: '',
    emailId: '',
    fatherName: '',
    fatherNo: '',
    fatherOccupation: '',
    annualIncome: '',
    fresherOrRenewal: '',
    lastCreditedAmount: ''
  });

  const [educationDetails, setEducationDetails] = useState({
    semesters: [
      { semester: '', mark: '', maximumMark: '', percentage: '' }
    ]
  });

  const [isPermanentAddressSame, setIsPermanentAddressSame] = useState(false);

  const handleChangePersonal = (e) => {
    const { name, value } = e.target;
    setPersonalDetails({
      ...personalDetails,
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

  const handleAddressChange = (e) => {
    const { value } = e.target;
    setPersonalDetails({
      ...personalDetails,
      address: value,
      permanentAddress: isPermanentAddressSame ? value : personalDetails.permanentAddress
    });
  };

  const togglePermanentAddress = () => {
    setIsPermanentAddressSame(!isPermanentAddressSame);
    if (!isPermanentAddressSame) {
      setPersonalDetails({
        ...personalDetails,
        permanentAddress: personalDetails.address
      });
    } else {
      setPersonalDetails({
        ...personalDetails,
        permanentAddress: ''
      });
    }
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
          <div className=' text-white '>
            <div>
              <h3 className="text-xl mb-2 font-bold bg-yellow-300 p-2">Application</h3>

              <div className="space-x-4 inline-flex">
                <div>
                  <input
                    type="radio"
                    id="Fresher"
                    name="fresherOrRenewal"
                    value="fresher"
                    checked={personalDetails.fresherOrRenewal === 'fresher'}
                    onChange={handleChangePersonal}
                    required
                  />
                  <label htmlFor="Fresher">Fresher</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Renewal"
                    name="fresherOrRenewal"
                    value="renewal"
                    checked={personalDetails.fresherOrRenewal === 'renewal'}
                    onChange={handleChangePersonal}
                    required
                  />
                  <label htmlFor="Renewal">Renewal</label>
                </div>
              </div>
            </div>
            <h3 className="text-xl mb-2 font-bold bg-yellow-300 p-2 mt-7">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">UG or PG:</label>
                <div className="space-x-4 inline-flex">
                  <div>
                    <input
                      type="radio"
                      id="Ug"
                      name="ugOrPg"
                      value="ug"
                      checked={personalDetails.ugOrPg === 'ug'}
                      onChange={handleChangePersonal}
                      required
                    />
                    <label htmlFor="Ug"> UG</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Pg"
                      name="ugOrPg"
                      value="pg"
                      checked={personalDetails.ugOrPg === 'pg'}
                      onChange={handleChangePersonal}
                      required
                    />
                    <label htmlFor="Pg"> PG</label>
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
                      checked={personalDetails.semester === 'Isemester'}
                      onChange={handleChangePersonal}
                      required
                    />
                    <label htmlFor="ISemester"> I Semester</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="IISemester"
                      name="semester"
                      value="IIsemester"
                      checked={personalDetails.semester === 'IIsemester'}
                      onChange={handleChangePersonal}
                      required
                    />
                    <label htmlFor="IISemester"> II Semester</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="IIISemester"
                      name="semester"
                      value="IIIsemester"
                      checked={personalDetails.semester === 'IIIsemester'}
                      onChange={handleChangePersonal}
                      required
                    />
                    <label htmlFor="IIISemester"> III Semester</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="IVSemester"
                      name="semester"
                      value="IVsemester"
                      checked={personalDetails.semester === 'IVsemester'}
                      onChange={handleChangePersonal}
                      required
                    />
                    <label htmlFor="IVSemester"> IV Semester</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="VSemester"
                      name="semester"
                      value="Vsemester"
                      checked={personalDetails.semester === 'Vsemester'}
                      onChange={handleChangePersonal}
                      required
                    />
                    <label htmlFor="VSemester"> V Semester</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="VIsemester"
                      name="semester"
                      value="VIsemester"
                      checked={personalDetails.semester === 'VIsemester'}
                      onChange={handleChangePersonal}
                      required
                    />
                    <label htmlFor="VISemester"> VI Semester</label>
                  </div>
                </div>
              </div>
              {personalDetails.fresherOrRenewal === 'renewal' && (
                <div>
                  <label className="block mb-1">Last Time Credited Amount:</label>
                  <input
                    type="text"
                    name="lastCreditedAmount"
                    value={personalDetails.lastCreditedAmount}
                    onChange={handleChangePersonal}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block mb-1">Register No.:</label>
                <input
                  type="text"
                  name="registerNo"
                  value={personalDetails.registerNo}
                  onChange={handleChangePersonal}
                  className="w-full p-2 border rounded-md"
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
                  className="w-full p-2 border rounded-md"
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
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Gender:</label>
                <div className="space-x-4 inline-flex">
                  <div>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="Male"
                      checked={personalDetails.gender === 'Male'}
                      onChange={handleChangePersonal}
                      required
                    />
                    <label htmlFor="male"> Male</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="Female"
                      checked={personalDetails.gender === 'Female'}
                      onChange={handleChangePersonal}
                      required
                    />
                    <label htmlFor="female"> Female</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      value="Other"
                      checked={personalDetails.gender === 'Other'}
                      onChange={handleChangePersonal}
                      required
                    />
                    <label htmlFor="other"> Other</label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-1">Special Category:</label>
                <select
                  name="specialCategory"
                  value={personalDetails.specialCategory}
                  onChange={handleChangePersonal}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select</option>
                  <option value="muaddin">Mu-addin</option>
                  <option value="hazrath">Hazrath</option>
                  <option value="fatherMotherSeparated">Father & Mother Separated</option>
                  <option value="fatherExpired">Father Expired</option>
                </select>
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
                      checked={personalDetails.hostel === 'yes'}
                      onChange={handleChangePersonal}
                      required
                    />
                    <label htmlFor="hostelYes"> Yes</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="hostelNo"
                      name="hostel"
                      value="no"
                      checked={personalDetails.hostel === 'no'}
                      onChange={handleChangePersonal}
                      required
                    />
                    <label htmlFor="hostelNo"> No</label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-1">Mobile No.:</label>
                <input
                  type="text"
                  name="mobileNo"
                  value={personalDetails.mobileNo}
                  onChange={handleChangePersonal}
                  className="w-full p-2 border rounded-md"
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
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Father's Name:</label>
                <input
                  type="text"
                  name="fatherName"
                  value={personalDetails.fatherName}
                  onChange={handleChangePersonal}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Father's Contact No.:</label>
                <input
                  type="text"
                  name="fatherNo"
                  value={personalDetails.fatherNo}
                  onChange={handleChangePersonal}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Father's Occupation:</label>
                <input
                  type="text"
                  name="fatherOccupation"
                  value={personalDetails.fatherOccupation}
                  onChange={handleChangePersonal}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Annual Income:</label>
                <input
                  type="text"
                  name="annualIncome"
                  value={personalDetails.annualIncome}
                  onChange={handleChangePersonal}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Current Address:</label>
                <textarea
                  name="address"
                  value={personalDetails.address}
                  onChange={handleAddressChange}
                  className="w-full p-2 border rounded-md"
                  required
                ></textarea>
              </div>
              <div>

                {!isPermanentAddressSame && (
                  <div>
                    <label className="block mb-1">Permanent Address:</label>
                    <textarea
                      name="permanentAddress"
                      value={personalDetails.permanentAddress}
                      onChange={handleChangePersonal}
                      className="w-full p-2 border rounded-md"
                      required
                    ></textarea>
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isPermanentAddressSame}
                  onChange={togglePermanentAddress}
                  className="mr-2"
                />
                <label>Permanent address same as current address</label>
              </div>
            </div>
            {/* Education Details section */}
            <h3 className="text-xl mb-2 font-bold bg-yellow-300 p-2 mt-7">Education Details</h3>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Last School Name:</label>
                  <input
                    type="text"
                    name="lastSchoolName"
                    value={educationDetails.lastSchoolName}
                    onChange={handleChangeEducation}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Year of Passing:</label>
                  <input
                    type="text"
                    name="yearOfPassing"
                    value={educationDetails.yearOfPassing}
                    onChange={handleChangeEducation}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Maximum Mark:</label>
                  <input
                    type="text"
                    name="maximumMark"
                    value={educationDetails.maximumMark}
                    onChange={handleChangeEducation}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Marks Secured:</label>
                  <input
                    type="text"
                    name="marksSecured"
                    value={educationDetails.marksSecured}
                    onChange={handleChangeEducation}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Percentage of Mark:</label>
                  <input
                    type="text"
                    name="percentageOfMark"
                    value={educationDetails.percentageOfMark}
                    onChange={handleChangeEducation}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
              </div>
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
                            className="w-full border rounded-md p-2"
                            required
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <input
                            type="text"
                            name="mark"
                            value={semester.mark}
                            onChange={(e) => handleChangeEducation(e, index)}
                            className="w-full border rounded-md p-2"
                            required
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <input
                            type="text"
                            name="maximumMark"
                            value={semester.maximumMark}
                            onChange={(e) => handleChangeEducation(e, index)}
                            className="w-full border rounded-md p-2"
                            required
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <input
                            type="text"
                            name="percentage"
                            value={semester.percentage}
                            onChange={(e) => handleChangeEducation(e, index)}
                            className="w-full border rounded-md p-2"
                            required
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={addSemesterRow}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Add Semester
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Class Attendance:</label>
                <input
                  type="text"
                  name="classAttendance"
                  value={educationDetails.classAttendance}
                  onChange={handleChangeEducation}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Deeniyath Education Days:</label>
                <input
                  type="text"
                  name="deeniyathEducationDays"
                  value={educationDetails.deeniyathEducationDays}
                  onChange={handleChangeEducation}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Brothers:</label>
                <input
                  type="text"
                  name="brothers"
                  value={educationDetails.brothers}
                  onChange={handleChangeEducation}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Sisters:</label>
                <input
                  type="text"
                  name="sisters"
                  value={educationDetails.sisters}
                  onChange={handleChangeEducation}
                  className="w-full p-2 border rounded-md"
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
