import React, { useEffect, useRef, useState } from 'react'
import '../styles/AddUserStyle.css'
import logoImage from '../assets/icons8-user-100.png'
import addIcon from '../assets/addIcon.svg'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function AddUser() {


          const [userData, setuserData] = useState({firstName: '',lastName: '', userName:'',userPassword:'', });

          const { firstName, lastName, userName,userPassword} = userData;
          const [image, setImage] = useState(null);
          const [count,setCount] = useState(null)
          const inputRef = useRef(null);
          const navigate = useNavigate();


          useEffect(()=>{
            const count_user= async () => {

              try {const response = await axios.get('http://localhost:8080/user/count');setCount(response.data);}
              catch (error) { console.error('Error during login:', error);}}

              count_user();
          },[count])

          const count_state = () =>{
            if (count !== null) {
                  if(count === 0){ 
                    return true;
                  }
                  else{
                    return false;
                  }
                }
              }

        
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


            const save = async (get_data) =>{

              await axios.post("http://localhost:8080/user/registration", get_data, { headers: {'Content-Type': 'multipart/form-data'}});
              alert('Saved');
              
              setuserData({ firstName: '',lastName: '',userName: '',userPassword:'',photo: null,});
              setImage(null);
              navigate('/dashboard')
            }

            const handleSubmit = async (e) => {
              e.preventDefault();

              if (!firstName || !lastName || !userName || !userPassword || !image) {
                alert('Please fill in all required fields.');
                return;
              }

              const dataToSend = new FormData();
              dataToSend.append('firstName', userData.firstName);
              dataToSend.append('lastName', userData.lastName);
              dataToSend.append('userName', userData.userName);
              dataToSend.append('userPassword', userData.userPassword);
              dataToSend.append('photo', userData.photo);
              dataToSend.forEach((value, key) => {console.log(`${key}: ${value}`);});

              if(count_state()){

                  if(userData.userName === 'Admin' && userData.userPassword === 'Password'){

                    try { save(dataToSend)}
                    catch (error) { console.error('Error sending data:', error);}}
                  
                  else{alert('Only Admin Allowed To Register')}}

              else{
                try {save(dataToSend)}
                catch (error) { console.error('Error sending data:', error);} }};


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
      <div className="login-left">
            <div className="login-title_">
              <div className="login_logo">
                <i className="fa-solid fa-school"></i> 
                <p>Main<span>land</span></p>
              </div>
                <h1>Please register to create meaningful content for our website.</h1>
                <p className='login_subtitle'>Just register and login to start writing about your experiences 
                that you had at our wonderful school.</p>
            </div>
       </div>

      <div className='right_div'>
        
      <form className='add-user-form'  > 
      
       <fieldset> 
       <h4 className='heading'>Please register </h4> 
       <div className='imageFile'>
          <label> 
             Image<sup>*</sup> 
           </label>
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
             placeholder="First nam
             requirede" 
           /> 
         </div> 

         <div className="Field"> 
           <label>Last name</label> 
           <input 
             onChange={(e) => handleInputChange(e)}
             value={lastName}
             name='lastName'
             placeholder="Last name"
             required
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
              required ='true'
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
           <Link className='gen_pass-link' onClick={()=>showAlert()}>  Generate password  </Link> 
           </div>
         
         </div> 
       
         <div className='admin-button'>
          <button  className='submit'onClick={(e)=>handleSubmit(e)}>  Please register  </button>
          <button className='cancel'  onClick={()=>navigate('/dashboard')}>  Cancel  </button>
      </div>
       </fieldset> 

       
     </form> 
      </div>

     
    </div>
  )
}

export default AddUser
