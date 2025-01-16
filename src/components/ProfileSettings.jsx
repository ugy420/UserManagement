import React, { useState, useRef } from 'react';
import './ProfileSettings.css';
import Header from './Header';

const ProfileSettings = () => {
    // State for cover photo
    const [coverPhoto, setCoverPhoto] = useState('background.jpg');
    
    // Form state for personal settings
    const [formData, setFormData] = useState({
        firstName: 'Tim',
        lastName: 'Cook',
        phoneNumber: '(408) 996-1010',
        email: 'tcook@apple.com',
        city: 'New York',
        country: 'America',
        agencyName:'Agency A'
    });

    // File input reference
    const fileInputRef = useRef(null);

    // Handle cover photo change
    const handleChangeCoverPhoto = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setCoverPhoto(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Handle form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert('Profile updated successfully!');
        console.log('Updated Data:', formData);
    };

    return (
        <div className='profile-settings'>
            <div className="profile-settings-container">
                <div className="profile-card">
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
                        <img src={coverPhoto} alt="Profile" className="profile-pic" />
                        <h2>{formData.firstName} {formData.lastName}</h2>
                        <p>CEO of Apple</p>
                    </div>
                    <div className="opportunities">
                        <p>Opportunities applied <span className="count orange">32</span></p>
                        <p>Opportunities won <span className="count green">26</span></p>
                        <p>Current opportunities <span className="count">6</span></p>
                    </div>
                    <button className="view-profile" onClick={handleChangeCoverPhoto}>Change Profile</button>
                </div>

                <div className="account-settings">
                    <div className="tabs">
                        <h2>Contacts:</h2>
                        <div className="social-icons">
                            <i className="fa-brands fa-whatsapp"></i>
                            <i className="fa-brands fa-linkedin"></i>
                            <i className="fa-brands fa-telegram"></i>
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fa-brands fa-instagram"></i>
                        </div>
                    </div>
                    <form className="settings-form" onSubmit={handleFormSubmit}>
                        <label className='pSetting'>Personal Settings</label>
                        <div className='pSetting'></div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Agency Name</label>
                            <input
                                name="AgencyName"
                                value={formData.agencyName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <select
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                            >
                                <option>New York</option>
                                <option>Los Angeles</option>
                                <option>San Francisco</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                            >
                                <option>America</option>
                                <option>Bhutan</option>
                                <option>UK</option>
                            </select>
                        </div>
                        <button type="submit" className="update-btn">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
