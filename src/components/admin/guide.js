import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const departments = [
    ['UBA', 'BBA BUSINESS ADMINISTRATION'],
    ['UBO', 'B.Sc BOTANY'],
    ['UBT', 'B.Sc BIOTECHNOLOGY'],
    ['UCA', 'BCA COMPUTER APPLICATIONS'],
    ['UCH', 'B.Sc CHEMISTRY'],
    ['UCO', 'B.Com COMMERCE'],
    ['UCS', 'B.Sc COMPUTER SCIENCE'],
    ['UEC', 'BA ECONOMICS'],
    ['UEN', 'BA ENGLISH'],
    ['UFT', 'B.Sc FASHION TECHNOLOGY AND COSTUME DESIGNING'],
    ['UHM', 'B.Sc HOTEL MANAGEMENT AND CATERING SCIENCE'],
    ['UIT', 'B.Sc INFORMATION TECHNOLOGY'],
    ['UMA', 'B.Sc MATHEMATICS'],
    ['UMB', 'B.Sc MICROBIOLOGY'],
    ['UND', 'B.Sc NUTRITION AND DIETETICS'],
    ['UPH', 'B.Sc PHYSICS'],
    ['UAR', 'BA ARABIC'],
    ['UHS', 'BA HISTORY'],
    ['UTA', 'BA TAMIL'],
    ['UVC', 'B.Sc VISUAL COMMUNICATION'],
    ['UZO', 'B.Sc ZOOLOGY'],
    ['MBA', 'MBA BUSINESS ADMINISTRATION'],
    ['MCA', 'MCA COMPUTER APPLICATIONS'],
    ['PAR', 'MA ARABIC'],
    ['PEC', 'MA ECONOMICS'],
    ['PEN', 'MA ENGLISH'],
    ['PHS', 'MA HISTORY'],
    ['PTA', 'MA TAMIL'],
    ['PBO', 'M.Sc BOTANY'],
    ['PBT', 'M.Sc BIOTECHNOLOGY'],
    ['PCH', 'M.Sc CHEMISTRY'],
    ['PCS', 'M.Sc COMPUTER SCIENCE'],
    ['PFT', 'M.Sc FASHION TECHNOLOGY'],
    ['PIT', 'M.Sc INFORMATION TECHNOLOGY'],
    ['PMA', 'M.Sc MATHEMATICS'],
    ['PMB', 'M.Sc MICROBIOLOGY'],
    ['PND', 'M.Sc NUTRITION AND DIETETICS'],
    ['PPH', 'M.Sc PHYSICS'],
    ['PZO', 'M.Sc ZOOLOGY'],
    ['PCO', 'M.Com COMMERCE'],
]

function Guide() {

    return (
        <div className="p-6 sm:p-10 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    Department Code Reference
                </h1>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <table className="min-w-full table-auto">
                        <thead className="bg-emerald-700 text-white">
                            <tr>
                                <th className="py-3 px-6 text-center text-sm font-semibold uppercase tracking-wider border-r border-white">
                                    Code
                                </th>
                                <th className="py-3 px-6 text-center text-sm font-semibold uppercase tracking-wider">
                                    Department Name
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {departments.map(([code, name], idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="py-3 px-6 text-center text-gray-700 font-medium border-r">{code}</td>
                                    <td className="py-3 px-6 text-center text-gray-700">{name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-10 bg-yellow-100 border-l-4 border-yellow-500 p-5 rounded-md shadow-sm">
                    <div className="flex items-start space-x-3">
                        <FaInfoCircle className="text-yellow-600 text-xl mt-1" />
                        <div>
                            <h2 className="text-lg font-semibold text-yellow-800 mb-1">Important Note:</h2>
                            <p className="text-gray-700">
                                Once a student is <strong>accepted</strong>, please go to the <strong>STATUS</strong> menu to release the student before proceeding further.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Guide;
