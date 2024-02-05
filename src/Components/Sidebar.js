
import React,{useState, useEffect} from 'react'
import {jwtDecode} from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import dashboardIcon from '../assets/icons8-dashboard-100.png'
import blogIcon from '../assets/icons8-blog-100.png'
import aboutIcon from '../assets/icons8-about.svg'
import contactIcon from '../assets/icons8-contact-details-100.png'
import galleryIcon from '../assets/icons8-gallery.svg'
import logoutIcon from '../assets/icons8-logout-100.png'
import settingIcon from '../assets/icons8-setting.svg'
import profileIcon from '../assets/icons8-user-100.png'


function Sidebar({toggle}) {


  const logout = () =>{;}

  return (
    <>
    <div className={`${toggle?'sidebar-wrapper':'sidebar-wrapper_slide-out'}`} >
      <div className="logo">
        <Link className='school-name' to={'/'}>
          <span>Sebitja Secondary</span>
        </Link>
        
         
      </div>
  
      <div className="sidebar_links">
         <Link className='side-link'>
            <img src={dashboardIcon}/>
            <h6>Dashboard</h6>
         </Link>
         <Link className='side-link'>
            <img src={blogIcon}/>
            <h6>Blog</h6>
         </Link>

         <Link className='side-link'>
            <img src={aboutIcon}/>
            <h6>About</h6>
         </Link>

         <Link className='side-link'>
            <img src={contactIcon}/>
            <h6>Contact</h6>
         </Link>

         <Link className='side-link'>
            <img src={galleryIcon}/>
            <h6>Gallery</h6>
         </Link>

         <Link className='side-link'>
            <img src={profileIcon}/>
            <h6>User</h6>
         </Link>
          
          
          
      </div>

      <div className='logout'>
          <Link className='side-link_logout'onClick={()=>localStorage.removeItem('jwtToken')} >
            <img src={logoutIcon} />
            <h6>Logout</h6>
         </Link>
         <Link className='side-link_logout'>
            <img src={settingIcon}/>
            <h6>settings</h6>
         </Link>
      </div>
    </div>
    
    </>
  )
}

export default Sidebar