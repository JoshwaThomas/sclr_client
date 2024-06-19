import { useEffect, useState, React } from 'react';
import axios from "axios";

function Action() {

    const [users, setUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const res = await axios.get("http://localhost:3001/fresh");
            console.log(res.data);
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div>
            <div className='mt-6 pl-0'>
                <div className="grid grid-cols-5 bg-amber-200 p-4 border border-white gap-1 text-center">
                    <div className="font-bold border border-white text-center">Dept</div>
                    <div className="font-bold border border-white text-center">Register No.</div>
                    <div className="font-bold border border-white text-center">Name</div>
                    <div className="font-bold border border-white text-center">Action</div>
                    <div className="font-bold border border-white text-center">Application View</div>
                    
                    {users && users.map((user) => (
                        <React.Fragment key={user.id}>
                            <div className="grid grid-cols-5 bg-amber-200 p-4 border border-white gap-1 text-center">
                                <div>{user.dept}</div>
                                <div>{user.registerNo}</div>
                                <div>{user.name}</div>
                                <div className="font-bold border border-white text-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
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
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Action;
