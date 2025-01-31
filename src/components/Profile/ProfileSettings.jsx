import React, { useState, useRef } from 'react';
import './ProfileSettings.css'; // Ensure you have this CSS file linked properly

const ProfileSettings = () => {
    // State for cover photo and profile picture
    const [coverPhoto, setCoverPhoto] = useState('background.jpg');
    const [profilePic, setProfilePic] = useState('profile.jpg');
    
    // Form state for personal settings
    const [formData, setFormData] = useState({
        firstName: 'Tim',
        lastName: 'Cook',
        phoneNumber: '(408) 996-1010',
        email: 'tcook@apple.com',
        city: 'New York',
        country: 'America',
        agencyName: 'Agency A',
    });

    // File input references
    const fileInputRefCoverPhoto = useRef(null);
    const fileInputRefProfilePic = useRef(null);

    // Handle cover photo change
    const handleChangeCoverPhoto = () => {
        fileInputRefCoverPhoto.current.click();
    };

    // Handle profile picture change
    const handleChangeProfilePic = () => {
        fileInputRefProfilePic.current.click();
    };

    const handleFileChange = (event, isCoverPhoto) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (isCoverPhoto) {
                    setCoverPhoto(reader.result);
                } else {
                    setProfilePic(reader.result);
                }
            };
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
                    <div
                        className="cover-photo"
                        style={{ backgroundImage: `url(${coverPhoto})` }}
                        onClick={handleChangeCoverPhoto}
                    >
                        <input
                            type="file"
                            ref={fileInputRefCoverPhoto}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, true)}
                        />
                    </div>
                    <div className="profile-info">
                        <img
                            src={profilePic}
                            alt="Profile"
                            className="profile-pic"
                            onClick={handleChangeProfilePic}
                        />
                        <input
                            type="file"
                            ref={fileInputRefProfilePic}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, false)}
                        />
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
                                name="agencyName"
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
