import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export  const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Perform logout operation
        try {
          await logout();
          Swal.fire('Logged Out', 'You have been logged out successfully.', 'success');
        } catch (error) {
          console.error('Error logging out:', error);
          Swal.fire('Error!', 'Failed to log out.', 'error');
        }
      }
    });
  };

  return (
    <>
      

      <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <li><a> <Link to="usertype"><a>Who Uses Our Website</a></Link></a></li>
       
        <li><a> {user ? (
              <Link to="/taskdashboard"><a >Task Dashboard</a></Link>
            ) : (
              <Link to="/login"><a >Login</a></Link>
            )}</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl"><FontAwesomeIcon icon={faTasks} />To Do</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a> <Link to="usertype"><a className="text-lg">Who Uses Our Website</a></Link></a></li>
      <li>
      
      </li>
      <li><a> {user ? (
              <Link to="/taskdashboard"><a className="text-lg">Task Dashboard</a></Link>
            ) : (
              <Link to="/login"><a className="text-lg">Login</a></Link>
            )}</a></li>
    </ul>
  </div>
  <div className="navbar-end">
  {user && <h2><b>Welcome</b> {user.displayName}</h2>}
  {user && (
            <>
              
              <div className="avatar ml-4">
                <div className="w-12 rounded-full border-2 border-black">
                  <img src={user?.photoURL || "/public/placeholder.jpg"} alt="User Avatar" />
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn ml-4 bg-red-500"
              >
                Logout
              </button>
            </>
          )}
  </div>
</div>

      
    </>
  );
}


