import React from 'react';
import './protfolio.css';
import IMG1 from '../../Assests/work-1.png';
import IMG2 from '../../Assests/work-2.png';
import IMG3 from '../../Assests/work-3.png';

// import IMG4 from "../../Assests/three.jpeg"
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Protfolio = () => {
  // useEffect(()=>{
  //   Aos.init({duration:1000})
  // },[])
  return (
    <section id="projects">
      <h5>My Recent Works</h5>
      <h2>Projects</h2>
      <div className="container portfolio_container">
        <article className="portfolio_item">
          <div className="portfolio_item_image">
            <img src={IMG1} alt="portfolio1" />
          </div>
          <h3>Cloning Of Clockify</h3>
          <small className="portofolio_margin">
            {/* Clockify is one of the best Time tracking websites. On this website,
            you can easily track your time and manage also. A group of five
            people made this project during our construction week while we were
            in unit five at Masai school. If you want you can fork our repo and
            easily make this website and clone this beautiful website very
            easily. */}
            Clockify is one of the best Time tracking websites. On this website,
            you can easily track your time and manage also. A collaborative
            project built by a team of 5 executed in 5 days.
          </small>
          <p className="bold">
            TechStack : react | redux | nodejs | express | mongoDB | nodemon |
            redux-thunk | axios | atlas | chakra-UI
          </p>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/Durgashankar001/clockify_clone"
              className="btn"
              target="_blank"
            >
              Github
            </a>
            <a
              href="https://clockifyy.netlify.app/"
              className="btn btn_primary"
              target="_blank"
            >
              Live Demo
            </a>
          </div>
        </article>
        <article className="portfolio_item">
          <div className="portfolio_item_image">
            <img src={IMG2} alt="portfolio1" />
          </div>
          <h3>Cloning Of ANIMOTO</h3>
          <small className="portofolio_margin">
            {/* Animoto is a cloud-based video creation service that produces video
            from photos, video clips, and music into video slideshows, and
            customized web-based presentations. */}
            Animoto is a cloud-based video creation service that produces video
            from photos, video clips, and music into video slideshows, and
            customized web-based presentations. A collaborative project built by
            a team of 5 executed in 5 days.
          </small>
          <p className="bold">
            TechStack : HTML | CSS | JavaScript | jQuery | Fabric.JS | Node
            Module | Local Storage
          </p>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/rohan209547mourya/deeply-tub-2367"
              className="btn"
              target="_blank"
            >
              Github
            </a>
            <a
              href="https://bright-sopapillas-48eab1.netlify.app/html/templates.html"
              className="btn btn_primary"
              target="_blank"
            >
              Live Demo
            </a>
          </div>
        </article>
        <article className="portfolio_item">
          <div className="portfolio_item_image">
            <img src={IMG3} alt="portfolio1" />
          </div>
          <h3>Cloning Of BATH & BODY WORKS</h3>
          <small className="portofolio_margin">
            {/* This project is the clone of Bath & Body Works, LLC. It is an
            American retail store chain that sells soaps, lotions, fragrances,
            and candles. It is a frontend project made using HTML, CSS, and
            vanilla JS that I made in collaboration with a team of 5. */}
            Bath & Body Works, LLC. It is an
            American retail store chain that sells soaps, lotions, fragrances,
            and candles. A collaborative project built by a team of 4 executed
            in 5 days
          </small>
          <p className="bold">
            Tech stack : HTML | CSS | Javascript | LocalStorage
          </p>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/theagni0070/Project-Bath-BodyWorks"
              className="btn"
              target="_blank"
            >
              Github
            </a>
            <a
              href="https://beautiful-cat-23c58b.netlify.app/"
              className="btn btn_primary"
              target="_blank"
            >
              Live Demo
            </a>
          </div>
        </article>
       
      </div>
    </section>
  );
};

export default Protfolio;
