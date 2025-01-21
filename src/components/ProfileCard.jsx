import React, { useState, useRef } from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
  const Number = "17850487";
  const Email = "02210241.cst@rub.edu.bt";
  const Agency = "Digital Service Development";
  const City = "Thimphu";
  const Country = "Bhutan";
  // State for the cover photo and profile picture
  const [coverPhoto, setCoverPhoto] = useState('https://via.placeholder.com/800x300'); // Placeholder URL for cover photo
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150'); // Placeholder URL for profile pic
  
  const fileInputRef = useRef(null); // Ref for file input
  const [formData, setFormData] = useState({ firstName: 'John', lastName: 'Doe' }); // Sample form data
  
  // Handle file change for cover photo or profile picture
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (fileInputRef.current) {
          setCoverPhoto(reader.result); // Update cover photo
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file input click for changing the cover photo or profile picture
  const handleChangeCoverPhoto = () => {
    fileInputRef.current.click(); // Trigger file input on button click
  };
  const Post = "Officiating Chief of DSD"; 
  return (
    <div className="profile-card-container">
      <div className="card-hover">
        <div className="cover-photo" style={{ backgroundImage: `url(${coverPhoto})` }}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="profile-info">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <h2>{formData.firstName} {formData.lastName}</h2>
          <p>{Post}</p>
        </div>
        <div className="opportunities">
          <p>Phone Number: {Number}</p>
          <p>Email: {Email}</p>
          <p>Agency Name: {Agency}</p>
          <p>City: {City}</p>
          <p>Country: {Country}</p>
          <button className="view-profile" onClick={handleChangeCoverPhoto}>View</button>
        </div>
       
      </div>
    </div>
  );
};

export default ProfileCard;
