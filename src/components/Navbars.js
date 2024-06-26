import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbars() {

    const navigate = useNavigate();

const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/logoutHome");
}
return (
    <>
    <div style={{backgroundColor:'gray'}}>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          
          {(!localStorage.getItem("authToken")) ?
            <Link className="navbar-brand fs-4" to="/logoutHome"><b>Inventory Management System</b></Link>
            :
            
            <Link className="navbar-brand fs-4" to="/"><b>Inventory Management System</b></Link>
            
            }
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
          {(!localStorage.getItem("authToken")) ?
            <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                    {/* <Link className="nav-link active fs-5" aria-current="page" to="/generateqrcode" ><b>Generate QR Code</b></Link> */}
                </li>
                <li className="nav-item">
                    {/* <Link className="nav-link active fs-5" aria-current="page" to="/scanqrcode"><b>Scan QR Code</b></Link> */}
                </li>
            </ul>
            :
            <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                    <Link className="nav-link active fs-5" aria-current="page" to="/generateqrcode"><b>Generate QR Code</b></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active fs-5" aria-current="page" to="/scanqrcode"><b>Scan QR Code</b></Link>
                </li>
            </ul>
            }
            
            
            {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>
            <Link className="btn bg-white  mx-1" style={{borderColor:"black"}} to="/login">Login</Link>
            <Link className="btn bg-white   mx-1" style={{borderColor:"black"}} to="/createuser">Register</Link>

            </div>
            :
            <div>
            <div className='btn bg-white  mx-2' onClick={handleLogout}> Logout</div>
            </div>
            }
          </div>
        </div>
      </nav>

</div>
    </>
  )
}
