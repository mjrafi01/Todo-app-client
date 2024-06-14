import React, { useState } from 'react'

import { useAuth } from '../../hooks/useAuth';
import { Link,useLocation,  useNavigate } from "react-router-dom";
import { GoogleLogin } from '../../Components/GoogleLogin';
export const SignUp = () => {
    
    const location=useLocation()
    const [passMatch, setPassMatch] = useState(true);
    const {createUser}=useAuth()
    const navigate = useNavigate()
   const from=location?.state?.from?.pathname || '/'
  
    const handleSUbmit= (e)=>{
        
        e.preventDefault();
    
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm_password = form.confirm_password.value;
    console.log(email,password,confirm_password)
    if (password !== confirm_password) {
        setPassMatch(false);
      }

      console.log(email, password, confirm_password);
    
      if (password === confirm_password) {
        createUser(email, password);
        // if (user) {
        //   navigate(from);
        // }
      }
    }
  return (
   <>
   
   <form onSubmit={handleSUbmit} className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-8">Register now!</h1>
       
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="password"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="confirm password"
                className="input input-bordered"
                name="confirm_password"
                required
              />
            </div>
            {!passMatch && (
              <div className="my-2">
                <p className="text-red-500">Passwords do not match!</p>
              </div>
            )}
            <div className="form-control mt-6">
              <input
                className="btn bg-red-500 text-white"
                type="submit"
                value="Register"
              />
            </div>
            {/* <div className="mt-6">
              <GoogleLogin />
            </div> */}
            <div className="mt-6">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-red-500">
                  Login
                </Link>
              </p>
              <div className="mt-6">
   <GoogleLogin></GoogleLogin>
   </div>
            </div>
          </div>
        </div>
      </div>
    </form>
   
   </>
  )
}
