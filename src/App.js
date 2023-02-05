
import './App.css';
import Home from "./Component/Pages/Home"
import Register from "./Component/Pages/Register"
import Login from "./Component/Pages/Login"

import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
function App() {
const {currentUser}=useContext({AuthContext});
const ProtectedRoute =({children})=>{
  if(!currentUser){
    return <Navigate to="/login"/>;
  }
  return children
}

  return (
    // <Login/>
    // <h1>Akshit</h1>
      <BrowserRouter>
      {console.log("Akshit")}
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        

      </Routes>
      </BrowserRouter>
 
  );
}

export default App;
