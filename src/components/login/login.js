import React, { useState } from 'react';
import jmc from '../login/jmclogo.png';
import Map from '../../assets/victim1-map.gif'
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
                    else if (staffId === `${role}`) {
                        navigate('/student/dashboard', { state: { id: staffId } });
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

    const topContainerStyle = {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // padding: '20px',
        display: 'flex',
        // backgroundColor:'red',
        marginBottom:'20px'

    };

    const bottomContainerStyle = {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // padding: '20px',
        display: 'flex',
        borderRadius:'15px 15px 15px 15px'
    };

    const logoStyle = {
        width: '150px',
        height: '170px',
        marginRight: '10px'
    };
    const leftcontainerfile={
        height:'480px',
        width:'500px',

    };
    const logincontainer={
        height:'480px',
        width:'400px'
        
    };
    const loginbg={
        backgroundColor:'white',
        height:'320px',
        width:'330px',
        borderRadius:'15px 15px 15px 15px'
    };

    const sclimg = {
        width: '500px',
        height: '300px',
        alignItems: 'left',

    };
    const jmctext1={
        fontWeight:'bolder',
        fontSize:'250%',

        
    }
    const jmctext2={
        fontWeight:'bold',
          fontSize:'35px',
          marginTop:'8px',
          marginLeft:'5px'
    }
    const jmctext3={
        fontWeight:'bold',
        fontSize:'25px',
        marginTop:'0px'
        
        

    }
    const jmctext4={
        fontWeight:'bold',
        fontSize:'150%',
        marginTop:'5px'
    }

    const jmccontent = {
        display:'flex'
    }
    return (

        <div>

            <div style={topContainerStyle}>
                <div>
                    <img src={jmc} alt='LOGO' style={logoStyle} className='mt-2 ml-52 ' />
                </div>
                <div  className='mt-3 mr-32 w-3/4 text-center '>

                <div style={jmccontent}>
                    <div>
                    <p className="ml-16 " style={jmctext1}>JAMAL MOHAMED COLLEGE</p>
                    </div>
                    <div></div>
                    <p className="" style={jmctext2}>(Autonomous)<br /></p>
                    </div>
                    <p className="" style={jmctext3}>TIRUCHIRAPPALLI - 620 020<br /></p>
                    <p className="-ml-10" style={jmctext4}>College Sponsored Application Form for Poor and Meritorious Students<br /></p>
                </div>
            </div>

            <div style={bottomContainerStyle} className='bg-orange-500 ml-24 mr-24'>
                <div style={leftcontainerfile} className=''>
                <img src={Map} alt='LOGO' style={sclimg} className='mt-10 ml-10'/>
                <span className="text-2xl font-bold text-center ml-28 mt-28 text-white  animate-pulse">Jamalians Around The World</span><br></br><br></br>
                <span className="text-2xl font-bold text-center ml-32 mt-20 text-white  animate-pulse">Shows Us The Right Path</span>
           
          
                </div>
                <div style={logincontainer} className='mr-24 py-32 px-32 mr-24'>
                    <div style={loginbg} className='-mt-12 ml-36'>
                <form onSubmit={Submit}>
                        <h1 className="text-2xl mb-8 font-bold pl-32 pt-8">LOGIN</h1>
                        <div className='pl-10'>
                            <input
                                type="text"
                                value={staffId}
                                onChange={(e) => setStaffId(e.target.value)}
                                className="placeholder-gray-500 border font-mono mb-6 px-4 py-2 rounded-md"
                                placeholder="Username"
                                style={{ width: '250px', color: 'black' }}
                            />
                        </div>
                        <div className='pl-10'>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="placeholder-gray-500 border font-mono mb-6 px-4 py-2 rounded-md"
                                placeholder="Password"
                                style={{ width: '250px', color: 'black' }}
                            />
                        </div>
                        <button type='submit' className="rounded-full font-mono px-4 py-2 mt-5 ml-10 bg-orange-500  hover:bg-black text-white font-bold">Login</button>
                        <button type='button' className="rounded-full font-mono px-5 py-2 ml-24 bg-orange-500  hover:bg-black text-white font-bold" onClick={() => navigate('/')}>Back</button>
                    </form>
                    </div>
                </div>
            </div>



        </div>




    );
}

export default TextBox;
