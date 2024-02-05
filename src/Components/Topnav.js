import React, { useEffect, useState } from 'react';
import '../styles/Topnav.css'; 
import {jwtDecode} from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';


const Topnav = () => {

  const [userName,setUserName] = useState('You are Offline')
  const token = localStorage.getItem('jwtToken')
  const naviagte = useNavigate()


  useEffect(()=>{
    
    try {
      const decodedTokenRole = jwtDecode(token).sub
      if(token){
        setUserName(decodedTokenRole)
    
      }else{
        console.log('please login')
        setUserName('')
      }
      
    } catch (error) {
      console.log(error)
    }
   
  },[token])



  return (
  
    <div className='topNav'>
        <div className="container">
          <div className='userlogins'>
              <span href="#" className="logo1" >078 3542 653</span>
              <span href="#" className="logo1">{userName}</span>
          </div>
          <div className='navbar-btns'>
            <Link className='portal' to={'/dashboard'}>Portal</Link>
            <button>Support us</button>
          </div>
        </div>
    </div>
  );
};
export default Topnav;

