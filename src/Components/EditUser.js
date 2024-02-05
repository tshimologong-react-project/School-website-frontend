
import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../styles/EditorUserStyle.css';
import addIcon from '../assets/addIcon.svg';
import axiosInstance from '../AxiosInstanceConfig/axiosInstance'


const EditUser = ({ userName, displayUser, reload_user,reload_admin,role }) => {
  const [userData, setUserData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [isDefault, setIsDefault] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const inputRef = useRef(null);
 

  useEffect(() => {getuser_byusername(); }, [userName]);

  const getuser_byusername = async () => {
    try {
      const response = await axiosInstance.get(`/findByUsername/${userName}`);
      setUserData(response.data);

      setValue('firstName', response.data.firstName);
      setValue('lastName', response.data.lastName);

      if (response.data.photo) {
        setImagePreview(`data:image/jpeg;base64,${response.data.photo}`);
        setIsDefault(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const load_details = () =>{
    if(role.includes('ROLE_USER')){ return reload_user()}
    else if(role.includes('ROLE_ADMIN')){return reload_admin()}}

  const handleImageFile = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURL = event.target.result;
        setUserData({
          ...userData,
          photo: dataURL.split(',')[1],
        });
        setImagePreview(dataURL);
        setIsDefault(false);
      };
      reader.readAsDataURL(file);
    }
  };


  const editUser = async (data) => {
    try {
      await axiosInstance.put(`/updateUser/${userName}`, {firstName: data.firstName,lastName: data.lastName,photo: userData.photo,});

      setValue('firstName', '');
      setValue('lastName','');
      setImagePreview(addIcon)

      displayUser(false)
      load_details()
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="edit-component">
        

      <form className="editorForm" onSubmit={handleSubmit(editUser)}>
      <h2>Edit user</h2>
      <fieldset className='fieldset_edit'>

      <div className="image-file">
      
      <div className="image-file__holder">
        {isDefault ? (
          <img className="image-selected-edit" src={imagePreview} alt="" />
        ) : (
          <div className="image-default-wrapper">
            <img className="image-selected-edit" src={imagePreview} alt="" />
          </div>
        )}
      </div>

      <div className="plus-icon" onClick={handleImageFile}>
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
          
        ></input>
        <img className="add-icon" src={addIcon} alt="add" />
      </div>
    </div>
    
      <h6>
        <i className="lni lni-unlock"></i> First Name
      </h6>
      <input type="text"  placeholder="Enter First Name" {...register('firstName')} />
      <h6>
        <i className="lni lni-unlock"></i> Last Name
      </h6>
      <input type="text" placeholder="Enter Last Name" {...register('lastName')} />



      </fieldset>

      <div className="edit-action-div">
        <button className="submit-edit" type="submit">
          Edit
        </button>
        <button className="cancel-edit" onClick={() => displayUser(false)}>
          Cancel
        </button>
      </div>
      </form>
     

    
      

    </div>
  );
};

export default EditUser;

