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
        <div className="p-6 sm:p-10 min-h-screen bg-gray-50 text-gray-800">

            {/* 📘 Guidelines */}
            <section className="max-w-6xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl p-10 mb-16 border border-gray-200">
                <h2 className="text-3xl font-bold text-emerald-700 mb-10 flex items-center gap-3">
                    <span className="text-emerald-600 text-2xl">📘</span>
                    Guidelines to View Applications
                </h2>

                <div className="space-y-10 text-gray-800 text-[17px] leading-loose">
                    {/* Section 1 */}
                    <div>
                        <h3 className="text-xl font-semibold text-emerald-800 mb-2 border-l-4 border-emerald-500 pl-4">
                            • General Filtering
                        </h3>
                        <ul className="ml-8 list-disc space-y-1">
                            <li>Select “All” in Search Mode and choose a status to filter accordingly:</li>
                            <li><strong>All</strong> : Shows all applications</li>
                            <li><strong>Accepted</strong> : Shows only accepted applications</li>
                            <li><strong>Rejected</strong> : Shows only rejected applications</li>
                        </ul>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <h3 className="text-xl font-semibold text-emerald-800 mb-2 border-l-4 border-emerald-500 pl-4">
                            • Filtering by Special Category
                        </h3>
                        <p className="ml-2">
                            After choosing <strong>All</strong> in both Search Mode and Application Status, select a Special Category (e.g., <strong>Mu-addin</strong>) to see all relevant applications (accepted & rejected).
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <h3 className="text-xl font-semibold text-emerald-800 mb-2 border-l-4 border-emerald-500 pl-4">
                            • Combining Special Categories with Further Filtering
                        </h3>
                        <p className="ml-2">
                            You can select multiple Special Categories (like <strong>Mu-addin</strong> and <strong>Parent Separated</strong>) and apply a status filter (e.g., Accepted/Rejected) for fine-grained results.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div>
                        <h3 className="text-xl font-semibold text-emerald-800 mb-2 border-l-4 border-emerald-500 pl-4">
                            • Filtering for “In Progress”
                        </h3>
                        <ul className="ml-8 list-disc space-y-1">
                            <li>Shows applications still under review</li>
                            <li>Excludes Accepted and Rejected applications</li>
                            <li>Filter further by All, Fresher, or Renewal under Progress Type</li>
                            <li>Check <strong>Verified Application</strong> to view those verified by Deeniyath, Attendance, and COE</li>
                        </ul>
                    </div>

                    {/* Section 5 */}
                    <div>
                        <h3 className="text-xl font-semibold text-emerald-800 mb-2 border-l-4 border-emerald-500 pl-4">
                            • Additional Filtering by Special Category (In Progress)
                        </h3>
                        <p className="ml-2">
                            You can also filter pending applications using one or more selected Special Categories.
                        </p>
                    </div>
                </div>
            </section>

            {/* 🏷 Department Table */}
            <section className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    🏷 Department Code Reference
                </h1>
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                    <table className="min-w-full table-auto">
                        <thead className="bg-emerald-700 text-white">
                            <tr>
                                <th className="py-3 px-6 text-center text-sm font-semibold uppercase border-r border-white">
                                    Code
                                </th>
                                <th className="py-3 px-6 text-center text-sm font-semibold uppercase">
                                    Department Name
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {departments.map(([code, name], idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="py-3 px-6 text-center font-medium border-r">{code}</td>
                                    <td className="py-3 px-6 text-center">{name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ⚠️ Important Note */}
            <section className="max-w-5xl mx-auto mt-10">
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-5 rounded-md shadow-sm">
                    <div className="flex items-start space-x-3">
                        <FaInfoCircle className="text-yellow-600 text-xl mt-1" />
                        <div>
                            <h2 className="text-lg font-semibold text-yellow-800 mb-1">Important Note:</h2>
                            <p className="text-gray-700">
                                Once a student is <strong>accepted</strong>, go to the <strong>STATUS</strong> menu to release the student before proceeding further.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Guide;
