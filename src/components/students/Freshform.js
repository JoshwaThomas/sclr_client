import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PrintHeader from '../../assets/printHeader.jpg';


const ScholarshipForm = () => {

  // const navigate = useNavigate();

  // const [fresherOrRenewal, setFresherOrRenewal] = useState()
  const [deeniyath, setDeeniyath] = useState()
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
  // const [community, setCommunity] = useState()
  const [hostel, setHostel] = useState()
  const [mobileNo, setMobileNo] = useState()
  // const [emailId, setEmailId] = useState()
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
  const [siblingsNo, setSiblingsNo] = useState()
  const [siblingsOccupation, setSiblingsOccupation] = useState()
  const [siblingsIncome, setSiblingsIncome] = useState()
  // const [deeniyathEducationDays, setDeeniyathEducationDays] = useState()
  // const [deeniyathPer, setDeeniyathPer] = useState()
  // const [classAttendance, setClassAttendance] = useState()
  // const [classAttendancePer, setClassAttendancePer] = useState()
  const [maximumMarkSchool, setMaximumMarkSchool] = useState()
  // const [classMaxAttendance, setClassMaxAttendance] = useState()
  // const [deeniyathMaxDays, setDeeniyathMaxDays] = useState()
  // const [preSemester, setPreSemester] = useState()
  // const [maxMark, setMaxMark] = useState()
  // const [mark, setMark] = useState()
  // const [semPercentage, setSemPercentage] = useState()
  const [arrear, setArrear] = useState('')
  const [password, setPassword] = useState({ pass: '', conpass: '' })
  const [isConpassTyped, setIsConpassTyped] = useState(false);
  const [error, setError] = useState('');
  const [jamath, setJamath] = useState('')
  const [showPopup, setShowPopup] = useState(true);
  const [isPrint, setPrint] = useState(false)
  const [printData, setPrintData] = useState([]);



  useEffect(() => {
    const calculatePercentage = () => {
      if (maximumMarkSchool && marksSecuredSchool) {
        const percentage = (parseFloat(marksSecuredSchool) / parseFloat(maximumMarkSchool)) * 100;
        setPercentageOfMarkSchool(percentage.toFixed(2));
      } else {
        setPercentageOfMarkSchool('');
      }
    };

    calculatePercentage();
  }, [maximumMarkSchool, marksSecuredSchool]);

  useEffect(() => {
    if (isConpassTyped && password.pass !== password.conpass) {
      setError('Passwords do not match');
    } else {
      setError('');
    }
  }, [password, isConpassTyped]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));

    if (name === 'conpass') {
      setIsConpassTyped(true);
    }
  };

  //pop display close
  const closePopup = () => {
    setShowPopup(false);
  };


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

  const handlePrint = (e) => {
    const printContent = document.getElementById('print-section').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  }


  // const getCurrenYear = () => {

  // }


  const Submit = (e) => {

    e.preventDefault();

    // const currentYear = getCurrenYear();

    // Fetch current academic year first
    axios.get('http://localhost:3001/api/admin/current-acyear')
      // axios.get(`${process.env.APP_URI}/api/admin/current-acyear`)
      .then(response => {
        if (response.data.success) {
          const acyear = response.data.acyear.acyear;

          // Submit the form with academic year
          axios.post("http://localhost:3001/fresh", {
            deeniyath, ugOrPg, semester, name, registerNo, dept, section, religion, procategory, address, district, state, pin, specialCategory, aadhar,
            hostel, mobileNo, fatherName, fatherNo, fatherOccupation, annualIncome, schoolName,
            yearOfPassing, percentageOfMarkSchool, siblings, siblingsNo, siblingsOccupation, siblingsIncome, acyear, arrear, jamath
          })
            .then(result => {
              if (result.data.success) {
                window.alert("Your Application Submitted Successfully");
                setPrint(true);

              } else if (result.data.message === 'Register No. Already Existing') {
                alert("Register No. Already Existing");
              } else {
                alert('Something went wrong');
              }
            })
            .catch(err => {
              console.error('Error submitting application:', err);
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

    const newData = {
      ugOrPg, semester, name, registerNo, dept, section, religion, procategory, address, district, state, pin, specialCategory, aadhar,
      hostel, mobileNo, fatherName, fatherNo, fatherOccupation, annualIncome, schoolName,
      yearOfPassing, percentageOfMarkSchool, siblings,
    };
    setPrintData([...printData, newData]);

    setUgOrPg('');
    setSemester('');
    setName('');
    setRegisterNo('');
    setDept('');
    setProcategory('');
    setSpecialCategory('');
    setAddress('');
    setAadhar('');
    setDistrict('');
    setState('');
    setPin('');
    setHostel('');
    setMobileNo('');
    setFatherName('');
    setFatherNo('');
    setFatherOccupation('');
    setAnnualIncome('');
    setSchoolName('');
    setYearOfPassing('');
    setPercentageOfMarkSchool('');
    setSiblings('');


  };

  // const Submit = (e) => {
  //   e.preventDefault();

  //   axios.post("http://localhost:3001/fresh", {
  //     fresherOrRenewal, ugOrPg, semester, name, registerNo, dept, section, religion, procategory, address, district, state, pin, specialCategory,
  //     // community, emailId, aadhar,
  //      hostel, mobileNo, fatherName, fatherNo, fatherOccupation, annualIncome, schoolName,
  //     yearOfPassing, percentageOfMarkSchool, siblings, deeniyathPer, classAttendancePer, semPercentage, acyear: acyear
  //   })
  //     .then(result => {
  //       if (result.data.success) {
  //         window.alert("Your Application Submitted Successfully");
  //       }
  //       else if (result.data.message === 'Register No. Already Existing') {
  //         alert("Register No. Already Existing")
  //       }
  //       else {
  //         alert('Something went worng')
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       window.alert("Something Went Wrong");
  //     });

  //   const handleRadioChange = (e) => {
  //     setRadioValue(value);
  //     setAcceptreject('allar');
  // };

  return (
    <div>
      <div className="container mx-auto p-8">
        <form onSubmit={Submit} className="space-y-4" id="">
          <div className=' '>
            <div>
              <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">Fresher Application</h3>

              <div className="space-x-4 inline-flex border p-10 rounded-xl">
                {/* <div>
                  <input
                    type="radio"
                    id="Fresher"
                    name="fresherOrRenewal"
                    value="Fresher"
                    className=' scale-200'
                    checked={fresherOrRenewal === 'Fresher'}
                    onChange={(e) => setFresherOrRenewal(e.target.value)}
                    defaultChecked
                    required
                  />
                  <label htmlFor="Fresher" className=' form-radio ml-2 text-xl'>Fresher</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Renewal"
                    name="fresherOrRenewal"
                    value="Renewal"
                    className='scale-200'
                    checked={fresherOrRenewal === 'Renewal'}
                    onChange={(e) => setFresherOrRenewal(e.target.value)}
                    onClick={() => navigate('/student/application/renewal')}
                    required
                  />
                  <label htmlFor="Renewal" className=' form-radio ml-2 text-xl'>Renewal</label>
                </div> */}
                <div>
                  <label className="block mb-1">Special Category: <span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                  <select
                    name="specialCategory"
                    value={specialCategory}
                    onChange={(e) => setSpecialCategory(e.target.value)}
                    className="w-48  md:w-72 p-2 border rounded-md text-slate-950 lg:w-48"
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
                <div>
                  <label className="block mb-1">Education <span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                  <div className="space-x-4 inline-flex">
                    <div>
                      <input
                        type="radio"
                        id="Dyes"
                        name="deeniyath"
                        value="Yes"
                        className=' scale-200'
                        checked={deeniyath === 'Yes'}
                        onChange={(e) => setDeeniyath(e.target.value)}
                        required
                      />
                      <label htmlFor="Dyes" className=' form-radio ml-2 text-lg'> Deeniyath</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="DNo"
                        name="deeniyath"
                        value="No"
                        className=' scale-200'
                        checked={deeniyath === 'No'}
                        onChange={(e) => setDeeniyath(e.target.value)}
                        required
                      />
                      <label htmlFor="DNo" className=' form-radio ml-2 text-lg'> Moral </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Personal Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10 rounded-xl">

            <div>
              <label className="block mb-1">UG or PG: <span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <div className=" space-x-7 inline-flex">
                <div>
                  <input
                    type="radio"
                    id="UG"
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
                    id="PG"
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
              <label className="block mb-1">Programme Category <span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <div className="space-x-4 inline-flex">
                <div>
                  <input
                    type="radio"
                    id="Aided"
                    name="procategory"
                    value="Aided"
                    className=' scale-200'
                    checked={procategory === 'Aided'}
                    onChange={(e) => setProcategory(e.target.value)}
                    required
                  />
                  <label htmlFor="Aided" className=' form-radio ml-2 text-lg'> Aided</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="SFM"
                    name="procategory"
                    value="SFM"
                    className=' scale-200'
                    checked={procategory === 'SFM'}
                    onChange={(e) => setProcategory(e.target.value)}
                    required
                  />
                  <label htmlFor="SFM" className=' form-radio ml-2 text-lg'> SFM</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="SFW"
                    name="procategory"
                    value="SFW"
                    className=' scale-200'
                    checked={procategory === 'SFW'}
                    onChange={(e) => setProcategory(e.target.value)}
                    required
                  />
                  <label htmlFor="SFW" className=' form-radio ml-2 text-lg'> SFW </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-1">Semester:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <div className="space-x-4 inline-flex">
                <div>
                  <input
                    type="radio"
                    id="I"
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
                    id="II"
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
                    id="III"
                    name="semester"
                    value="III "
                    className=' scale-200'
                    checked={semester === 'III '}
                    onChange={(e) => setSemester(e.target.value)}
                    required
                  />
                  <label htmlFor="III" className=' form-radio ml-2 text-lg'> III </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="IV"
                    name="semester"
                    value="IV "
                    className=' scale-200'
                    checked={semester === 'IV '}
                    onChange={(e) => setSemester(e.target.value)}
                    required
                  />
                  <label htmlFor="IV" className=' form-radio ml-2 text-lg'> IV </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="V"
                    name="semester"
                    value="V "
                    className=' scale-200'
                    checked={semester === 'V '}
                    onChange={(e) => setSemester(e.target.value)}
                    required
                  />
                  <label htmlFor="V" className=' form-radio ml-2 text-lg'> V </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="VI"
                    name="semester"
                    value="VI "
                    className=' scale-200'
                    checked={semester === 'VI '}
                    onChange={(e) => setSemester(e.target.value)}
                    required
                  />
                  <label htmlFor="VI" className=' form-radio ml-2 text-lg'> VI </label>
                </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10  rounded-xl">
            <div>
              <label className="block mb-1">Register No.:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type="text"
                name="registerNo"
                value={registerNo}
                onChange={(e) => setRegisterNo(e.target.value.toUpperCase())}
                className=" w-48 md:w-72 p-2 border rounded-md text-slate-950"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Name:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
                className="w-48 md:w-72 p-2 border rounded-md text-slate-950"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Department:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <select
                name="dept"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="w-48 md:w-72 p-2 border  rounded-md text-slate-950"
                required
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
              <label className="block mb-1">Section <span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <select
                name="specialCategory"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className=" w-48 md:w-72 p-2 border rounded-md text-slate-950"

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
                onChange={(e) => setSpecialCategory(e.target.value)}
                className="w-48  md:w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                required
              >
                <option value="">Select</option>
                <option value="None">None</option>
                <option value="Muaddin">Mu-addin</option>
                <option value="Hazrath">Hazrath</option>
                <option value="FatherMotherSeparated">Father & Mother Separated</option>
                <option value="FatherExpired">Father Expired</option>
                <option value="Singleparent">Single Parent</option>
                <option value="Orphan">Orphan</option>
              </select>
            </div>
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
            {/* Community not need
            <div>
              <label className="block mb-1">Community:</label>
              <select
                name="community"
                value={community}
                onChange={(e) =>  setCommunity(e.target.value)}
                className="w-48  md:w-72 p-2 border rounded-md text-slate-950 lg:w-48"
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
              <label className="block mb-1">Mobile No.:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type="text"
                maxlength="10"
                name="mobileNo"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                className="w-48  md:w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                required
              />
            </div>
            {/* email not need */}
            {/* <div>
              <label className="block mb-1">Email Id:</label>
              <input
                type="email"
                name="emailId"
                value={emailId}
                onChange={(e) =>  setEmailId(e.target.value)}
                className="w-48  md:w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                required
              />
            </div> */}

            <div>
              <label className="block mb-1">Aadhar no:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type="text"
                name="aadhar"
                value={aadhar}
                onChange={(e) => setAadhar(e.target.value)}
                className="w-48  md:w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 border p-10 rounded-xl">
            <div>
              <label className="block mb-1 -mt-6  ">Parent or Guardian Name:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type="text"
                name="fatherName"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value.toUpperCase())}
                className=" w-48  md:w-44 p-2  border rounded-md text-slate-950"
                required
              />
            </div>
            <div>
              <label className="block mb-1 -mt-6">Parent or Guardian Contact No.:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type="text"
                name="fatherNo"
                maxlength="10"
                value={fatherNo}
                onChange={(e) => setFatherNo(e.target.value)}
                className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
                required
              />
            </div>
            <div>
              <label className="block mb-1 -mt-6">Parent or Guardian Occupation:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type="text"
                name="fatherOccupation"
                value={fatherOccupation}
                onChange={(e) => setFatherOccupation(e.target.value.toUpperCase())}
                className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
                required
              />
            </div>
            <div>
              <label className="block mb-1 py-4 -mt-8">Annual Income:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
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
              <label className="block mb-1 py-4 -mt-8">Sibling:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>

              <input
                type="radio"
                id="sibyes"
                name="sibling"
                value="Yes"
                className='scale-200'
                checked={siblings === 'Yes'}
                onChange={(e) => setSiblings(e.target.value)}
                required
              />
              <label htmlFor="sibyes" className=' form-radio ml-2 text-xl'>Yes</label>

              <input
                type="radio"
                id="sibno"
                name="sibling"
                value="No"
                className='scale-200 ml-3'
                checked={siblings === 'No'}
                onChange={(e) => setSiblings(e.target.value)}
                required
              />
              <label htmlFor="sibno" className=' form-radio ml-2 text-xl'>No</label>

            </div>
          </div>
          {siblings === 'Yes' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl">
                <div>
                  <label className="block mb-1"> No of Siblings</label>
                  <input
                    type="text"
                    name="siblingsNo"
                    value={siblingsNo}
                    onChange={(e) => setSiblingsNo(e.target.value)}
                    className="w-48 md:w-44 p-2 border rounded-md text-slate-950"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 ">Siblings Occupation </label>
                  <input
                    type="text"
                    name="siblingsNo"
                    value={siblingsOccupation}
                    onChange={(e) => setSiblingsOccupation(e.target.value)}
                    className="w-48 md:w-44 p-2 border rounded-md text-slate-950"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 ">Siblings AnnualIncome</label>
                  <input
                    type="text"
                    name="siblingsNo"
                    value={siblingsIncome}
                    onChange={(e) => setSiblingsIncome(e.target.value)}
                    className="w-48 md:w-44 p-2 border rounded-md text-slate-950"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 border p-10 rounded-xl">
            <div>
              <label className="block mb-1 mt-3">Permanent Address<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value.toUpperCase())}
                className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
                placeholder='Door No & Street'
                required
              />
            </div>
            <div>
              <label className="block mb-1 mt-3">State:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
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
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 mt-3">District:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
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
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 mt-3">Pincode:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
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
          </div>
          {/* Education Details section */}
          <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Education Details</h3>
          <div>
            <div className="overflow-x-auto">
              {ugOrPg === 'UG' && semester === 'I' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl">
                  <div>
                    <label className="block mb-1">Last School Name:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                    <input
                      type="text"
                      name="schoolName"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value.toUpperCase())}
                      className="w-48  md:w-96 p-2 border rounded-md text-slate-950"

                    />
                  </div>
                  <div>
                    <label className="block ml-40 mb-1">Year of Passing:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                    <input
                      type="text"
                      name="yearOfPassing"
                      value={yearOfPassing}
                      onChange={(e) => setYearOfPassing(e.target.value)}
                      className="w-48  md:w-96 ml-40 p-2 border rounded-md text-slate-950"

                    />
                  </div>
                  <div></div>
                  <div>
                    <label className="block mb-1">Maximum Mark:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                    <input
                      type="text"
                      name="maximumMarkSchool"
                      value={maximumMarkSchool}
                      onChange={(e) => setMaximumMarkSchool(e.target.value)}
                      className="w-48  md:w-56 p-2 border rounded-md text-slate-950"

                    />
                  </div>
                  <div>
                    <label className="block mb-1">Marks Secured:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                    <input
                      type="text"
                      name="marksSecuredSchool"
                      value={marksSecuredSchool}
                      onChange={(e) => setMarksSecuredSchool(e.target.value)}
                      className="w-48  md:w-56 p-2 border rounded-md text-slate-950"

                    />
                  </div>
                  <div>
                    <label className="block mb-1">Percentage:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                    <input
                      type="text"
                      name="percentageOfMarkSchool"
                      value={percentageOfMarkSchool}
                      onChange={(e) => setPercentageOfMarkSchool(e.target.value)}
                      className="w-48  md:w-56 p-2 border rounded-md text-slate-950"

                    />
                  </div>
                </div>
              )}
              {/* if Pg and sem 1  */}
              { ugOrPg === 'PG' && semester === 'I' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl">
                  <div>
                    <label className="block mb-1">Last College Name:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                    <input
                      type="text"
                      name="schoolName"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value.toUpperCase())}
                      className="w-48  md:w-96 p-2 border rounded-md text-slate-950"

                    />
                  </div>
                  <div>
                    <label className="block ml-40 mb-1">Year of Passing:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                    <input
                      type="text"
                      name="yearOfPassing"
                      value={yearOfPassing}
                      onChange={(e) => setYearOfPassing(e.target.value)}
                      className="w-48  md:w-96 p-2 ml-40 border rounded-md text-slate-950"

                    />
                  </div>
                  <div></div>
                  <div>
                    <label className="block mb-1">Maximum Mark (Part III only):<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                    <input
                      type="text"
                      name="maximumMarkSchool"
                      value={maximumMarkSchool}
                      onChange={(e) => setMaximumMarkSchool(e.target.value)}
                     className="w-48  md:w-56 p-2 border rounded-md text-slate-950"

                    />
                  </div>
                  <div>
                    <label className="block mb-1">Marks Secured (Part III only):<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                    <input
                      type="text"
                      name="marksSecuredSchool"
                      value={marksSecuredSchool}
                      onChange={(e) => setMarksSecuredSchool(e.target.value)}
                      className="w-48  md:w-56 p-2 border rounded-md text-slate-950"

                    />
                  </div>
                  <div>
                    <label className="block mb-1">Percentage:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                    <input
                      type="text"
                      name="percentageOfMarkSchool"
                      value={percentageOfMarkSchool}
                      onChange={(e) => setPercentageOfMarkSchool(e.target.value)}
                     className="w-48  md:w-56 p-2 border rounded-md text-slate-950"

                    />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border p-10 rounded-xl">
                {/* <div>
                  <label className="block mb-1">Semester:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                  <input
                    type="text"
                    name="preSemester"
                    value={preSemester}
                    onChange={(e) => setPreSemester(e.target.value.toUpperCase())}
                    className="w-48  md:w-52 p-2 border rounded-md text-slate-950"

                  />
                </div>
                <div>
                  <label className="block mb-1">Mark (UG PartIII Only):<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                  <input
                    type="text"
                    name="mark"
                    value={mark}
                    onChange={(e) => setMark(e.target.value)}
                    className="w-48  md:w-52 p-2 border rounded-md text-slate-950"

                  />
                </div>
                <div>
                  <label className="block mb-1">Maximum Mark (UG PartIII Only):<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                  <input
                    type="text"
                    name="maxMark"
                    value={maxMark}
                    onChange={(e) => setMaxMark(e.target.value)}
                    className="w-48  md:w-52 p-2 border rounded-md text-slate-950"

                  />
                </div>
                <div>
                  <label className="block mb-1">Percentage of Mark:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                  <input
                    type="text"
                    name="semPercentage"
                    value={semPercentage}
                    onChange={(e) => setSemPercentage(e.target.value)}
                    className=" w-48  md:w-52 p-2 border rounded-md text-slate-950"

                  />
                </div> */}
                <div>
                  <label className="block mb-1">Do you have arrear? (fill No. of Papers, If no arrear enter '0'):<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                  <input
                    type="text"
                    name="arrear"
                    value={arrear}
                    onChange={(e) => setArrear(e.target.value)}
                    className="w-72  p-2 border rounded-md text-slate-950"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 w-auto ml-32">Jamath Letter:</label>
                  <input
                    type='file'
                    name='jamath'
                    value={jamath}
                    onChange={(e) => setJamath(e.target.value)}
                    className=" ml-32 mt-6 border rounded-md p-2 text-slate-950"

                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10 rounded-xl" >
                <div>
                  <label className="block mb-1 mt-3">Password:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                  <input
                    type='password'
                    name='pass'
                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
                    value={password.pass}
                    onChange={handleChange}

                  />
                </div>
                <div>
                  <label className="block mb-1 mt-3">Re-Password:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                  <input
                    type='password'
                    name='conpass'
                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
                    value={password.conpass}
                    onChange={handleChange}
                  />
                </div>
                {isConpassTyped && error && <div style={{ color: 'red' }}>{error}</div>}
              </div>
            </div>
            {/* Attendance details not need to form */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl">
              <div>
                <label className="block mb-1">Class Attendance:</label>
                <input
                  type="text"
                  name="classAttendance"
                  value={classAttendance}
                  onChange={(e) => setClassAttendance(e.target.value)}
                  className="w-48 md:w-92 p-2 border rounded-md text-slate-950"

                />
              </div>
              <div>
                <label className="block mb-1">Class Max Attendance:</label>
                <input
                  type="text"
                  name="classMaxAttendance"
                  value={classMaxAttendance}
                  onChange={(e) => setClassMaxAttendance(e.target.value)}
                  className="w-48 md:w-92 p-2 border rounded-md text-slate-950"

                />
              </div>
              <div>
                <label className="block mb-1">Class Attendance Percentage:</label>
                <input
                  type="text"
                  name="classAttendancePer"
                  value={classAttendancePer}
                  onChange={(e) => setClassAttendancePer(e.target.value)}
                  className="w-48 md:w-92 p-2 border rounded-md text-slate-950"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Deeniyath Education Days Attendance:</label>
                <input
                  type="text"
                  name="deeniyathEducationDays"
                  value={deeniyathEducationDays}
                  onChange={(e) => setDeeniyathEducationDays(e.target.value)}
                  className="w-48 md:w-92 p-2 border rounded-md text-slate-950"
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
                  className="w-48 md:w-92 p-2 border rounded-md text-slate-950"
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
                  className="w-48 md:w-92 p-2 border rounded-md text-slate-950"
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
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 ml-3 justify-end "
              onClick={handlePrint}
              disabled={!isPrint}
            >
              Print
            </button>
          </div>
        </form>
        {/* Instructions */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-red-400 w-3/4 h-76 rounded-lg shadow-lg overflow-auto p-6">

              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <p className="mb-4">Please fill all the Details</p>
              <button onClick={closePopup} className="bg-blue-500 text-white py-2 px-4 rounded-md">Close</button>
            </div>

            <div class="border border-gray-500 mt-3"></div>
            <div className="mt-32 px-3 grid grid-cols-5 w-auto mr-4">
            <div className="text-center">
              <div>Class Teacher</div>
              </div>
              <div className="text-center">
              <div>HOD / MID</div>
              </div>
              <div className="mb-3 text-center">
              <div>Deputy Warden-Hostel</div>
              </div>
             <div className="mb-3 text-center">
            <div>Register of Attendance</div>
            </div>
            <div className="mb-3 text-center">
            <div>Coordinator-Deeniyath / Moral</div>
           </div>
            </div>
            </div>
        )}

        {
          printData.length > 0 && (
            // <table className="min-w-full divide-y divide-gray-200 mt-8 border border-black" id="print-section">
            // <thead className="bg-gray-50">
            <div id="print-section" hidden>
              <img src={PrintHeader} alt="" className="w-full" />
              <h1 className=' text-center text-2xl font-bold'> SCHOLARSHIP APPLICATION (Fresher) </h1>
              <div className='border border-black '>
                {printData.map((data, index) => (
                  <div key={index} className='grid grid-cols-5 w-auto px-3 mt-2'>
                    <div className="font-bold border border-black text-center py-2"> {data.fresherOrRenewal} </div>
                    <div className="font-bold border border-black text-center py-2">{data.ugOrPg}</div>
                    <div className="font-bold border border-black text-center py-2">{data.semester}</div>
                    <div className="font-bold border border-black text-center py-2">{data.procategory}</div>
                    <div className="font-bold border border-black text-center py-2">{data.dept}</div>
                  </div>

                ))}
                <div className='grid grid-cols-2 w-auto p-2  '>
                  <div>
                    <div className="font-bold px-1 py-2 whitespace-normal" >Applicant</div>
                    <div className="font-bold px-1 py-2 whitespace-normal" >Mobile No</div>
                    <div className="font-bold px-1 py-2 whitespace-normal">Register No</div>
                    <div className="font-bold px-1 py-2 whitespace-normal">Hostel</div>
                    <div className="font-bold px-1 py-2 whitespace-normal">SpecialCategory</div>
                    <div className="font-bold px-1 py-5 whitespace-normal">Address</div>
                    <div className="font-bold px-1 py-2 whitespace-normal">Father Name & Mother Name</div>
                    <div className="font-bold px-1 py-2 whitespace-normal">Father & Mother Mobile No</div>
                    <div className="font-bold px-1 py-2 whitespace-normal">Father & Mother Occupation & Income</div>
                    <div className="font-bold px-1 py-2 whitespace-normal">School Name</div>
                    <div className="font-bold px-1 py-2 whitespace-normal">Year of Passing & Percentage</div>
                    <div className="font-bold px-1 py-2 whitespace-normal"> Deeniyath Percentage </div>
                    <div className="font-bold px-1 py-2 whitespace-normal">Attendance Percentage</div>
                    <div className="font-bold px-1 py-2 whitespace-normal">No. Of Siblings</div>
                    {/*<div className="px-6 py-4 whitespace-nowrap">Course</div> */}
                  </div>

                  {printData.map((data, index) => (
                    <div key={index} className=''>
                      <div className="px-2 py-2 whitespace-normal">{data.name}</div>
                      <div className="px-2 py-2 whitespace-normal"> {data.mobileNo}</div>
                      <div className="px-2 py-2 whitespace-normal">{data.registerNo}</div>
                      <div className="px-2 py-2 whitespace-normal">{data.hostel}</div>
                      <div className="px-2 py-2 whitespace-normal">{data.specialCategory}</div>
                      <div className="px-2 py-2 whitespace-normal">{data.address}, {data.district}, {data.state}, {data.pin}</div>
                      <div className="px-2 py-2 whitespace-normal">{data.fatherName}</div>
                      <div className="px-2 py-2 whitespace-normal">{data.fatherNo}</div>
                      <div className="px-2 py-2 whitespace-normal">{data.fatherOccupation} & {data.annualIncome}</div>
                      <div className="px-2 py-2 whitespace-normal">{data.schoolName}</div>
                      <div className="px-2 py-2 whitespace-normal">{data.yearOfPassing} & {data.percentageOfMarkSchool}</div>
                      <div className="px-2 py-2 whitespace-normal">{data.deeniyathPer}</div>
                      <div className="px-2 py-2 whitespace-normal">{data.classAttendancePer}</div>
                      <div className="px-2 py-2 whitespace-normal">{data.siblings}</div>
                      {/* <div className="px-6 py-4 whitespace-nowrap">{data.ugOrPg}</div>
                <div className="px-6 py-4 whitespace-nowrap">{data.ugOrPg}</div>
                 */}
                    </div>

                  ))}
                </div>
                <div className="mt-32 px-3 grid grid-cols-5 w-auto mr-4">
                  <div className="text-center">
                    <div>Class Teacher</div>
                  </div>
                  <div className="text-center">
                    <div>HOD / MID</div>
                  </div>
                  <div className="mb-3 text-center">
                    <div>Deputy Warden-Hostel</div>
                  </div>

                </div>
              </div>
            </div>

          )
        }


      </div >
    </div >
  );
};

export default ScholarshipForm;
