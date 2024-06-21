import React from 'react';
import { useState } from 'react';

function Status() {

    const [personalDetails, setPersonalDetails] = useState({
        ugOrPg: '',
        semester: '',
        dob: '',
        registerNo: '',
        dept: '',
        gender: ''
    });

    const handleChangePersonal = (e) => {
        const { name, value } = e.target;
        setPersonalDetails({
            ...personalDetails,
            [name]: value
        });
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const checkStatus = {
            ...personalDetails
        };
        console.log(checkStatus);
        // Here you can send the formData to the server or perform other actions
    };
    return (
        <div>
            <div className="container mx-auto p-8">
                <form onSubmit={handleSubmit} className="space-y-4 ">

                    <div className='  text-white'>
                        <h3 className="text-xl mb-2 font-bold bg-gray-600 p-1">Application Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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

                            <div>
                                <label className="block mb-1">Department:</label>
                                <input
                                    type="text"
                                    name="dept"
                                    placeholder='Eg. UCS,PEN'
                                    value={personalDetails.dept}
                                    onChange={handleChangePersonal}
                                    className="w-full p-2 border rounded-md  text-slate-600"
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
                                <label className="block mb-1">Register No.:</label>
                                <input
                                    type="text"
                                    name="registerNo"
                                    value={personalDetails.registerNo}
                                    onChange={handleChangePersonal}
                                    className="w-70px p-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={personalDetails.dob}
                                    onChange={handleChangePersonal}
                                    className="w-70px p-2 border rounded-md text-slate-600"
                                    required
                                />
                            </div>


                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 "
                        >
                            Check Status
                        </button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Status