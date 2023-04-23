import React from 'react';
import './footer.css';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { FiDribbble } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer>
      <a href="#" className="footer_logo">
        SACHIN KUMAR
      </a>
      <ul className="premalinks">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#experience">Soft Skills</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#testmonial">Education</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <div className="footer_social">
        <a
          href="https://www.linkedin.com/in/sachin-kumar-2a8a47231/"
          target="_blank"
        >
          <BsLinkedin />
        </a>
        <a href="https://github.com/sks-7" target="_blank">
          <FaGithub />
        </a>
        <a href="mailto:sachinsingh.kumar07@gmail.com" target="_blank">
          <FiDribbble />
        </a>
      </div>

      {/* <div className="footer_copyright">
        <small>&copy; Durgashankar. All copy rights reserved</small>
      </div> */}
    </footer>
  );
};

export default Footer;
