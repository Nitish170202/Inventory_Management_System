import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import LogoutHome from './screens/LogoutHome';
import QRCodeGenerator from './screens/QRCodeGenerator';
import ScanQRCode from './screens/ScanQRCode';
import Signup from './screens/Signup';

function App() {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/createuser" element={<Signup/>} />
      <Route exact path="/generateqrcode" element={<QRCodeGenerator/>} />
      <Route exact path="/scanqrcode" element={<ScanQRCode/>} />
      <Route exact path="/logoutHome" element={<LogoutHome/>} />
      
    </Routes>
  
</BrowserRouter>
  );
}

export default App;