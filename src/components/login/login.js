import React, { useState } from 'react';
import jmc from '../login/jmclogo.png';
import scl from '../login/sclr.png';
import { useNavigate } from 'react-router-dom';


function TextBox() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const outerFlexContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '120vh',
        backgroundColor: 'white',
        flexDirection: 'column',
        position: 'relative', // Add position relative to enable absolute positioning for the logo
    };

    const logoAndNameContainerStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '20px',
        display: 'flex',
       //    alignItems: 'center',
    };

    const logoStyle = {
        width: '150px',
        height: '190px',
        marginRight: '10px',
    };

  

    const flexContainerStyle = {
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center',
        height: '75vh',
        width: '80%',
        backgroundColor: '#FF6A00',
        position: 'relative',
        padding: '40px',
        
    };

    const formContainerStyle = {
        backgroundColor: 'white',
        height: '400px',
        marginRight: '65px',
        padding: '50px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };
    const sclimg ={
        width: '170px',
        height: '190px',
        alignItems: 'left',
    }

    return (
        <div style={outerFlexContainerStyle}>
            <div style={logoAndNameContainerStyle}>
                <img src={jmc} alt='LOGO' style={logoStyle} />
             {/*   <h1 style={collegeName}>JAMAL MOHAMED COLLEGE</h1>
                {/*(Autonomous College)<br></br>
                (XYZ)</h1> 
            */}
                
                <div>
                <span class="text-sm"><br></br></span>
                <span class=" text-5xl font-extrabold ">JAMAL MOHAMED COLLEGE </span>
                <span class="text-3xl font-bold">(Autonomous)<br></br></span>
                
                <span class="text-3xl font-bold 'text-center'">TIRUCHIRAPPALLI - 620 020<br></br></span>
                <span class="text-3xl font-bold">College Sponsered Application Form </span>
                <span class="text-3xl font-bold">for Poor and Meritorious Students <br></br></span>

                </div>

            </div>
            <div style={flexContainerStyle}>
            <img src={scl} alt='LOGO' style={sclimg} />
                <div style={formContainerStyle}>
                
                    <h1 className="text-2xl mb-8 font-bold">LOGIN</h1>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        className="placeholder-gray-500 border font-mono mb-6 px-4 py-2 rounded-md"
                        placeholder="Username"
                        style={{ width: '200px', color: 'black' }}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="placeholder-gray-500 border font-mono mb-6 px-4 py-2 rounded-md"
                        placeholder="Password"
                        style={{ width: '200px', color: 'black' }}
                    />
                    <button className="rounded-full font-mono px-4 py-2 bg-orange-500 text-white font-bold" onClick={() => navigate('/admin/dashboard')}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default TextBox;