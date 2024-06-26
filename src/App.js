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


// import React, { createContext, useReducer } from 'react';
// import './App.css';
// import Home from './screens/Home';
// // import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
// import { CartProvider } from './components/ContextReducer';
// import { initialState, reducer } from './components/reducer/UserReducer.js';
// import Login from './screens/Login';
// import Signup from './screens/Signup';

// export const UserContext = createContext()
// function App() {
//   const [state , dispatch] = useReducer(reducer, initialState)
//   return (
//   <>
//   <CartProvider>
//   <BrowserRouter>
    
//     <Routes>
//       <Route exact path="/" element={<Home/>} />
//       <Route exact path="/login" element={<Login/>} />
//       <Route exact path="/createuser" element={<Signup/>} />
//       {/* <Route exact path="/cart" element={<Cart />} /> */}
//     </Routes>
  
// </BrowserRouter>
//   </CartProvider>
//   </>
//   );
// }

// export default App;



// // constRouting = () =>{
// //   return(
// //     <Switch>
// //       <Route exact path="/">
// //         <Home/>
// //       </Route>
// //       <Route exact path="/login">
// //         <Login/>
// //       </Route>
// //       <Route exact path="/createuser">
// //         <Signup/>
// //       </Route>
// //       <Route >
// //         <Home/>
// //       </Route>
// //     </Switch>
    
// //   )
// // }

// // const App =() =>{
// //   const [state , dispatch] = useReducer(reducer, initialState)

// //   return(
// //     <>
// //       <UserContext.Provider>
// //         <Navbars/>
// //         <Routing/>
// //       </UserContext.Provider>
// //     </>
// //   )
// // }