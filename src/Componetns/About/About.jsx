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
      {/* --------------- new About section making -------------- */}

      <h5>Get to Know</h5>
      <div className="container about_container">
        <div className="about section" id="about">
          <h2>About Me</h2>
          <h2 className="about about section"></h2>
          <p id="user-detail-intro">
            I am a full-stack developer with 1.5 years of experience building
            websites, web applications, and APIs. I specialize in the MERN stack
            and have expertise in Node, Go, JavaScript, HTML, CSS, React, and
            Angular. Outside of coding, my interests include playing cricket and
            watching TV series. Some of the technical skills in which I am
            proficient are: * Backend:- NodeJS, Golang, Express, Fiber
            framework, MongoDB, SQL, NoSQL, MySQL, PostgreSQL, GraphQL, Redis *
            Frontend:- JavaScript, HTML, CSS, React, Angular, Redux, Chakra UI,
            Material UI * JavaScript and C++ for practicing Data Structures and
            Algorithms (DSA) * Tools:- Docker, Jenkins, CI/CD, GitHub, Prisma
            ORM and TablePlus.
          </p>
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
          <div className="stats">6+</div>
          <p>Projects Done</p>
        </div>
      </div>
    </section>
  );
};

export default About;
