import React, { useContext } from 'react'

import {auth} from "../../firebase"
import { signOut } from 'firebase/auth';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {

  const {currentUser}=useContext(AuthContext)
  return (
    <div className='navbar'>
      <span className='logo'>Chat App</span>
      <div className='navbar-right'>
        <img src={currentUser.photoURL} alt='' className='navbar-right-left'/>
        <span className='navbar-right-center'>{currentUser.displayName}</span>
        <button className='navbar-right-right' onClick={()=>signOut(auth)}>Log out</button>
      </div>   
    </div>
  )
}

export default Navbar;

