import React from 'react'

function action() {
    return (
        <div>
            <div className=' mt-6  pl-0'>
                <div class="grid grid-cols-4 bg-amber-200 p-4 border border-white gap-1 text-center ">
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