import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer-custom bg-dark text-white pt-5 pb-3">
      <Container>
        <Row>
          {/* About */}
          <Col md={4} className="mb-4">
            <h4 className="footer-title">EduLanka</h4>
            <p className="footer-desc">
              Empowering Sri Lankan students with high-quality online education.<br />
              Learn from experienced tuition masters anywhere, anytime.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <FaInstagram />
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/about" className="footer-link">About Us</a></li>
              <li><a href="/tutors" className="footer-link">Tutors</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={4} className="mb-4">
            <h5 className="footer-title">Contact Us</h5>
            <p className="footer-contact"><FaEnvelope className="footer-icon" /> info@edulanka.lk</p>
            <p className="footer-contact"><FaPhone className="footer-icon" /> +94 11 123 4567</p>
            <p className="footer-contact"><FaMapMarkerAlt className="footer-icon" /> Colombo, Sri Lanka</p>
          </Col>
        </Row>

        <hr className="bg-white" />

        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} EduLanka. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
