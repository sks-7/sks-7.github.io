import React from 'react';
import './about.css';
import CV from '../../Assests/Sachin_Kumar_Resume.pdf';

// -------------- old-----------
// import ME from '../../Assests/me_img.png';
// import { FaAward } from 'react-icons/fa';
// import { FiUsers } from 'react-icons/fi';
// import { VscFolderLibrary } from 'react-icons/vsc';
// import Aos from 'aos';
// import 'aos/dist/aos.css';
// import { useEffect } from 'react';

// ------------- old ----------------

// ---- new import -----------

// ---- new import -----------

const About = () => {
  return (
    <section id="about">
      {/* <h5>Get to Know</h5>
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
         
            I am Sachin Kumar an enthusiastic, self-motivated and passionate
            front-end and backend web developer with a specialization in MERN
            stack. I am open to learn new technologies and skills. If you
            looking for a developer, I'd love to join your team. Please feel
            free to contact me.
          </p>
          <a href="#contact" className="btn btn_primary">
            Let's Talk
          </a>
        </div>
      </div> */}

      {/* --------------- new About section making -------------- */}

      <h5>Get to Know</h5>
      <div className="container about_container">
        <div className="about section" id="about">
          <h2>About Me</h2>
          <h2 className="about about section"></h2>
          <p id="user-detail-intro">
            Critical Thinker and an enthusiastic, self-motivated and passionate
            front-end and backend web developer with a specialization in MERN
            stack proficient in tech Stacks like JavaScript, React Js, Node Js,
            Redux and MongoDB. I am open to learn new technologies and skills.
            If you looking for a developer, I'd love to join your team. Please
            feel free to contact me.
          </p>

          <button
            id="resume-button-2"
            onClick={() => {
              window.open(CV);
            }}
          ></button>
        </div>
      </div>
      <div className="container experience_container about">
        <div className="my_stats">
          <div className="stats">1200+</div>
          <p>Hours of Full Stack Coding</p>
          <div className="stats">100+</div>
          <p>Hours of Soft Skill Sessions</p>
        </div>
        <div className="my_stats">
          <div className="stats">250+</div>
          <p>DSA Problems</p>
          <div className="stats">4+</div>
          <p>Projects Done</p>
        </div>
      </div>
    </section>
  );
};

export default About;
