import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };
  return (
    <>
    {/* Akshit Bariya */}
    <div className='container'>
        <div className='formwrapper'>
        <span className='logo'> Akshit Bariya</span>
        <span className='title'> Log in</span>
        <form className='form' onSubmit={handleSubmit}>
        <input  type="email" placeholder='Email'/>
        <input  type="password" placeholder='Password'/>
    
        <button>Sign in</button>
        {err && <span>Something went wrong</span> }

        </form>
        <p className="para">you don't have account? <Link to ='/Register'>Register</Link></p>
        </div>
    </div>
    </>
  )
}

export default Login;
