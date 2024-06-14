import React from 'react'
import bannerImg from '../../assets/Checklist.jpg'
import { Link } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

// Initialize AOS
AOS.init();
export const Banner = () => {
  const {user}=useAuth()
    
  return (
    <>
    <div data-aos="fade-up" className="hero   min-h-screen min-w-full" style={{backgroundImage: `url(${bannerImg})`,}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Let's Explore</h1>
      <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
     
    {user?  <Link to='/taskdashboard'>    <button className="btn btn-primary">Get Started</button></Link>:<Link to='/login'>    <button className="btn btn-primary">Get Started</button></Link>}
  
    </div>
  </div>
</div>
    </>
  )
}
