import React from 'react'

function report() {
    return (
        <div>
            <div className='grid grid-cols-4 gap-4 font-bold'>
                <button

                    className="px-3 py-9 bg-yellow-300 text-white hover:bg-black rounded-lg"
                >
                    Student Reports
                </button>
                <button

                    className="px-4 py-9 ml-2 bg-yellow-300 text-white hover:bg-black rounded-lg"
                >
                    Category Reports
                </button>
                <button

                    className="px-4 py-9 ml-2 bg-yellow-300 text-white hover:bg-black rounded-lg"
                >
                    Accepted / Rejected Application
                </button>
                <button

                    className="px-4 py-9 ml-2 bg-yellow-300 text-white hover:bg-black rounded-lg"
                >
                    Funds Reports
                </button>
            </div>
        </div>
    )
}

export default report