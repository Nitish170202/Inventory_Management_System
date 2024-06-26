import React from 'react'
import ImageUpload from '../components/ImageUpload'
import Navbars from '../components/Navbars'
import OpenCamera from '../components/OpenCamera'


function ScanQRCode() {
  return (
    <div>
        <Navbars/>
        
        <div className='container' style={{display:'flex' , justifyContent:'space-between', marginTop:20}}>
          <div><ImageUpload/></div>
          <div>
            <OpenCamera/>
          </div>
        </div>
    </div>
  )
}

export default ScanQRCode