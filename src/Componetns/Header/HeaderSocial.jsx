import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'
import {FiDribbble} from 'react-icons/fi'

const HeaderSocial = () => {
  return (
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
        <FiDribbble />
      </a>
    </div>
  );
}

export default HeaderSocial