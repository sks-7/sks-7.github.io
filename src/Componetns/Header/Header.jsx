import React from 'react';
import './header.css';
// import CTA from './CTA';
// import ME from '../../Assests/me_img.jpg'
// import HeaderSocial from './HeaderSocial';
import ME from '../../Assests/me_img.png';

import Typewriter from 'typewriter-effect';
import CV from '../../Assests/Sachin_Kumar_Resume.pdf';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { FiDribbble } from 'react-icons/fi';
import { IoMdMail } from 'react-icons/io';
import { IoMdCloudDownload } from 'react-icons/io';
const Header = () => {
  return (
    <header>
      {/* <div className="container header_container">
        <h5>Hello I'm</h5>
        <h1>Sachin Kumar</h1>
        <ul className="dynamic_text">
          <li>
            <span>Web Designer</span>
          </li>
          <li>
            <span>FullStack Developer</span>
          </li>
          <li>
            <span>FullTime Coder</span>
          </li>
        </ul>
        <CTA />
       
        <div className="me">
          <img
            src="https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif"
            alt="MY LOGO"
          />
        </div>

        <a href="#contact" className="scroll_down">
          Scroll Down
        </a>
      </div> */}

      {/* -------- new header Jsx Making with photo and buttons */}
      <div id="home">
        <div>
          <h2>Hi, my name is</h2>
          <h1 id="user-detail-name">Sachin Kumar</h1>
          <div className="header_type">
            I am{' '}
            <div id="title">
              <Typewriter
                cursorColor="black"
                options={{
                  strings: [
                    'a Full Stack Developer',
                    'Specialization in MERN Stack.',
                    'a Problem Solver',
                  ],
                  autoStart: true,
                  loop: true,
                  pauseFor: 1000,
                }}
              />
            </div>
          </div>
          <a href={CV} id="resume-link-2" download>
            Resume
          </a>

          <button id="resume-button-2"></button>
          <div className="header_socials">
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
              <IoMdMail />
            </a>
          </div>
        </div>
        <div>
          <div>
            <div id="picborder">
              <div id="pic">
                <img src={ME} alt="" className="home-img" />
              </div>
            </div>
            <div className="header_socials2">
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
                <IoMdMail />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
