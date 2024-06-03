import React from 'react'

function action() {
    return (
        <div>
            <div className="grid grid-cols-1  grid-cols-2 gap-2">
                <div>
                    <label className="block mb-1">UG or PG:</label>
                    <div className="space-x-4 inline-flex">
                        <div>
                            <input
                                type="radio"
                                id="Ug"
                                name="ugOrPg"
                                value="ug"

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
                                required
                            />
                            <label htmlFor="Pg"> PG</label>
                        </div>
                    </div>

                </div>
                <div>
                    <label className="block mb-1">Special Category:</label>
                    <select
                        name="specialCategory"

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
                <button className="px-4  py-2 font-bold bg-sky-500 text-white hover:bg-black  rounded-lg">
                   Find
                </button>
                </div>
            </div>
            <div className=' mt-6  pl-0'>
                <div class="grid grid-cols-4 bg-yellow-300 p-4 border border-white gap-1 text-center ">
                    <div className="font-bold border border-white  text-center  ">Dept</div>
                    <div className="font-bold border border-white  text-center ">Register No.</div>
                    <div className="font-bold border border-white  text-center  ">Name</div>
                    <div className="font-bold border border-white  text-center ">Action</div>
                    <div className='border border-white  text-center'>MCA</div>
                    <div className='border border-white  text-center'>23MCA001</div>
                    <div className='border border-white  text-center'>xxxx</div>
                    <div className='border border-white  text-center py-1'>
                        <button

                            className="px-3 py-1 bg-green-500 text-white hover:bg-black rounded-lg"
                        >
                            Accept
                        </button>
                        <button

                            className="px-4 py-1 ml-2 bg-red-500 text-white hover:bg-black rounded-lg"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default action