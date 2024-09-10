import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// const apiUrl = process.env.REACT_APP_API_URL;

const ScholarshipForm = () => {

  const { staffId } = useParams();
  const [student, setStudent] = useState(null);
  const [deeniyath, setDeeniyath] = useState();
  const [ugOrPg, setUgOrPg] = useState('')
  const [semester, setSemester] = useState('')
  const [name, setName] = useState('')
  const [registerNo, setRegisterNo] = useState('')
  const [dept, setDept] = useState('')
  const [section, setSection] = useState('')
  const [religion, setReligion] = useState('')
  const [procategory, setProcategory] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [district, setDistrict] = useState('')
  const [pin, setPin] = useState('')
  const [specialCategory, setSpecialCategory] = useState('')
  // const [community, setCommunity] = useState('')
  const [hostel, setHostel] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  // const [emailId, setEmailId] = useState()
  const [aadhar, setAadhar] = useState()
  const [fatherName, setFatherName] = useState('')
  const [fatherNo, setFatherNo] = useState('')
  const [fatherOccupation, setFatherOccupation] = useState('')
  const [annualIncome, setAnnualIncome] = useState('')
  // const [preSemester, setPreSemester] = useState('')
  // const [maxMark, setMaxMark] = useState('')
  // const [mark, setMark] = useState('')
  // const [semPercentage, setSemPercentage] = useState('')
  // const [deeniyathEducationDays, setDeeniyathEducationDays] = useState('')
  // const [deeniyathPer, setDeeniyathPer] = useState('')
  // const [classAttendance, setClassAttendance] = useState('')
  // const [classAttendancePer, setClassAttendancePer] = useState('')
  // const [classMaxAttendance, setClassMaxAttendance] = useState('')
  // const [deeniyathMaxDays, setDeeniyathMaxDays] = useState('')
  const [lastCreditedAmt, setLastCreditedAmt] = useState('')
  // const [arrear, setArrear] = useState('')
  const [siblings, setSiblings] = useState('')
  const [siblingsNo, setSiblingsNo] = useState()
  const [siblingsOccupation, setSiblingsOccupation] = useState()
  const [siblingsIncome, setSiblingsIncome] = useState()
  const [showPopup, setShowPopup] = useState(true);
  const [jamath, setJamath] = useState("");

  // useEffect(() => {
  //   const calculateSemPercentage = () => {
  //     if (mark && maxMark) {
  //       const percentage = (parseFloat(mark) / parseFloat(maxMark)) * 100;
  //       setSemPercentage(percentage.toFixed(2));
  //     } else {
  //       setSemPercentage('');
  //     }
  //   };

  //   calculateSemPercentage();
  // }, [mark, maxMark]);

  // useEffect(() => {
  //   const calculateDeeniyathPercentage = () => {
  //     if (deeniyathEducationDays && deeniyathMaxDays) {
  //       const percentage = (parseFloat(deeniyathEducationDays) / parseFloat(deeniyathMaxDays)) * 100;
  //       setDeeniyathPer(percentage.toFixed(2));
  //     } else {
  //       setDeeniyathPer('');
  //     }
  //   };

  //   calculateDeeniyathPercentage();
  // }, [deeniyathEducationDays, deeniyathMaxDays]);

  // useEffect(() => {
  //   const calculateClassAttendancePercentage = () => {
  //     if (classAttendance && classMaxAttendance) {
  //       const percentage = (parseFloat(classAttendance) / parseFloat(classMaxAttendance)) * 100;
  //       setClassAttendancePer(percentage.toFixed(2));
  //     } else {
  //       setClassAttendancePer('');
  //     }
  //   };

  //   calculateClassAttendancePercentage();
  // }, [classAttendance, classMaxAttendance]);

  //pop display close
  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchData = async () => {
        if (!staffId) return; // Ensure staffId (registerNo) is provided

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            console.log('API URL:', apiUrl); // Log base URL

            const result = await axios.get(`${apiUrl}/api/admin/students`, {
                params: {
                    registerNo: staffId.toUpperCase() // Use staffId as registerNo
                }
            });

            console.log('API response:', result.data);

            setStudent(result.data);
            setRegisterNo(result.data.registerNo);
            setMobileNo(result.data.mobileNo);
            setName(result.data.name);
            setDept(result.data.dept);
            setSection(result.data.section);
            setReligion(result.data.religion);
            setAadhar(result.data.aadhar);
            setFatherName(result.data.fatherName);
            setFatherNo(result.data.fatherNo);
            setFatherOccupation(result.data.fatherOccupation);
            setAnnualIncome(result.data.annualIncome);
            setAddress(result.data.address);
            setState(result.data.state);
            setDistrict(result.data.district);
            setPin(result.data.pin);
            setSiblings(result.data.siblings);
            setSiblingsNo(result.data.siblingsNo);
            setSiblingsOccupation(result.data.siblingsOccupation);
            setSiblingsIncome(result.data.siblingsIncome);
            setDeeniyath(result.data.deeniyath);
            setLastCreditedAmt(result.data.scholamt);
        } catch (err) {
            console.error('Error fetching student data:', err.response ? err.response.data : err);
            setStudent(null);
            alert('Student not found');
        }
    };

    fetchData(); 
}, [staffId]); 


  // const handleData = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const apiUrl = process.env.REACT_APP_API_URL;
  //     console.log('API URL:', apiUrl); // Check that this outputs the correct base URL
  
  //     const result = await axios.get(`${apiUrl}/api/admin/students`, {
  //       params: {
  //         registerNo: registerNo.toUpperCase(),
  //         mobileNo: mobileNo
  //       }
  //     });
  
  //     console.log('API response:', result.data);
  
  //     setStudent(result.data);
  //     setName(result.data.name);
  //     setDept(result.data.dept);
  //     setSection(result.data.section);
  //     setReligion(result.data.religion);
  //     setAadhar(result.data.aadhar);
  //     setFatherName(result.data.fatherName);
  //     setFatherNo(result.data.fatherNo);
  //     setFatherOccupation(result.data.fatherOccupation);
  //     setAnnualIncome(result.data.annualIncome);
  //     setAddress(result.data.address);
  //     setState(result.data.state);
  //     setDistrict(result.data.district);
  //     setPin(result.data.pin);
  //     setSiblings(result.data.siblings);
  //     setSiblingsNo(result.data.siblingsNo);
  //     setSiblingsOccupation(result.data.siblingsOccupation);
  //     setSiblingsIncome(result.data.siblingsIncome);
  //     setDeeniyath(result.data.deeniyath);
  //     setLastCreditedAmt(result.data.scholamt);
  
  //   } catch (err) {
  //     console.error('Error fetching student data:', err.response ? err.response.data : err); // Log the error
  //     setStudent(null);
  //     alert('Student not found');
  //   }
  // };




  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get('http://localhost:3001/api/admin/current-acyear')
      .then(response => {
        if (response.data.success) {
          const acyear = response.data.acyear.acyear;
          console.log("deeniyath:", deeniyath)
          const formData = new FormData();
          formData.append("deeniyath", deeniyath);
          formData.append("ugOrPg", ugOrPg);
          formData.append("semester", semester);
          formData.append("name", name);
          formData.append("registerNo", registerNo);
          formData.append("dept", dept);
          formData.append("section", section);
          formData.append("religion", religion);
          formData.append("procategory", procategory);
          formData.append("address", address);
          formData.append("district", district);
          formData.append("state", state);
          formData.append("pin", pin);
          formData.append("specialCategory", specialCategory);
          formData.append("aadhar", aadhar);
          formData.append("hostel", hostel);
          formData.append("mobileNo", mobileNo);
          formData.append("fatherName", fatherName);
          formData.append("fatherNo", fatherNo);
          formData.append("fatherOccupation", fatherOccupation);
          formData.append("annualIncome", annualIncome);
          formData.append("siblings", siblings);
          formData.append("siblingsNo", siblingsNo);
          formData.append("siblingsOccupation", siblingsOccupation);
          formData.append("siblingsIncome", siblingsIncome);
          formData.append("acyear", acyear);
          formData.append("lastCreditedAmt", lastCreditedAmt)
          formData.append("jamath", jamath);

          axios
          .post("http://localhost:3001/renewal", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then(result => {
            if (result.data.success) {
              window.alert("Your Application Submitted Successfully");
              console.log(result);
              setTimeout(() => {
                window.location.reload();
              }, 6000);
            } else if (result.data.message === 'Register No. Already Existing') {
              alert("Register No. Already Existing");
            } else if (result.data.message === 'Already You Applied Fresher Application') {
              alert("Already You Applied");
            }  
            else if (result.data.message === 'Already You Applied Renewal Application') {
              alert("Already You Applied");
            }  
            else {
              console.error('Backend error:', result.data.error);
              alert('Something went wrong: ' + result.data.error.message || 'Unknown error');
            }
          })
          .catch(err => {
            console.error('Error posting data:', err);
            window.alert("Something Went Wrong");
          });
          } else {
          console.error('Failed to fetch current academic year');
          window.alert('Failed to fetch current academic year');
        }
      })
      .catch(error => {
        console.error('Error fetching current academic year:', error);
        window.alert('Error fetching current academic year');
      });

    // const formData = {
    //   ...fresherOrRenewal
    // };
    // console.log(formData);
    // Here you can send the formData to the server or perform other actions
  };




  return (
    <div>
      <div className="container mx-auto p-8">
        {/* Regno put and get the data */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='  '>
            <div>
              <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 text-white">Renewal Application</h3>

              <div className="space-x-4 inline-flex border p-10 rounded-xl">
                <div>
                  <label className="block mb-1">Special Category:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                  <select
                    name="specialCategory"
                    value={specialCategory}
                    onChange={(e) => setSpecialCategory(e.target.value)}
                    className="w-48 p-2 border  rounded-md text-slate-950"
                    required
                  >
                    <option value="">Select</option>
                    <option value="General">General</option>
                    <option value="Muaddin">Mu-addin</option>
                    <option value="Hazrath">Hazrath</option>
                    <option value="FatherMotherSeparated">Father & Mother Separated</option>
                    <option value="FatherExpired">Father Expired</option>
                    <option value="Singleparent">Single Parent</option>
                    <option value="Orphan">Orphan</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10 rounded-xl">
            <div>
              <label className="block mb-1">UG or PG:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <div className="space-x-4 inline-flex">
                <div>
                  <input
                    type="radio"
                    id="Ug"
                    name="ugOrPg"
                    value="UG"
                    className=' scale-200'
                    checked={ugOrPg === 'UG'}
                    onChange={(e) => setUgOrPg(e.target.value)}
                    required
                  />
                  <label htmlFor="UG" className=' form-radio ml-2 text-lg'> UG</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Pg"
                    name="ugOrPg"
                    value="PG"
                    className=' scale-200'
                    checked={ugOrPg === 'PG'}
                    onChange={(e) => setUgOrPg(e.target.value)}
                    required
                  />
                  <label htmlFor="PG" className=' form-radio ml-2 text-lg'> PG</label>
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-1">Programme  Stream:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <div className="space-x-4 inline-flex">
                <div>
                  <input
                    type="radio"
                    id="aided"
                    name="procategory"
                    value="Aided"
                    className=' scale-200'
                    checked={procategory === 'Aided'}
                    onChange={(e) => setProcategory(e.target.value)}
                    required
                  />
                  <label className=' form-radio ml-2 text-lg'> Aided</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="sfmens"
                    name="procategory"
                    value="SFM"
                    className=' scale-200'
                    checked={procategory === 'SFM'}
                    onChange={(e) => setProcategory(e.target.value)}
                    required
                  />
                  <label className=' form-radio ml-2 text-lg' > SFM</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="sfwomens"
                    name="procategory"
                    value="SFW"
                    className=' scale-200'
                    checked={procategory === 'SFW'}
                    onChange={(e) => setProcategory(e.target.value)}
                    required
                  />
                  <label htmlFor="SFW" className=' form-radio ml-2 text-lg'>SFW </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-1">Semester:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <div className="space-x-4 inline-flex">
                <div>
                  <input
                    type="radio"
                    id="ISemester"
                    name="semester"
                    value="I"
                    className=' scale-200'
                    checked={semester === 'I'}
                    onChange={(e) => setSemester(e.target.value)}
                    required
                  />
                  <label htmlFor="I" className=' form-radio ml-2 text-lg'> I </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="IISemester"
                    name="semester"
                    value="II"
                    className=' scale-200'
                    checked={semester === 'II'}
                    onChange={(e) => setSemester(e.target.value)}
                    required
                  />
                  <label htmlFor="II" className=' form-radio ml-2 text-lg'> II </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="IIISemester"
                    name="semester"
                    value="III"
                    className=' scale-200'
                    checked={semester === 'III'}
                    onChange={(e) => setSemester(e.target.value)}
                    required
                  />
                  <label htmlFor="III" className=' form-radio ml-2 text-lg'> III </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="IVSemester"
                    name="semester"
                    value="IV"
                    className=' scale-200'
                    checked={semester === 'IV'}
                    onChange={(e) => setSemester(e.target.value)}
                    required
                  />
                  <label htmlFor="IV Semester" className=' form-radio ml-2 text-lg'> IV </label>
                </div>
                {ugOrPg !== 'PG' && (
                  <div>
                    <div>
                      <input
                        type="radio"
                        id="V"
                        name="semester"
                        value="V "
                        className=" scale-200"
                        checked={semester === "V "}
                        onChange={(e) => setSemester(e.target.value)}
                        required
                      />
                      <label htmlFor="V" className=" form-radio ml-2 text-lg">

                        V
                      </label>
                  
                      <input
                        type="radio"
                        id="VI"
                        name="semester"
                        value="VI "
                        className=" ml-4 scale-200"
                        checked={semester === "VI "}
                        onChange={(e) => setSemester(e.target.value)}
                        required
                      />
                      <label htmlFor="VI" className=" form-radio ml-2 text-lg">

                        VI
                      </label>
                    </div>
                  </div>
                )
                }
              </div>
            </div>
            <div>
              <label className="block mb-1">Hostel:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <div className="space-x-4 inline-flex">
                <div>
                  <input
                    type="radio"
                    id="hostelYes"
                    name="hostel"
                    value="YES"
                    className=' scale-200'
                    checked={hostel === 'YES'}
                    onChange={(e) => setHostel(e.target.value)}
                    required
                  />
                  <label htmlFor="hostelYes" className=' form-radio ml-2 text-lg'> Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="hostelNo"
                    name="hostel"
                    value="NO"
                    className=' scale-200'
                    checked={hostel === 'NO'}
                    onChange={(e) => setHostel(e.target.value)}
                    required
                  />
                  <label htmlFor="hostelNo" className=' form-radio ml-2 text-lg'> No</label>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-1 md:grid-cols-4 gap-4 border p-10 rounded-xl">
            <div>
              <label className="block mb-1">Register No:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type="text"
                id="registerNo"
                name="registerNo"
                value={registerNo}
                onChange={(e) => setRegisterNo(e.target.value)}

                className="w-52 p-2 uppercase border rounded-md text-slate-950"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Mobile No:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type="text"
                maxLength="10"
                id="mobileNo"
                name="mobileNo"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}

                className="w-52 p-2 uppercase border rounded-md text-slate-950"
                required
              />
            </div>
            {/* <div>
              <button onClick={handleData} className='bg-blue-500 text-white py-2 px-6 -ml-2 hover:bg-black rounded-lg mt-7'>
                Get</button>
            </div> */}

          </div>
          {student && (
            <div>
              <div className='grid grid-rows-1 md:grid-cols-3 gap-4 border  p-10 rounded-xl'>
                <div>
                  <label className="block mb-1">Name:</label>
                  <input
                    type="text"
                    name="name"

                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-72 p-2 uppercase border rounded-md text-slate-950"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block mb-1">Department:</label>
                  <select
                    name="dept"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="w-72 p-2 border  rounded-md text-slate-950"
                    required
                    readOnly
                  >
                    <option value="">Select</option>
                    <option value="UAR">UAR</option>
                    <option value="UBA">UBA</option>
                    <option value="UBO">UBO</option>
                    <option value="UBT">UBT</option>
                    <option value="UCO">UCO</option>
                    <option value="UCH">UCH</option>
                    <option value="UCA">UCA</option>
                    <option value="UCS">UCS</option>
                    <option value="UEC">UEC</option>
                    <option value="UEN">UEN</option>
                    <option value="UFT">UFT</option>
                    <option value="UHS">UHS</option>
                    <option value="UHM">UHM</option>
                    <option value="UIT">UIT</option>
                    <option value="UMA">UMA</option>
                    <option value="UMB">UMB</option>
                    <option value="UND">UND</option>
                    <option value="UPH">UPH</option>
                    <option value="UTA">UTA</option>
                    <option value="UVC">UVC</option>
                    <option value="UZO">UZO</option>
                    <option value="PAR">PAR</option>
                    <option value="PBO">PBO</option>
                    <option value="PBT">PBT</option>
                    <option value="PCO">PCO</option>
                    <option value="PCH">PCH</option>
                    <option value="PCS">PCS</option>
                    <option value="PEC">PEC</option>
                    <option value="PEN">PEN</option>
                    <option value="PFT">PFT</option>
                    <option value="PHS">PHS</option>
                    <option value="PIT">PIT</option>
                    <option value="PMA">PMA</option>
                    <option value="PMB">PMB</option>
                    <option value="PND">PND</option>
                    <option value="PPH">PPH</option>
                    <option value="PTA">PTA</option>
                    <option value="PZO">PZO</option>
                    <option value="MBA">MBA</option>
                    <option value="MCA">MCA</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Section</label>
                  <select
                    name="section"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                    required
                    readOnly
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 mt-4 rounded-xl">

                <div>
                  <label className="block mb-1">Religion:</label>
                  <select
                    name="religion"
                    value={religion}
                    onChange={(e) => setReligion(e.target.value)}
                    className="w-48  md:w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                    required
                  >
                    <option value="">Select</option>
                    <option value="ISLAM">Islam</option>
                    <option value="HINDU">Hindu</option>
                    <option value="CHRISTIAN">Christian</option>
                    <option value="OTHERS">Others</option>
                  </select>
                </div>
                {/* <div>
                  <label className="block mb-1">Community:</label>
                  <select
                    name="community"
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    className="w-48 p-2 border rounded-md text-slate-950"
                    required
                  >
                    <option value="">Select</option>
                    <option value="MBC">MBC</option>
                    <option value="BCM">BCM</option>
                    <option value="BC">BC</option>
                    <option value="SC/ST">SC / ST</option>
                    <option value="Others">Others</option>
                  </select>
                </div> */}
                <div>
                  <label className="block mb-1 ">Last Time Credited Amount:</label>
                  <input
                    type="text"
                    name="lastCreditedAmount"
                    value={lastCreditedAmt}
                    onChange={(e) => setLastCreditedAmt(e.target.value)}
                    className="w-48 p-2 appearance-auto border rounded-md text-slate-950"
                    required
                    readOnly
                  />
                </div>
                {/* <div>
                  <label className="block mb-1">Email Id:</label>
                  <input
                    type="email"
                    name="emailId"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    className="w-48 p-2 border rounded-md text-slate-950"
                    required
                  />
                </div> */}

                <div>
                  <label className="block mb-1">Aadhar no:</label>
                  <input
                    type="text"
                    name="aadhar"
                    maxlength="12"
                    value={aadhar}
                    onChange={(e) => setAadhar(e.target.value)}
                    className="w-48 p-2 border rounded-md text-slate-950"
                    required
                    readOnly
                  />
                </div>
              </div>
              <div className="grid grid-rows-2 md:grid-cols-4 gap-4 border p-10 mt-5 rounded-xl">
                <div>
                  <label className="block mb-1 mt-6">Parent or Guardian Name:</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    className=" w-48  md:w-44 p-2 border rounded-md text-slate-950"
                    required
                    readOnly
                  />
                </div>
                <div>
                  <label className="block mb-1">Parent or Guardian Contact No.:</label>
                  <input
                    type="text"
                    name="fatherNo"
                    value={fatherNo}
                    onChange={(e) => setFatherNo(e.target.value)}
                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
                    required
                    readOnly
                  />
                </div>
                <div>
                  <label className="block mb-1">Parent or Guardian Occupation:</label>
                  <input
                    type="text"
                    name="fatherOccupation"
                    value={fatherOccupation}
                    onChange={(e) => setFatherOccupation(e.target.value)}
                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950 "
                    required

                  />
                </div>
                <div>


                  <label className="block mb-1 mt-6">Annual Income:</label>
                  <input
                    type="text"
                    name="annualIncome"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 ">Permanent Address</label>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
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
                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
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
                    <option value="Other">Others</option>
                  </select></div>
                <div>
                  <label className="block mb-1">District:</label>
                  <select
                    name="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
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
                    <option value="Other">Others</option>
                  </select></div>
                <div>
                  <label className="block mb-1">Pincode:</label>
                  <input
                    type="text"
                    maxlength="6"
                    name="pin"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
                    placeholder='Pincode'
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 -mt-4">Siblings:</label>
                  <input
                    type="text"
                    name="siblings"
                    value={siblings}
                    onChange={(e) => setSiblings(e.target.value)}
                    className=" w-44 p-2 border rounded-md text-slate-950"
                    required
                  />
                </div>
                {siblings === 'Yess' && (
                  <div>
                    <div>
                      <label className="block mb-1 -mt-4">Siblings:</label>
                      <input
                        type="text"
                        name="siblings"
                        value={siblingsNo}
                        onChange={(e) => setSiblingsNo(e.target.value)}
                        className=" w-44 p-2 border rounded-md text-slate-950"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 -mt-4">Siblings Occupation:</label>
                      <input
                        type="text"
                        name="siblings"
                        value={siblingsOccupation}
                        onChange={(e) => setSiblingsOccupation(e.target.value)}
                        className=" w-44 p-2 border rounded-md text-slate-950"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 -mt-4">Siblings Income:</label>
                      <input
                        type="text"
                        name="siblings"
                        value={siblingsIncome}
                        onChange={(e) => setSiblingsIncome(e.target.value)}
                        className=" w-44 p-2 border rounded-md text-slate-950"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Jamath section */}
                <div>
                  <label className="block mb-1 mt-2 w-auto">Jamath / Self Declaration Letter:</label>
                  <input
                    type="file"
                    name="jamath"
                    onChange={(e) => setJamath(e.target.files[0])}
                    className=" mt-1 border rounded-md p-2 text-slate-950"
                  />
                </div>

                {/* <div>
                <label className="block mb-1">No of Arrear<span className=' text-red-500 text-lg'><sup>*</sup></span>:</label>
                <input
                  type="text"
                  name="arrear"
                  value={arrear}
                  onChange={(e) => setArrear(e.target.value)}
                  className="w-44  p-2 border rounded-md text-slate-950"
                  required
                />
              </div> */}

              </div>
            </div>
          )}
          {/* Education Details section */}
          {/* <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Education Details</h3> */}
          <div>
            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border p-10 rounded-xl">
              <div>
                <label className="block mb-1">Semester:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                <input
                  type="text"
                  name="preSemester"
                  value={preSemester}
                  onChange={(e) => setPreSemester(e.target.value)}
                  className=" w-52 p-2 border rounded-md text-slate-950"

                />
              </div>
              <div>
                <label className="block mb-1">Mark (UG PartIII Only):<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                <input
                  type="text"
                  name="mark"
                  value={mark}
                  onChange={(e) => setMark(e.target.value)}
                  className="w-52 p-2 border rounded-md text-slate-950"

                />
              </div>
              <div>
                <label className="block mb-1">Maximum Mark (UG PartIII Only):<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                <input
                  type="text"
                  name="maxMark"
                  value={maxMark}
                  onChange={(e) => setMaxMark(e.target.value)}
                  className="w-52 p-2 border rounded-md text-slate-950"

                />
              </div>
              <div>
                <label className="block mb-1">Percentage of Mark:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                <input
                  type="text"
                  name="semPercentage"
                  value={semPercentage}
                  onChange={(e) => setSemPercentage(e.target.value)}
                  className=" w-52 p-2 border rounded-md text-slate-950"

                />
              </div>
              
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 mt-4 rounded-xl">

              <div>
                <label className="block mb-1">Class Attendance:</label>
                <input
                  type="text"
                  name="classAttendance"
                  value={classAttendance}
                  onChange={(e) => setClassAttendance(e.target.value)}
                  className="w-72 p-2 border rounded-md text-slate-950"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Class Max Attendance:</label>
                <input
                  type="text"
                  name="classMaxAttendance"
                  value={classMaxAttendance}
                  onChange={(e) => setClassMaxAttendance(e.target.value)}
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
                  onChange={(e) => setClassAttendancePer(e.target.value)}
                  className="w-92 p-2 border rounded-md text-slate-950"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Deeniyath Education Days:</label>
                <input
                  type="text"
                  name="deeniyathEducationDays"
                  value={deeniyathEducationDays}
                  onChange={(e) => setDeeniyathEducationDays(e.target.value)}
                  className="w-72 p-2 border rounded-md text-slate-950"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Deeniyath Max Days:</label>
                <input
                  type="text"
                  name="deeniyathMaxDays"
                  value={deeniyathMaxDays}
                  onChange={(e) => setDeeniyathMaxDays(e.target.value)}
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
                  onChange={(e) => setDeeniyathPer(e.target.value)}
                  className="w-92 p-2 border rounded-md text-slate-950"
                  required
                />
              </div>
            
              
            </div> */}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 "
            >
              Submit
            </button>

          </div>
        </form>


        {/* Instructions */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-red-400 w-2/4 h-96 rounded-lg shadow-lg overflow-auto p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Instructions</h2>
              <p className="mb-4">
                <span className="font-bold ">1. Register Number as Username</span> <br />
                <span className='ml-10'> Use your Register Number as the username. </span> <br />

                <span className="font-bold"> 2. Password Reminder: </span>  <br />
                <span className='ml-10'>Don't forget your password. Make a note of it, as the same login credentials will be
                  used for future references. </span>  <br />

                <span className="font-bold ">3. Mandatory Fields:</span>  <br />
                <span className='ml-10'>Fill in all the mandatory fields in the application form. </span>   <br />

                <span className="font-bold ">4. Check Application Status:</span>  <br />
                <span className='ml-10'>Students can check the status of the application by logging in with their credentials.  </span>
              </p>
              <div className="block relative">
                <button
                  onClick={closePopup}
                  className="bg-blue-500 absolute right-0 text-white py-2 px-4 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div >
    </div >
  );
};

export default ScholarshipForm;
