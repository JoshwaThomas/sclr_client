import React, { useEffect, useState, useRef } from 'react';
import PrintHeader from '../../assets/printHeader.jpg';
import { useReactToPrint } from 'react-to-print';

function Application_Print({ student }) {
    const printRef = useRef();

    // const handlePrint = () => {
    //     const printContents = printRef.current.innerHTML;
    //     const printWindow = window.open('', '', 'width=800,height=600');
    //     printWindow.document.write(`
    //       <html>
    //         <head>
    //           <title>Print</title>
    //           <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    //           <style>
    //             @media print {
    //               body { margin: 1rem; }
    //             }
    //           </style>
    //         </head>
    //         <body onload="window.print(); window.close();">
    //           ${printContents}
    //         </body>
    //       </html>
    //     `);
    //     printWindow.document.close();
    //   };
      
        const handlePrint = (e) => {
        e.preventDefault();
        const printContent = document.getElementById('print-section').innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
    };

    return (
        <div>
            <div className='flex justify-end px-5'>
 <button
                type='button'
                onClick={handlePrint}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Print
            </button>
            </div>
           

        <div className='p-3 border mt-2 w-[730px]'>
            <div id="print-section" ref={printRef} className='w-[700px] h-[1130px] bg-white p-3'>
       {/* <div id="print-section" ref={contentRef} className='w-[700px] h-[1130px] bg-white p-3'> */}
                    <img src={PrintHeader} alt="Header" className="w-full h-[80px]" />
                    <div>
                    <div className="border border-black mt-5 h-[850px]">
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
                                            <label className="font-semibold text-center border">No. of Siblings</label>
                                            <label className="font-semibold text-center border border-x-0">Siblings' Occupation</label>
                                            <label className="font-semibold text-center border">Family Annual Income</label>
                                            <label className="font-bold text-center border border-t-0">{student.siblingsNo}</label>
                                            <label className="font-bold text-center border border-x-0 border-t-0">{student.siblingsOccupation}</label>
                                            <label className="font-bold text-center border border-t-0">{student.siblingsIncome}</label>
                                        </div>
                                        )} 

                                         <div className="col-span-5 grid grid-cols-3">
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

                                    </div>
                                </div>
                            </div>
                    </div>
                    </div>
            </div>
        </div>
        </div>
    );
}

export default Application_Print;