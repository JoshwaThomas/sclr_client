import { useEffect, useState, React } from 'react';
import axios from "axios";

function Action() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/fresh')
            .then(users => setUsers(users.data))
            .catch(err => console.log(err))
    }, []);

    return (
        <div>
            <div className='mt-6 pl-0'>
                <div className="grid grid-cols-6 w-auto bg-amber-200 p-4 border border-white gap-1 text-center">
                    <div className="font-bold border border-white text-center">Application</div>
                    <div className="font-bold border border-white text-center">Dept</div>
                    <div className="font-bold border border-white text-center">Register No.</div>
                    <div className="font-bold border border-white text-center">Name</div>
                    <div className="font-bold border border-white text-center">Action</div>
                    <div className="font-bold border border-white text-center">Application View</div>
                </div>
                {
                    users.map((user) => {
                        return (
                            <div className="grid grid-cols-6 w-auto bg-amber-200 p-4 border border-white gap-1 text-center">
                                <div className="font-bold border border-white text-center">{user.fresherOrRenewal}</div>
                                <div className="font-bold border border-white text-center">{user.dept}</div>
                                <div className="font-bold border border-white text-center">{user.registerNo}</div>
                                <div className="font-bold border border-white text-center">{user.name}</div>
                                <div className="font-bold border border-white text-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white py-1 px-3  hover:bg-black rounded-lg mt-1"
                                    >
                                        View
                                    </button>
                                </div>
                                <div className='border border-white text-center py-1'>
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

                        )
                    })}

            </div>
        </div>
    );
}

export default Action;
