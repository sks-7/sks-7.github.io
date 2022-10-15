import React from 'react'
import './about.css'
import ME from "../../Assests/me_img.jpg"
import {FaAward} from 'react-icons/fa'
import {FiUsers} from 'react-icons/fi'
import {VscFolderLibrary} from 'react-icons/vsc'
import Aos from 'aos'
import "aos/dist/aos.css"
import { useEffect } from 'react'

const About = () => {
  // useEffect(()=>{
  //   Aos.init({duration:1000})
  // },[])
  return (
    <section id="about">
      <h5>Get to Know</h5>
      <h2>About Me</h2>
      <div className="container about_container">
        <div className="about_me">
          <div className="about_me_image">
            <img src={ME} alt="" />
          </div>
        </div>
        <div className="about_content">
          <div className="about_cards">
            <article className="about_card">
              <FaAward className="about_icon" />
              <h5>DSA</h5>
              <small>250+ DSA Problems</small>
            </article>
            <article className="about_card">
              <VscFolderLibrary className="about_icon" />
              <h5>Projects</h5>
              <small>4+ projects (Major)</small>
            </article>
            <article className="about_card">
              <VscFolderLibrary className="about_icon" />
              <h5>Coding</h5>
              <small>1200+ Hours Of Coding</small>
            </article>
          </div>

          <p>
            I have worked on several different projects collaboratively and
            solely. I am a self-driven and passionate web developer skilled in
            JavaScript, React, and Redux and familiar with front-end frameworks
            like ChakraUI. Gone through 30 weeks of coding Bootcamp at Masai
            School.Also, worked on NodeJs, Express, MongoDB DataBase. Always
            eager to learn new technologies to enhance my skills and bring value
            to the organization.
          </p>
          <a href="#contact" className="btn btn_primary">
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
}

export default About