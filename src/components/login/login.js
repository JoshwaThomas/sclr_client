import React, { useState } from 'react';
import jmc from '../login/jmclogo.png';
import Map from '../../assets/victim1-map.gif'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TextBox() {
    const [staffId, setStaffId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const Submit = (e) => {
        e.preventDefault();
        console.log('API URL:', apiUrl);
        console.log("Submitting form with:", { staffId, password });

        axios.post(`${apiUrl}/api/admin/login/`, {
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
                        navigate(`/student/${staffId}/status`, { state: { id: staffId } });
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
        display: 'flex',
        marginBottom:'5px'

    };

    const bottomContainerStyle = {
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

            <div style={topContainerStyle} className=' -mt-5'>
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

            <div style={bottomContainerStyle} className='bg-orange-500  ml-24 mr-24'>
                <div style={leftcontainerfile} className=''>
                <img src={Map} alt='LOGO' style={sclimg} className='mt-10 ml-10'/>
                <span className="text-2xl font-bold text-center ml-28 mt-28 text-white  animate-pulse">Jamalians Around The World</span><br></br><br></br>
               
           
          
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
                 <span className="text-2xl absolute font-bold top-28 right-48 text-center ml-32 mt-20 text-white">Show Us The Right Path</span>
                <h2 className="text-2xl absolute bottom-0 ml-12 font-bold mb-4 text-center text-white">"Elevating the Next Generation Through Alumni & Well-Wishers"</h2>
            </div>



        </div>




    );
}

export default TextBox;
