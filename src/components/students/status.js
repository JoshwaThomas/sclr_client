import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../../assets/Pulse.svg'
import PrintHeader from '../../assets/printHeader.jpg';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Status() {
    // const [registerNo, setRegisterNo] = useState('');
    // const [mobileNo, setMobileNo] = useState('');
    const [student, setStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // const printRef = useRef();
    const navigate = useNavigate();
    const { staffId } = useParams();
    const apiUrl = process.env.REACT_APP_API_URL;
    const contentRef = useRef();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/admin/studstatus`, {
                    params: { registerNo: staffId }
                });
                console.log("Response from server:", res.data);
                setStudent(res.data);
                console.log('semPercentage:', res.data.semPercentage);
                console.log('classAttendancePer:', res.data.classAttendancePer);
                console.log('deeniyathPer:', res.data.deeniyathPer);
                console.log('action:', res.data.action);
                setShowModal(true);

                if (res.data && res.data.message) {
                    alert(res.data.message);
                    navigate(`/student/${staffId}/application/renewal`);
                }
            } catch (error) {
                alert("An error occurred. Please try again.");
                console.log(error);
            }
        };

        if (staffId) {
            fetchStudentData();
        }
    }, [staffId, apiUrl]);

 const handleDownloadPdf = async () => {
        const element = contentRef.current;
        if (!element) {
            alert('PDF content not ready.');
            return;
        }

        try {
            // Capture DOM as canvas
            const canvas = await html2canvas(element, { scale: 2 });

            // Convert canvas to image
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let position = 0;
            let heightLeft = imgHeight;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`Application_${student?.registerNo || 'Student'}.pdf`);
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF.');
        }
    };


    const handlePrint = (e) => {
        e.preventDefault();
        const printContent = document.getElementById('print-section').innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
    };

    useEffect(() => {
        const handleKeydown = (event) => {
            if (event.ctrlKey && event.key === 'p') {
                event.preventDefault();
                handlePrint(event);
            }
        };
        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, []);

   const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!student) {
      const timer = setTimeout(() => {
        setShowMessage(true);
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [student]);

  if (!student) {
    return (
      <div>
        <center>
          {!showMessage ? (
            <img src={Loading} alt="Loading" className="w-36 h-80" />
          ) : (
            <div className="text-[14px] font-medium mt-4">
              Go to Application Tab Apply the scholarship Renewal
            </div>
          )}
        </center>
      </div>
    );
  }

    return (
        <div>
            <div className="container mx-auto">
                <form className="space-y-4  scrollbar-hide">
                    <div className="text-black">
                        {showModal && student && (
                           student.registerNo ? (
                            <div className="flex items-center justify-center  ">
                                <div className="w-full h-full  overflow-auto p-3 ">
                                    {/* fresher form data retrive */}
                                    <div>
                                        <div className=' '>
                                            <div>
                                                <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">Application Status</h3>
                                                {student.action === 1 && (
                                                    <p className="text-green-600 font-bold text-lg">
                                                        Your application is selected. If any Query Contact ERP or Scholarship Office
                                                    </p>
                                                )}
                                                {student.action === 2 && (
                                                    <p className="text-red-600 font-bold text-lg">
                                                        Your application is rejected.
                                                    </p>
                                                )}
                                                 {student.action !== 1 && student.action !== 2 &&  student.action !== 0 && (
                                                    <p className="text-yellow-600 font-bold text-lg">
                                                        Go to Application Tab Apply the Scholarship Renewal.
                                                    </p>
                                                )}
                                                {student.action !== 1 && student.action !== 2 && (
                                                    <p className="text-yellow-600 font-bold text-lg">
                                                        Your application is under process.
                                                    </p>
                                                )}
                                            </div >
                                            <div className='mt-5'>

                                                <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">Application</h3>

                                                <div className="space-x-4 inline-flex  border border-black p-6 rounded-xl">
                                                    <div className='uppercase font-bold text-xl'>
                                                        {student.fresherOrRenewal}
                                                    </div>
                                                </div>
                                                <div className="space-x-4 ml-5 inline-flex border border-black p-6 rounded-xl">
                                                    <div className='uppercase font-bold text-xl'>
                                                        {student.specialCategory}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-4 text-white">Personal Details</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-black p-10 rounded-xl">

                                            <div className=''>
                                                <label className="block ">Register No.:</label>
                                                <label className='font-bold text-[16px] uppercase'> {student.registerNo} </label>

                                                <div>
                                                    <label className="block mt-2">Name:</label>
                                                    <label className='font-bold text-[16px] uppercase'>  {student.name} </label>
                                                </div>

                                                <div>
                                                    <label className="block mt-2">Department:</label>
                                                    <label className='font-bold text-[16px] uppercase'>  {student.dept} </label>
                                                </div>
                                                <div>
                                                    <label className="block mb-1">Section</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.section} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">UG or PG</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.ugOrPg} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">Programme Category</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.procategory} </label>
                                                </div>
                                                <div>

                                                    <label className="block mt-2">Semester:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.semester} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">Mobile No.:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.mobileNo} </label>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div>
                                                    <label className="block mt-2">S/O,D/O</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.fatherName} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">Father's Contact No.:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.fatherNo} </label>

                                                </div>
                                                <div>
                                                    <label className="block mt-2">Father's Occupation:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.fatherOccupation} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">Annual Income:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.annualIncome} </label>
                                                </div>
                                                <div>
                                                    <label className="">Siblings: </label><br />
                                                    <label className='font-bold text-[16px] uppercase'> {student.siblings} </label> <br />
                                                </div>
                                                {student.siblings === 'Yes' && (
                                                    <div>
                                                        <label className="">No of Siblings: </label> <br />
                                                        <label className='font-bold text-[16px] uppercase'> {student.siblingsNo} </label><br />
                                                        <label className="">Siblings Occupation: </label> <br />
                                                        <label className='font-bold text-[16px] uppercase'> {student.siblingsOccupation} </label><br />
                                                        <label className="">Family Annual Income: </label> <br />
                                                        <label className='font-bold text-[16px] uppercase'> {student.siblingsIncome} </label>
                                                    </div>
                                                )}


                                            </div>

                                            <div className=''>
                                                <div>
                                                    <label className="block mt-2">Hostel:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.hostel} </label>
                                                </div>
                                                <div>

                                                    <label className="block mt-2">Special Category:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.specialCategory} </label>
                                                </div>
                                                <div>

                                                    <label className="block mt-2">Religion:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.religion} </label>
                                                </div>
                                                <div>

                                                    <label className="block mt-2">Permanent Address</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.address} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">State:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.state} </label>
                                                </div>
                                                <div>

                                                    <label className="block mt-2">District:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.district} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">Pincode:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.pin} </label>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Education Details section */}
                                        <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Education Details</h3>
                                        <div>
                                            <div className="overflow-x-auto">
                                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border border-black p-10 rounded-xl">
                                                    {student.semester === 'I' && (
                                                        <div className='grid grid-cols-1 md:grid-cols-4 '>
                                                            <div>
                                                                <label className="block mt-2 ">Last School Name:</label>
                                                                <label className='font-bold text-[16px] uppercase -mr-96'> {student.schoolName} </label>
                                                            </div>
                                                            <div>

                                                            </div>
                                                            <div>
                                                                <label className="block mt-2">Percentage of Mark:</label>
                                                                <label className='font-bold text-[16px] uppercase'> {student.percentageOfMarkSchool} </label>
                                                            </div>
                                                            <div>
                                                                <label className='block mt-2'>Year of Passing: </label>
                                                                <label className='font-bold text-[16px] uppercase'> {student.yearOfPassing} </label>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {student.semester !== 'I' && (
                                                        <div className="grid grid-cols-2 w-auto ">
                                                            <div className="font-bold border border-black text-left py-3 px-5">Percentage of Mark</div>
                                                            <div className="font-bold border border-black text-left py-3 px-5">{student.semPercentage === 0 ? 'Pending' : student.semPercentage}</div>
                                                            <div className="font-bold border border-black text-left py-3 px-5">Class Attendance Percentage</div>
                                                            <div className="font-bold border border-black text-left py-3 px-5"> {student.classAttendancePer === 0 ? 'Pending' : student.classAttendancePer}</div>
                                                            <div className="font-bold border border-black text-left py-3 px-5">Deeniyath / Moral Percentage</div>
                                                            <div className="font-bold border border-black text-left py-3 px-5">{student.deeniyathPer === 0 ? 'Pending' : student.deeniyathPer}</div>
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-black p-10 rounded-xl mt-5">
                                                {student.arrear !== 0 && (
                                                    <div>
                                                        <label className="">No. Of Arrear :</label>{student.arrear}

                                                    </div>
                                                )}

                                                {student.fresherOrRenewal === 'Renewal' && (
                                                    <div>
                                                        <label className="">Last Time Credited Amount:</label>{student.lastCreditedAmt}
                                                    </div>
                                                )}

                                                <div>
                                                    <label className=""></label>
                                                    <img src={`${apiUrl}/${student.jamath}`} alt="Jamath" className="max-w-full h-auto rounded-lg" />
                                                    {/* <img src={student.jamath} alt="Jamath" /> */}
                                                </div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div className="text-right">
                                                    <button
                                                        onClick={handlePrint}
                                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                                        Print
                                                    </button>
                                                </div>
                                                 <div className="text-right">
                <button
                    onClick={handleDownloadPdf}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Download PDF
                </button>
            </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                           ):(
                            <div className="text-[16px] font-medium mt-4">
                                Go to Application Tab Apply the scholarship Renewal
                            </div>
                           )
                        )}
                    </div>
            <div>

                <div id="print-section" ref={contentRef} className='w-[700px] h-[1130px] bg-white p-3'>
                    <img src={PrintHeader} alt="Header" className="w-full h-[80px]" />
                    <div>
                    <div className="border border-black mt-5 h-[950px]">
                            <div className=' text-center text-xl font-bold'>Scholarship Application({student.fresherOrRenewal})</div>
                            <div className="flex items-center justify-center flex-col p-2">
                                <h3 className="text-xl font-bold text-black">Student Details &nbsp;&nbsp;{student.ugOrPg}-{student.procategory} </h3>
                                <div className="grid grid-cols-1 border w-full border-black px-5 py-3 rounded-md">
                                    <div className='grid grid-cols-5 gap-2 col-span-'>
                                        <div className="col-span-2">
                                            <label className="font-semibold">Register No.:</label>
                                        </div>
                                        <div className="col-span-3 border px-2">
                                            <label className="text-[14px] font-bold uppercase ">{student.registerNo}</label>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="font-semibold">Name:</label>
                                        </div>
                                        <div className="col-span-3 border px-2">
                                            <label className="text-[14px] font-bold uppercase">{student.name}</label>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="font-semibold">Dept & Sec. / Sem:</label>
                                        </div>
                                        <div className="col-span-3 border px-2">
                                            <label className="text-[14px] font-bold uppercase">{student.dept}&nbsp;-&nbsp;{student.section}&nbsp;&nbsp;{student.semester}&nbsp;Sem</label>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="font-semibold">Mobile No.:</label>
                                        </div>
                                        <div className="col-span-3 border px-2">
                                            <label className="text-[14px] font-bold uppercase">{student.mobileNo}</label>
                                        </div>
                                         <div className="col-span-2">
                                            <label className="font-semibold">{student.procategory === 'SFW'?'D/o':'S/o'}:</label>
                                        </div>
                                        <div className="col-span-3 border px-2">
                                            <label className="text-[14px] font-bold uppercase">{student.fatherName},<br/>{student.address},<br/>{student.state},<br/>{student.district},<br/>{student.pin}</label>
                                        </div>
                                         <div className="col-span-2">
                                            <label className="font-semibold">Parent / Guardian Mobile:</label>
                                        </div>
                                        <div className="col-span-3 border px-2">
                                            <label className="text-[14px] font-bold uppercase">{student.mobileNo}</label>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="font-semibold">Father's Occupation:</label>
                                        </div>
                                        <div className="col-span-3 border px-2">
                                            <label className="text-[14px] font-bold uppercase">{student.fatherOccupation}</label>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="font-semibold">Annual Income:</label>
                                        </div>
                                        <div className="col-span-3 border px-2">
                                            <label className="text-[14px] font-bold uppercase">{student.annualIncome}</label>
                                        </div>
                                    </div>

                                        <div className="grid grid-cols-1 mt-5 ">
                                        {student.siblings === 'Yes' && (
                                        <div className="col-span-5 grid grid-cols-3 mb-3">
                                            {/* <label className="font-semibold">Siblings</label> */}
                                            <label className="font-semibold text-center border">No. of Siblings</label>
                                            <label className="font-semibold text-center border border-x-0">Siblings' Occupation</label>
                                            <label className="font-semibold text-center border">Family Annual Income</label>
                                            <label className="font-bold text-center border border-t-0">{student.siblingsNo}</label>
                                            <label className="font-bold text-center border border-x-0 border-t-0">{student.siblingsOccupation}</label>
                                            <label className="font-bold text-center border border-t-0">{student.siblingsIncome}</label>
                                        </div>
                                        )} 

                                         <div className="col-span-5 grid grid-cols-3">
                                            {/* <label className="font-semibold">Siblings</label> */}
                                            <label className="font-semibold text-center border">Hostel</label>
                                            <label className="font-semibold text-center border border-x-0">Special Category</label>
                                            <label className="font-semibold text-center border">Religion</label>
                                            <label className="font-bold text-center border border-t-0">{student.hostel}</label>
                                            <label className="font-bold text-center border border-x-0 border-t-0">{student.specialCategory}</label>
                                            <label className="font-bold text-center border border-t-0">{student.religion}</label>
                                        </div>
                                </div>  
                                </div>
                                <h3 className="text-xl font-bold p-2 mt-3 text-black">Education Details</h3>
                                <div className="border border-black px-5 py-3 w-full rounded-md">
                                    <div className="grid grid-cols-1 gap-4">
                                        {student.semester === 'I' && (
                                            <div className="grid grid-cols-2">
                                                <div className="font-semibold">Last School Name:</div>
                                                <div className="text-[14px] font-bold uppercase">{student.schoolName}</div>
                                                <div className="font-semibold">Percentage of Mark:</div>
                                                <div className="text-[14px] font-bold uppercase">{student.percentageOfMarkSchool}</div>
                                                <div className="font-semibold">Year of Passing:</div>
                                                <div className="text-[14px] font-bold uppercase">{student.yearOfPassing}</div>
                                            </div>
                                        )}
                                        {student.semester !== 'I' && (
                                            <div className="grid grid-cols-2">
                                                <div className="font-bold border border-r-0 border-black py-2 px-4">Percentage of Mark</div>
                                                <div className="font-bold border border-black py-2 px-4">{student.semPercentage === 0 ? '-' : student.semPercentage}</div>
                                                <div className="font-bold border border-y-0 border-r-0 border-black py-2 px-4">Class Attendance Percentage</div>
                                                <div className="font-bold border border-y-0 border-black py-2 px-4">{student.classAttendancePer === 0 ? '-' : student.classAttendancePer}</div>
                                                <div className="font-bold border border-r-0 border-black py-2 px-4">Deeniyath / Moral Percentage</div>
                                                <div className="font-bold border border-black py-2 px-4">{student.deeniyathPer === 0 ? '-' : student.deeniyathPer}</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-5">
                                        {student.arrear !== 0 && (
                                            <div className="flex justify-between border border-black px-2">
                                                <label className="font-semibold">No. Of Arrears:</label>
                                                <label className="font-bold text-[14px]">{student.arrear}</label>
                                            </div>
                                        )}
                                        {student.fresherOrRenewal === 'Renewal' && (
                                            <div className="flex justify-between border border-black px-2">
                                                <label className="font-semibold">Last Time Credited Amount:</label>
                                                <label className="font-bold text-[14px]">{student.lastCreditedAmt}</label>
                                            </div>
                                        )}
                                        {/* <div>
                                            <img src={`${apiUrl}/${student.jamath}`} alt="Jamath" className="max-w-full h-1/2 rounded-lg border border-black" />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
                </form>
            </div>
        </div>
    );
}

export default Status;