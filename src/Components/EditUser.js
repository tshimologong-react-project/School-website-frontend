
import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/EditorUserStyle.css';
import addIcon from '../assets/addIcon.svg';
import axiosInstance from '../AxiosInstanceConfig/axiosInstance'


const EditUser = ({ userName, displayUser, reload }) => {
  const [userData, setUserData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [isDefault, setIsDefault] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const inputRef = useRef(null);
 

  useEffect(() => {
    getUserByUserName();
  }, [userName]);

  const getUserByUserName = async () => {
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
      const response = await axiosInstance.put(`/updateUser/${userName}`, {
        firstName: data.firstName,
        lastName: data.lastName,
        photo: userData.photo,
      });
      console.log('User updated successfully:', response.data);
      setValue('firstName', '');
      setValue('lastName','');
      setImagePreview(addIcon)


      reload();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="edit-component">
      <div className='edit-component_div'>


      <form className="editorForm" onSubmit={handleSubmit(editUser)}>
      <h4>Edit user</h4>
      <fieldset className='fieldset_edit'>

      <div className="image-file">
      
      <div className="image-file__holder">
        {isDefault ? (
          <img className="image-selected-edit" src={imagePreview} alt="upload" />
        ) : (
          <div className="image-default-wrapper">
            <img className="image-selected-edit" src={imagePreview} alt="upload" />
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

    </div>
  );
};

export default EditUser;

