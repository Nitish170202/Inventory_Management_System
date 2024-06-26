import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Signup from './Signup';

export default function Signup() {
    // const history = useHistory();
    const Navigate = useNavigate();

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "" });


    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password} = credentials;

        const response = await fetch("/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name , email , password})
        })
        const data = await response.json()
        console.log(data);
        if(!data.success){
            window.alert("Invalid Registration");
            console.log("Invaild Registration")
        }
        else{
            Navigate('/login');
            // localStorage.setItem('authToken',data.authToken);
            window.alert("Registration Successful");
            console.log("Registration Successful");
            

        }
    }


    return (
        <>
           <div style={{backgroundImage: 'url("https://southerndemolition.co.nz/wp-content/uploads/2023/10/weatherboard.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
           <h1 className='my-5 fs-1' style={{color:'black'}}><marquee><b>Welcome to Sign-Up Page</b></marquee></h1>
            <div className='container w-50 m-auto mt-5 border bg-dark border-success rounded'>
            <div className='container my-5' style={{ color: "white", fontWeight: "30px" }}>
                <form method='post'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>

                </form>
            </div>
            </div>
           </div>
        </>
    )
}
