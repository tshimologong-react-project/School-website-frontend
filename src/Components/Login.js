import React, { useEffect, useState } from 'react'
import{useForm} from 'react-hook-form'
import axios from 'axios';
import {  Link, useNavigate } from 'react-router-dom'



const Login =  () => {

  const navigate = useNavigate(); 
  const [count,setCount] = useState(null)

  
    const {register,handleSubmit,formState:{errors}}=useForm();

    useEffect(()=>{
      const count_user= async () => {

        try {const response = await axios.get('http://localhost:8080/user/count');setCount(response.data);}
        catch (error) { console.error('Error during login:', error);}}

        count_user();
    },[count])

    const count_state = () =>{
      if (count !== null) {
            if(count === 0){ return false;}
            else{return true}}}


      const loginUser = async (data) => {

  
        try {
          const response = await axios.post('http://localhost:8080/authenticate/auth', {
            userName: data.userName, 
            userPassword: data.userPassword,
          });
          const token = response.data;
          if (!token.includes("<!DOCTYPE html>")) {
          
            localStorage.setItem('jwtToken',token);
            navigate('/dashboard')
 
          } else {
            console.error('Login failed with status:', response.status);
            alert('Incorrect credentials')
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
        
      }

 


    return (
    
        <div className="login-container">
          <div className="page-row">
             <div className="login-left-column">
                <div className="login-title-box">
                  <div className="login_logo">
                    <i className="fa-solid fa-school"></i> 
                    <p>Main<span>land</span></p>
                  </div> 
                   <h1>Please register to create meaningful content for our website.</h1>
                   <p className='login_subtitle'>Just register and login to start writing about your experiences 
                    that you had at our wonderful school.</p>
                </div>
             </div>
             <div className="login-right-column">
                <div className="login-form-box">
                  <h2>Please login </h2>

                  {count_state() ? (null):( <p id='register_text'>Not registered please <Link to={'/register'}>Register</Link></p>)}
                
                  <form onSubmit={handleSubmit(loginUser)}>
                  <h6><i className="lni lni-unlock"></i> email</h6>
                    <input type="text" placeholder='enter email'{...register('userName')}/>
                    <h6><i className="lni lni-unlock"></i> Password</h6>
                    <input  type="text" placeholder='enter password'{...register('userPassword')}/>
                    <div className='button_wrapper'>
                    <button type='onsubmit' > Login</button>
                    <Link className='cancel-login' to={'/'} > Cancel</Link>
                    </div>
                    
                  </form>
                </div>
             </div>
          </div>
        </div>
    )
}

export default Login
