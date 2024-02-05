import React, { useRef, useState } from 'react'
import '../styles/AddUserStyle.css'
import logoImage from '../assets/aps-icon.jpg'
import addIcon from '../assets/addIcon.svg'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Topnav from './Topnav';

function AddUser() {


 const [userData, setuserData] = useState({
    firstName: '',
    lastName: '',
    userName:'',
    userPassword:'',
  });

  const { firstName, lastName, userName,userPassword} = userData;
 const [image, setImage] = useState(null);
 const inputRef = useRef(null);
 const navigate = useNavigate();



 const handleImageFile = () => {
   inputRef.current.click();
 };

 const handleInputChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
    
  };

 const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURL = event.target.result;
        setuserData({
          ...userData, 
          photo: e.target.files[0],
        });
        setImage(dataURL);
      
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();


    const dataToSend = new FormData();
    dataToSend.append('firstName', userData.firstName);
    dataToSend.append('lastName', userData.lastName);
    dataToSend.append('userName', userData.userName);
    dataToSend.append('userPassword', userData.userPassword);
    dataToSend.append('photo', userData.photo);
    dataToSend.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    try {
        if(image){ 
            await axios.post("http://localhost:8080/user/registration", dataToSend, {
        headers: {'Content-Type': 'multipart/form-data'}});
       alert('Data sent successfully!');
      
      setuserData({
        firstName: '',
        lastName: '',
        userName: '',
        userPassword:'',
        photo: null,
      });
      setImage(null);
      navigator('/usrdetails')
        }else { 
          alert('image required')
        }
      
    } 
    catch (error) {
    //   console.error('Error sending data:', error);
    //   alert(error)
      console.log(userData)
    }
  };

  const generateRandomPassword = () => {
    const length = 8; 
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  };

  const showAlert = () => {
    const password = generateRandomPassword();

    const inputField = document.getElementById('passwordInput');
    
      inputField.value = password;
      userData.userPassword = password
    
 
    alert(`Your random password is: ${password}`);
  };

  return (
    <div className='form-wrapper'>
      <Topnav/>
      <div className='form-wrapper_div'>
      <form className='add-user-form'  > 
      <h4>Add New User</h4> 
       <fieldset> 

       <div className='imageFile'>
          <div className='imageFile__holder'>
            {image ? (
              <img className='image-selected' src={image} alt='upload' />
            ) : (
              <div className='image-default-wrapper'>
                <img className='image-default' src={logoImage} alt='upload' />
              </div>
            )}
          </div>

          <div className='plus-icon' onClick={handleImageFile}>
            <input
              type='file'
              ref={inputRef}
              accept='image/*'
              style={{display:'none'}}
              onChange={handleImageChange}
              required
            ></input>
            <img className='add-icon' src={addIcon} alt='add' />
          </div>
        </div>


         <div className="Field"> 
           <label> 
             First name <sup>*</sup> 
           </label> 
           <input 
              onChange={(e) => handleInputChange(e)}
              value={firstName}
              name='firstName'
             placeholder="First name" 
           /> 
         </div> 

         <div className="Field"> 
           <label>Last name</label> 
           <input 
             onChange={(e) => handleInputChange(e)}
             value={lastName}
             name='lastName'
             placeholder="Last name" 
           /> 
         </div> 

         <div className="Field"> 
           <label> 
             Username <sup>*</sup> 
           </label> 
           <input 
              onChange={(e) => handleInputChange(e)}
              value={userName}
              name='userName'
             placeholder="Email" 
             required={true}
             type='email'
           /> 
         </div> 

         <div className="Field"> 
           <label> 
             Password <sup>*</sup> 
           </label> 
           <div className='input-gen-button'>
           <input 
             id='passwordInput'
             onChange={(e) => handleInputChange(e)}
             value={userPassword}
             name='userPassword'
             placeholder='Password' 
             type='text'
           /> 
           <Link  onClick={()=>showAlert()}>  Generate password  </Link> 
           </div>
         
         </div> 
       
         
       </fieldset> 
       <div className='admin-button'>
          <button  onClick={(e)=>handleSubmit(e)}>  Create account  </button>
      </div>
       
     </form> 
      </div>

     
    </div>
  )
}

export default AddUser
