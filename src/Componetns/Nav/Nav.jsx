import React from 'react';
import './nav.css';

import { GiHamburgerMenu } from 'react-icons/gi';
import { TbMedicalCross } from 'react-icons/tb';
import CV from '../../Assests/Sachin_Kumar_Resume.pdf';
import { useState } from 'react';

const Nav = () => {
  const [activenav, setActivenav] = useState('#');
  const [activemenu, setActivemenu] = useState(false);
  const handleClick = () => {
    setActivemenu(!activemenu);
  };
  const handleHide = (e) => {
    setActivenav(e);
    setActivemenu(false);
  };
  return (
    <div className="topnav">
      <nav>
        <a href="#home" className="dp">
          <img
            style={{ width: '80px', borderRadius: '5px' }}
            src="https://i.pinimg.com/originals/53/f3/03/53f3032a69b961a583aae5952af5dace.jpg"
            alt=""
          />
        </a>
        <div>
          <ul
            id="nav-menu"
            className={activemenu ? '#nav-menu active' : '#nav-menu'}
          >
            <li className="nav-link home">
              <a
                href="#home"
                onClick={() => handleHide('#home')}
                className={activenav === '#home' ? 'active' : ''}
              >
                Home
              </a>
            </li>
            <li className="nav-link about">
              <a
                href="#about"
                onClick={() => handleHide('#')}
                className={activenav === '#about' ? 'active' : ''}
              >
                About
              </a>
            </li>

            <li className="nav-link skills">
              <a
                href="#skills"
                onClick={() => handleHide('#skills')}
                className={activenav === '#skills' ? 'active' : ''}
              >
                Skills
              </a>
            </li>

            <li className="nav-link projects">
              <a
                href="#projects"
                onClick={() => handleHide('#projects')}
                className={activenav === '#projects' ? 'active' : ''}
              >
                Projects
              </a>
            </li>
            <li className="nav-link contact">
              <a
                href="#contact"
                onClick={() => handleHide('#contact')}
                className={activenav === '#contact' ? 'active' : ''}
              >
                Contact
              </a>
            </li>
            <li className="nav-link resume">
              <a href={CV} download id="resume-link-1">
                {' '}
                <button
                  id="resume-button-1"
                  onClick={() => {
                    window.open(CV);
                  }}
                >
                  {' '}
                  Resume{' '}
                </button>
              </a>
            </li>
          </ul>
        </div>
        <div id="mobile">
          {activemenu ? (
            <TbMedicalCross onClick={handleClick} className="nav_icon " />
          ) : (
            <GiHamburgerMenu className="nav_icon" onClick={handleClick} />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
