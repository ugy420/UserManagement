import React, { useEffect } from "react";
import "./AboutUs.css";
import AOS from "aos";
import "aos/dist/aos.css";
import missionImage from "../assets/background.jpg"; // Replace with your mission image
import Header from "./Header";
import teamImage1 from "../assets/background.jpg"; // Replace with your team images

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Ensure animations run only once
    });
  }, []);

  return (
    <div className="AboutUs">
        <Header />
      <header className="AboutUs-header" data-aos="fade-down">
        <h1>About Us</h1>
        <p>Learn more about who we are and what we do.</p>
      </header>
      <main className="AboutUs-main">
        <section className="mission-section" data-aos="fade-up">
          <h2>Our Mission</h2>
          <div className="mission-content">
            <img src={missionImage} alt="Our Mission" className="mission-image" data-aos="zoom-in" />
            <p data-aos="fade-left">
              Our mission is to provide exceptional services and innovative
              solutions that empower our customers to achieve their goals. We
              are committed to quality, excellence, and fostering strong
              partnerships.
            </p>
          </div>
        </section>

        <section className="team-section" data-aos="zoom-in">
          <h2>Meet Our Team</h2>
          <p data-aos="fade-right">We have a talented and diverse team that brings our vision to life.</p>
          <div className="team-images">
            <img src={teamImage1} alt="Team Member 1" className="team-image" data-aos="flip-left" />
            <img src={teamImage1} alt="Team Member 2" className="team-image" data-aos="flip-up" />
            <img src={teamImage1} alt="Team Member 3" className="team-image" data-aos="flip-right" />
          </div>
        </section>

        <section className="values-section" data-aos="fade-right">
          <h2>Our Values</h2>
          <ul className="values-list">
            <li data-aos="fade-up"><strong>Integrity:</strong> We uphold the highest standards of integrity in all of our actions.</li>
            <li data-aos="fade-up" data-aos-delay="100"><strong>Customer Commitment:</strong> We develop relationships that make a positive difference in our customers' lives.</li>
            <li data-aos="fade-up" data-aos-delay="200"><strong>Quality:</strong> We provide outstanding products and unsurpassed service that, together, deliver premium value to our customers.</li>
          </ul>
        </section>

        <section className="contact-section" data-aos="fade-left">
          <h2>Contact Us</h2>
          <p data-aos="fade-up">You can reach us at contact@example.com.</p>
        </section>
      </main>
      <footer className="AboutUs-footer" data-aos="fade-up">
        <p>&copy; 2023 Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutUs;