import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './aboutus.css';
import Dashboard from './Dashboard';

function AboutUs() {
  const [contact, setContact] = useState([]);
  
  useEffect(() => {
    loadContact();
  }, []);

  const loadContact = async () => {
    try {
      const response = await axios.get("http://localhost:8080/contact/1");
      setContact(response.data);
    } catch (error) {
      console.error("Error loading users: ", error);
    }
  }

  const updateContact = async () => {
    try {
      // Assuming you want to send contact details for update
      const response = await axios.put('http://localhost:8080/contact/1', contact);
      alert('Contact updated successfully!');
      window.location.href = '/';
      // console.log(response.data)
    } catch (error) {
      // Assuming you want to send new contact details for creation
      const response = await axios.post('http://localhost:8080/contact', contact);
      alert('Contact created successfully!');
      window.location.href = '/';
      // console.log(response.data)
    }
  };

  const handleInputChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  return (


    <div className="container">
      <Dashboard/>
      <h1>About Us</h1>

          <div className="container__commentbox"> 
           <h3> Mission </h3>
           <div className="comment_box">
           <input
          type="text"
          name="mission"
          required="required"
          value={contact.mission|| ''}
          onChange={handleInputChange}
          className="textbox"
        />
        <button className="custom-update-btn" onClick={updateContact}>UPDATE</button>
           </div>
    </div>

    <div className="container__commentbox"> 
           <h3> Vision </h3>
           <div className="comment_box">
           <input
          type="text"
          name="vision"
          required="required"
          value={contact.vision || ''}
          onChange={handleInputChange}
          className="textbox"
        />
        <button className="custom-update-btn" onClick={updateContact}>UPDATE</button>
           </div>
    </div>

    
    </div>
  );
}

export default AboutUs;
 