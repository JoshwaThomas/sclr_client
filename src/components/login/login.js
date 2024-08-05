import React, { useState } from 'react';
import jmc from '../login/jmclogo.png';
import scl from '../login/sclr.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TextBox() {
    const [staffId, setStaffId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();

        console.log("Submitting form with:", { staffId, password });

        axios.post("http://localhost:3001/api/admin/login", {
            staffId, password, 
        })
        .then(res => {
            console.log("Response from server:", res.data);
            if (res.data.status === 'exist') {
                const role = res.data.role;
                if (role === 1) {
                    navigate('/admin/dashboard', { state: { id: staffId, role } });
                } else if (role === 2) {
                    navigate(`/staff/${staffId}/dashboard`, { state: { id: staffId, role } });
                }
                else if(staffId === `${role}`){
                    navigate('/student/dashboard', {state: {id: staffId}});
                }
            } else if (res.data.status === 'wrong password') {
                alert("Wrong Password");
            } else if (res.data.status === 'not exist') {
                alert("User does not exist");
            }
        })
        .catch(e => {
            alert("An error occurred. Please try again.");
            console.log(e);
        });
    };

    const outerFlexContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'white',
        flexDirection: 'column',
        position: 'relative',
    };

    const logoAndNameContainerStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '20px',
        display: 'flex',
    };

    const logoStyle = {
        width: '150px',
        height: '170px',
        marginRight: '10px',
    };

    const flexContainerStyle = {
        display: 'flex',
        marginTop:'140px',
        justifyContent: 'right',
        alignItems: 'center',
        height: '75vh',
        width: '80%',
        backgroundColor: '#FF6A00',
        position: 'relative',
        padding: '40px',
        borderRadius: '20px',
       
    };

    const formContainerStyle = {
        backgroundColor: 'white',
        height: '350px',
        marginRight: '65px',
        padding: '50px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const sclimg = {
        width: '300px',
        height: '300px',
        alignItems: 'left',
    };

    return (
        <div style={outerFlexContainerStyle}>
            <div style={logoAndNameContainerStyle}>
                <img src={jmc} alt='LOGO' style={logoStyle} className='-mt-8 ml-32 '/>
                <div className='-mt-5'>
                    <span className="text-sm"><br /></span>
                    <span className="text-5xl font-extrabold ml-3">JAMAL MOHAMED COLLEGE</span>
                    <span className="text-2xl font-bold ml-2">(Autonomous)<br /></span>
                    <span className="text-2xl font-bold text-center ml-72">TIRUCHIRAPPALLI - 620 020<br /></span>
                    <span className="text-2xl font-bold ml-6">College Sponsored Application Form for Poor and Meritorious Students<br /></span>
                </div>
            </div>
            <div style={flexContainerStyle}>
            
            <span className="text-2xl font-bold text-center mt-72 -mr-72  text-white  animate-pulse">Shows Us The Right Path</span>
           
                <img src={scl} alt='LOGO' style={sclimg} className='mr-56 -mt-20 '/>
                <div style={formContainerStyle}>
                    <form onSubmit={Submit}>
                        <h1 className="text-2xl mb-8 font-bold">LOGIN</h1>
                        <div>
                            <input
                                type="text"
                                value={staffId}
                                onChange={(e) => setStaffId(e.target.value)}
                                className="placeholder-gray-500 border font-mono mb-6 px-4 py-2 rounded-md"
                                placeholder="Username"
                                style={{ width: '250px', color: 'black' }}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="placeholder-gray-500 border font-mono mb-6 px-4 py-2 rounded-md"
                                placeholder="Password"
                                style={{ width: '250px', color: 'black' }}
                            />
                        </div>
                        <button type='submit' className="rounded-full font-mono px-4 py-2 mt-5 bg-orange-500 text-white font-bold">Login</button>
                        <button type='button' className="rounded-full font-mono px-4 py-2 ml-28 bg-orange-500 text-white font-bold" onClick={() => navigate('/')}>Back</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TextBox;
