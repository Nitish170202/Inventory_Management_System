import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbars';


export default function Login() {
const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = credentials;

        const response = await fetch("/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email , password })
        })
        const data = await response.json()
        console.log("signin data ",data);
        // console.log(json(data.message));
        if(!data.success){
            window.alert("Invalid Credentials");
        }
        else{
            window.alert("Login Successfull");
            let localStorage = window.localStorage;
            localStorage.setItem('userEmail' , credentials.email);
            localStorage.setItem('authToken' , data.authToken)
            console.log("login user is :", data.username)
            global.loginUser = data.username;
            navigate("/");
            
        }
    
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div style={{backgroundImage:'url("https://th.bing.com/th/id/OIP.d_ZhRkJmvdtZ87z9rv80OAHaDt?rs=1&pid=ImgDetMain?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' method='post'>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label" style={{"color":"white"}}>Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text" style={{"color":"white"}}>We'll never share your email with anyone.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label" style={{"color":"white"}}>Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <button type="submit" className="m-3 btn btn-success" onClick={handleSubmit}>Submit</button>
          <Link to="/createuser" className="m-3 mx-1 btn btn-danger">New User</Link>
        </form>

      </div>
    </div>
  )
}

