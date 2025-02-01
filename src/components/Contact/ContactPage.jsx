import React from "react";
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="address-section">
          <h2 className="animated-heading">Our Address</h2>
          <p className="animated-text">FJHM+GRR, Chubachu, Thimphu</p>

          <div className="contact-details">
            <div className="detail animated-detail">
              <i className="fas fa-fax"></i>
              <p>Fax: +975-02-328440</p>
            </div>
            <div className="detail animated-detail">
              <i className="fas fa-phone"></i>
              <p>Tele: +975-02-323215</p>
            </div>
            <div className="detail animated-detail">
              <i className="fas fa-mail-bulk"></i>
              <p>Post Box: 1234</p>
            </div>
          </div>
        </div>

        <div className="form-section">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfXXXXX/viewform?embedded=true"
            width="100%"
            height="500"
            frameBorder="0"
            title="Contact Form"
            className="animated-iframe"
          >
            Loading…
          </iframe>
        </div>
      </div>

      <div className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0565476162385!2d89.64112341456433!3d27.47256128289179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e1937a0fb9d7b7%3A0xb2d162d26f4c6f73!2sGovTech%20Agency!5e0!3m2!1sen!2sbt!4v1691234567890!5m2!1sen!2sbt"
          width="100%"
          height="300"
          allowFullScreen=""
          title="Google Map"
          className="animated-map"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
