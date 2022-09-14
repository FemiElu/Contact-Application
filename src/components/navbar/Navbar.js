import React from 'react';
import { Link } from 'react-router-dom'; 



const Navbar = () => {

  return (
    <div>
     <nav className='navbar navbar-dark bg-dark'>
        <div className='container'>
                <Link to={'/'} className='navbar-brand'>
                    <i className='fa fa-mobile text-warning'/>
                    Contact  <span className="text-warning">Manager</span>
                </Link>
        </div>
     </nav>
    </div>
  )
}

export default Navbar