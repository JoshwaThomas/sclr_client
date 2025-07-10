import React, { useState } from 'react';
import axios from 'axios';
import { GoAlert } from "react-icons/go";

function ModifyModal(props) {

    const { showModifyModal, studentData, setStudentData } = props;
    const apiUrl = process.env.REACT_APP_API_URL;
    const [fileName, setFileName] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const {
        registerNo, name, dept, section, mobileNo, religion, aadhar, lastCreditedAmt,
        fatherName, fatherNo, fatherOccupation, annualIncome, siblings, siblingsNo,
        siblingsOccupation, siblingsIncome, fresherOrRenewal, address, state, district,
        pin, studentType, specialCategory, ugOrPg, procategory, semester, hostel,
    } = studentData;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const fileSizeInKB = file.size / 1024;
        if (!allowedTypes.includes(file.type)) {
            alert("Invalid file type. Please upload a JPEG, JPG, or PNG file.");
            e.target.value = ""; return;
        }
        if (fileSizeInKB < 30 || fileSizeInKB > 200) {
            alert("File size must be between 30KB and 200KB.");
            e.target.value = ""; return;
        }
        setStudentData((prevData) => ({ ...prevData, jamath: file }));
        setFileName(file.name)
    }

    const SubmitModify = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(studentData).forEach(([key, value]) => {
            if (key === "jamath" && value instanceof File) { formData.append("jamath", value) }
            else { formData.append(key, value !== undefined && value !== null ? value : "") }
        })
        try {
            const result = await axios.post(`${apiUrl}/api/admin/student/update`,
                formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            if (result.data.success === true) {
                alert("Application Updated Successfully");
                props.closeModifyModal();
            } else if (result.data.message === "Register No. Already Existing") {
                alert("Register No. Already Existing", "error");
            } else {
                alert("Check Your Details and Fill Properly");
            }
        } catch (err) {
            console.error("Error in Submitting Data : ", err);
            console.error("Error details : ", err.response?.data);
            alert("Failed to modify details.");
        }
    }

    const handleDeleteConfirmed = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.delete(`${apiUrl}/api/admin/delete/${registerNo}`,)
            if (res) {
                alert("Data Deleted Successfully");
                props.closeModifyModal();
                setDeleteModal(false)
            }
        } catch (error) {
            alert("Error in Deleting the Student")
            console.log("Error in Deleting the Student : " , error);
        }

    }

    return (
        <>
            {showModifyModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-11/12 md:w-3/4 h-[90vh] overflow-y-auto rounded-lg p-6 shadow-lg">
                        <form className="space-y-6 font-semibold" onSubmit={SubmitModify}>
                            {fresherOrRenewal === 'Fresher' ? (
                                <h3 className="text-xl mb-6 font-semibold bg-gray-600 rounded text-white p-3">
                                    Fresher Application
                                </h3>
                            ) : (
                                <h3 className="text-xl mb-6 font-semibold bg-gray-600 rounded text-white p-3">
                                    Renewal Application
                                </h3>
                            )}
                            {/* Special Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-black p-6 rounded-lg bg-gray-50">
                                <div>
                                    <label className="block mb-2 font-medium">
                                        Special Category : <span className="text-red-500 text-lg">*</span>
                                    </label>
                                    <select
                                        name="specialCategory" required
                                        value={specialCategory}
                                        onChange={(e) => setStudentData((prevData) => ({ ...prevData, specialCategory: e.target.value }))}
                                        className="w-full p-2 border border-black rounded-md text-slate-950"
                                    >
                                        <option value="">Select</option>
                                        <option value="General">General</option>
                                        <option value="Muaddin">Mu-addin</option>
                                        <option value="Hazrath">Hazrath</option>
                                        <option value="Father Mother Separated">Father & Mother Separated</option>
                                        <option value="Father Expired">Father Expired</option>
                                        <option value="Single Parent">Single Parent</option>
                                        <option value="Orphan">Orphan</option>
                                    </select>
                                </div>
                            </div>
                            {/* Academic Details */}
                            <h3 className="text-xl mb-2 font-semibold bg-gray-600 p-3 rounded mt-5 text-white">
                                Academic Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-black p-6 rounded-lg bg-gray-50">
                                {/* UG or PG */}
                                <div>
                                    <label className="block mb-2 font-semibold text-slate-700">
                                        UG or PG : <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-8">
                                        <label className="flex items-center gap-2 text-lg">
                                            <input
                                                type="radio" required
                                                name="ugOrPg" value="UG"
                                                checked={ugOrPg === "UG"}
                                                onChange={(e) => setStudentData((prevData) => ({ ...prevData, ugOrPg: e.target.value }))}
                                                className="scale-125"
                                            />
                                            UG
                                        </label>
                                        <label className="flex items-center gap-2 text-lg">
                                            <input
                                                type="radio" name="ugOrPg"
                                                value="PG" required
                                                checked={ugOrPg === "PG"}
                                                onChange={(e) => setStudentData((prevData) => ({ ...prevData, ugOrPg: e.target.value }))}
                                                className="scale-125"
                                            />
                                            PG
                                        </label>
                                    </div>
                                </div>
                                {/* Programme Stream */}
                                <div>
                                    <label className="block mb-2 font-semibold text-slate-700">
                                        Programme Stream : <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex flex-wrap gap-8">
                                        <label className="flex items-center gap-2 text-lg">
                                            <input
                                                type="radio" className="scale-125"
                                                name="procategory" value="Aided" required
                                                checked={procategory === "Aided"}
                                                onChange={(e) => setStudentData((prevData) => ({ ...prevData, procategory: e.target.value }))}
                                            />
                                            Aided
                                        </label>
                                        <label className="flex items-center gap-2 text-lg">
                                            <input
                                                type="radio" name="procategory"
                                                value="SFM" required
                                                checked={procategory === "SFM"}
                                                onChange={(e) => setStudentData((prevData) => ({ ...prevData, procategory: e.target.value }))}
                                                className="scale-125"
                                            />
                                            SFM
                                        </label>
                                        <label className="flex items-center gap-2 text-lg">
                                            <input
                                                type="radio" required
                                                name="procategory" value="SFW"
                                                checked={procategory === "SFW"}
                                                onChange={(e) => setStudentData((prevData) => ({ ...prevData, procategory: e.target.value }))}
                                                className="scale-125"
                                            />
                                            SFW
                                        </label>
                                    </div>
                                </div>
                                {/* Semester */}
                                <div>
                                    <label className="block mb-2 font-semibold text-slate-700">
                                        Semester : <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex flex-wrap gap-6">
                                        {["I", "II", "III", "IV", ...(ugOrPg !== "PG" ? ["V", "VI"] : [])].map((sem) => (
                                            <label key={sem} className="flex items-center gap-2 text-lg">
                                                <input
                                                    type="radio" name="semester"
                                                    value={sem} required
                                                    checked={semester === sem}
                                                    onChange={(e) => setStudentData((prevData) => ({ ...prevData, semester: e.target.value }))}
                                                    className="scale-125"
                                                />
                                                {sem}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                {/* Hostel */}
                                <div>
                                    <label className="block mb-2 font-semibold text-slate-700">
                                        Hostel : <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-8">
                                        <label className="flex items-center gap-2 text-lg">
                                            <input
                                                type="radio" name="hostel"
                                                value="YES" required
                                                checked={hostel === "YES"}
                                                onChange={(e) => setStudentData((prevData) => ({ ...prevData, hostel: e.target.value }))}
                                                className="scale-125"
                                            />
                                            Yes
                                        </label>
                                        <label className="flex items-center gap-2 text-lg">
                                            <input
                                                type="radio" name="hostel"
                                                value="NO" required
                                                checked={hostel === "NO"}
                                                onChange={(e) => setStudentData((prevData) => ({ ...prevData, hostel: e.target.value }))}
                                                className="scale-125"
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/* Student Details Section */}
                            <h3 className="text-xl mb-2 font-semibold bg-gray-600 p-3 rounded mt-5 text-white">
                                Student Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-black p-6 rounded-lg bg-gray-50 shadow-md">
                                {/* Register No. */}
                                <div>
                                    <label className="block mb-2 font-semibold text-slate-700">
                                        Register No. : <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text" id="registerNo" name="registerNo"
                                        value={registerNo || ""} required readOnly
                                        className="w-full p-2 border border-black rounded-md text-slate-950"
                                    />
                                </div>
                                {/* Name */}
                                <div>
                                    <label className="block mb-2 font-semibold text-gray-700">Name :</label>
                                    <input
                                        type="text" name="name" value={name || ""}
                                        className="w-full p-2.5 uppercase border border-gray-600 rounded-lg text-gray-900"
                                        onChange={(e) => setStudentData((prevData) => ({ ...prevData, name: e.target.value }))}
                                    />
                                </div>
                                {/* Department */}
                                <div>
                                    <label className="block mb-2 font-semibold text-gray-700">Department :</label>
                                    <select
                                        name="dept" value={dept || ""}
                                        onChange={(e) => setStudentData((prevData) => ({ ...prevData, dept: e.target.value }))}
                                        className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
                                    >
                                        <option value="">Select</option>
                                        <option value="UAI">UAI</option>
                                        <option value="UAM">UAM</option>
                                        <option value="UAR">UAR</option>
                                        <option value="UBA">UBA</option>
                                        <option value="UBO">UBO</option>
                                        <option value="UBT">UBT</option>
                                        <option value="UCC">UCC</option>
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
                                        <option value="UIC">UIC</option>
                                        <option value="UIF">UIF</option>
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
                                        <option value="PSW">PSW</option>
                                        <option value="PTA">PTA</option>
                                        <option value="PZO">PZO</option>
                                        <option value="MBA">MBA</option>
                                        <option value="MCA">MCA</option>
                                    </select>
                                </div>
                                {/* Section */}
                                <div>
                                    <label className="block mb-2 font-semibold text-gray-700">Section :</label>
                                    <select
                                        name="section" value={section || ""}
                                        onChange={(e) => setStudentData((prevData) => ({ ...prevData, section: e.target.value }))}
                                        className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
                                    >
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
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-7 border border-gray-600 bg-white shadow-sm p-6 rounded-lg">
                                {/* Mobile No. */}
                                <div>
                                    <label className="block mb-2 font-semibold text-slate-700">
                                        Mobile No. : <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text" maxLength="10"
                                        value={mobileNo} name='mobileNo'
                                        onChange={(e) => setStudentData((prevData) => ({ ...prevData, mobileNo: e.target.value }))}
                                        className="w-full p-2 border border-black rounded-md text-slate-950"
                                    />
                                </div>
                                {/* Religion */}
                                <div>
                                    <label className="block mb-2 font-semibold text-gray-700">Religion :</label>
                                    <select
                                        name="religion" value={religion} required
                                        onChange={(e) => setStudentData((prevData) => ({ ...prevData, religion: e.target.value }))}
                                        className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
                                    >
                                        <option value="">Select</option>
                                        <option value="ISLAM">Islam</option>
                                        <option value="HINDU">Hindu</option>
                                        <option value="CHRISTIAN">Christian</option>
                                        <option value="OTHERS">Others</option>
                                    </select>
                                </div>
                                {/* Aadhar No. */}
                                <div>
                                    <label className="block mb-2 font-semibold text-gray-700">Aadhar No. :</label>
                                    <input
                                        type="text" value={aadhar} maxLength="10" name='aadhar'
                                        onChange={(e) => setStudentData((prevData) => ({ ...prevData, aadhar: e.target.value }))}
                                        className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
                                    />
                                </div>
                                {/* Last Credited Amount */}
                                <div>
                                    <label className="block mb-2 font-semibold text-gray-700">Last Time Credited Amount :</label>
                                    <input
                                        type="text" value={lastCreditedAmt} readOnly
                                        className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
                                    />
                                </div>
                            </div>
                            <div className="border border-black p-6 rounded-lg bg-gray-50 shadow-md space-y-6 mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Parent Name */}
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-700">Parent / Guardian Name :</label>
                                        <input
                                            type="text" value={fatherName} name='fatherName'
                                            onChange={(e) => setStudentData((prevData) => ({ ...prevData, fatherName: e.target.value }))}
                                            className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
                                        />
                                    </div>
                                    {/* Parent Phone No */}
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-700">Parent / Guardian No. :</label>
                                        <input
                                            type="text" value={fatherNo} name='fatherNo'
                                            onChange={(e) => setStudentData((prevData) => ({ ...prevData, fatherNo: e.target.value }))}
                                            className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Parent Occupation */}
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-700">Occupation :</label>
                                        <input
                                            type="text" value={fatherOccupation} name='fatherOccupation'
                                            onChange={(e) => setStudentData((prevData) => ({ ...prevData, fatherOccupation: e.target.value }))}
                                            className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
                                        />
                                    </div>
                                    {/* Annual Income */}
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-700">Annual Income :</label>
                                        <input
                                            type="text" value={annualIncome} name='annualIncome'
                                            onChange={(e) => setStudentData((prevData) => ({ ...prevData, annualIncome: e.target.value }))}
                                            className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
                                        />
                                    </div>
                                    {/* Sibling Detail */}
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-700">Siblings :</label>
                                        <div className="flex gap-6 py-2">
                                            <label className="flex items-center gap-2 text-lg">
                                                <input
                                                    type="radio" value="Yes"
                                                    checked={siblings === 'Yes'}
                                                    className="scale-125" name='siblings'
                                                    onChange={(e) => setStudentData((prevData) => ({ ...prevData, siblings: e.target.value }))}
                                                />
                                                <span>Yes</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-lg">
                                                <input
                                                    type="radio" value="No"
                                                    checked={siblings === 'No'}
                                                    className="scale-125" name='siblings'
                                                    onChange={(e) => setStudentData((prevData) => ({ ...prevData, siblings: e.target.value }))}
                                                />
                                                <span>No</span>
                                            </label>
                                        </div>
                                    </div>
                                    {/* Conditional Sibling Fields */}
                                    {siblings === 'Yes' && (
                                        <>
                                            <div>
                                                <label className="block mb-2 font-semibold text-gray-700">Siblings No :</label>
                                                <input
                                                    type="text" value={siblingsNo} name='siblingsNo'
                                                    onChange={(e) => setStudentData((prevData) => ({ ...prevData, siblingsNo: e.target.value }))}
                                                    className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-2 font-semibold text-gray-700">Siblings Occupation :</label>
                                                <input
                                                    type="text" value={siblingsOccupation} name='siblingsOccupation'
                                                    onChange={(e) => setStudentData((prevData) => ({ ...prevData, siblingsOccupation: e.target.value }))}
                                                    className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-2 font-semibold text-gray-700">Siblings Income :</label>
                                                <input
                                                    type="text" value={siblingsIncome} name='siblingsIncome'
                                                    onChange={(e) => setStudentData((prevData) => ({ ...prevData, siblingsIncome: e.target.value }))}
                                                    className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            {/* Address */}
                            <div className="border border-black p-6 rounded-lg bg-gray-50 shadow-md space-y-6 mt-6">
                                <div>
                                    <label className="block mb-2 font-semibold text-gray-700">Permanent Address :</label>
                                    <input
                                        type="text" value={address} name='address'
                                        onChange={(e) => setStudentData((prevData) => ({ ...prevData, address: e.target.value }))}
                                        className="w-full p-2.5 border border-gray-600 rounded-lg"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-700">State :</label>
                                        <select
                                            type="text" value={state} name='state'
                                            className="w-full p-2.5 border border-gray-600 rounded-lg"
                                            onChange={(e) => setStudentData((prevData) => ({ ...prevData, state: e.target.value }))}
                                        >
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
                                            <option value="Andaman and Nicobar Islands">
                                                Andaman and Nicobar Islands
                                            </option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="Dadra and Nagar Haveli and Daman and Diu">
                                                Dadra and Nagar Haveli and Daman and Diu
                                            </option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                            <option value="Ladakh">Ladakh</option>
                                            <option value="Lakshadweep">Lakshadweep</option>
                                            <option value="Puducherry">Puducherry</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-700">District :</label>
                                        <select
                                            type="text" value={district} name='district'
                                            className="w-full p-2.5 border border-gray-600 rounded-lg"
                                            onChange={(e) => setStudentData((prevData) => ({ ...prevData, district: e.target.value }))}
                                        >
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
                                        <label className="block mb-2 font-semibold text-gray-700">Pincode:</label>
                                        <input
                                            type="text" value={pin} name='pin'
                                            className="w-full p-2.5 border border-gray-600 rounded-lg"
                                            onChange={(e) => setStudentData((prevData) => ({ ...prevData, pin: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-semibold text-sm text-gray-700">
                                            Jamath / Self Declaration Letter {studentType === 'Fresher' && <span className="text-red-600">*</span>}:
                                        </label>
                                        <input
                                            type="file" name="jamath"
                                            accept="image/jpeg,image/jpg,image/png"
                                            onChange={handleFileChange}
                                            className="w-full p-2 border border-gray-600 rounded-lg text-gray-900 bg-white"
                                        />
                                        {fileName && (<p className="mt-1 text-sm text-gray-700">Selected File : {fileName}</p>)}
                                    </div>
                                </div>
                            </div>
                            {/* Buttons */}
                            <div className="flex justify-end space-x-4 mt-6">
                                <button type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
                                >
                                    Update
                                </button>
                                <button type="button" onClick={() => setDeleteModal(true)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
                                >
                                    Delete
                                </button>
                                <button type="button" onClick={props.closeModifyModal}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
                                >
                                    Close
                                </button>

                            </div>
                        </form>
                    </div >
                </div >
            )}
            {deleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center relative transition-all">
                        <div className="flex justify-center mb-4">
                            <GoAlert className="text-red-500 text-5xl animate-pulse" />
                        </div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">
                            Confirm Deletion
                        </h4>
                        <p className="text-gray-600 text-sm mb-6">
                            Are you sure you want to delete the record for <span className="font-bold text-black">{registerNo}</span> ?
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDeleteConfirmed}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                            >
                                Yes, Delete It
                            </button>
                            <button
                                onClick={() => setDeleteModal(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModifyModal;
