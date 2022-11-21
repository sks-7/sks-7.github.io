import React from 'react'
import './header.css'
import CTA from './CTA'
// import ME from '../../Assests/me_img.jpg'
import HeaderSocial from './HeaderSocial'

const Header = () => {
  return (
    <header>
      <div className="container header_container">
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
        {/* <HeaderSocial /> */}
        <div className="me">
          <img
            src="https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif"
            alt="MY LOGO"
          />
        </div>

        <a href="#contact" className="scroll_down">
          Scroll Down
        </a>
      </div>
    </header>
  );
}

export default Header