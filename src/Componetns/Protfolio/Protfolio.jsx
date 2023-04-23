import React from 'react';
import './protfolio.css';
import IMG1 from '../../Assests/work-1.png';
import IMG2 from '../../Assests/work-2.png';
import IMG3 from '../../Assests/work-3.png';
import IMG4 from '../../Assests/work-4.png';
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
        <article className="project-card">
          <div className="portfolio_item_image">
            <img src={IMG1} alt="portfolio1" />
          </div>
          <h3 className="project-title">Cloning Of Clockify</h3>
          <small className="project-description">
            Clockify is a highly efficient time-tracking platform that enables
            users to track and manage their time effectively. A collaborative
            project, executed by a team of five, was successfully completed
            within five days.
          </small>
          <p className="project-tech-stack">
            TechStack : react | redux | nodejs | express | mongoDB | nodemon |
            redux-thunk | axios | atlas | chakra-UI
          </p>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/Durgashankar001/clockify_clone"
              className="project-github-link"
              target="_blank"
            >
              Github
            </a>
            <a
              href="https://clockify-eta.vercel.app/"
              className="project-deployed-link"
              target="_blank"
            >
              Live Demo
            </a>
          </div>
        </article>

        <article className="project-card">
          <div className="portfolio_item_image">
            <img src={IMG3} alt="portfolio1" />
          </div>
          <h3 className="project-title">Cloning SkinStore</h3>
          <small className="project-description">
            SkinStore is an authorized retailer of 100s of premium beauty brands
            across skin, makeup, and hair including SkinCeuticals. it is a solo
            project built in 5 days.
          </small>
          <p className="project-tech-stack">
            Tech stack : ReactJs | ContexApi | Json-server | npm | vercel |
            chakra-ui
          </p>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/sks-7/SkinStore"
              className="project-github-link"
              target="_blank"
            >
              Github
            </a>
            <a
              href="https://skinstore-two.vercel.app/"
              className="project-deployed-link"
              target="_blank"
            >
              Live Demo
            </a>
          </div>
        </article>

        <article className="project-card">
          <div className="portfolio_item_image">
            <img src={IMG4} alt="portfolio1" />
          </div>
          <h3 className="project-title">CLOFETCH</h3>
          <small className="project-description">
            CLOFETCH is an e-commerce website that is expertly curated by the
            best luxury fashion brands and boutiques around You can buy the best
            ever branded clothes where you can buy men's, women and kids'
            products.
          </small>
          <p className="project-tech-stack">
            Tech stack : react | redux | chakra UI | Firebase | Json-Server
          </p>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/sks-7/Clofetch"
              className="project-github-link"
              target="_blank"
            >
              Github
            </a>
            <a
              href="https://farfetch-hazel.vercel.app/"
              className="project-deployed-link"
              target="_blank"
            >
              Live Demo
            </a>
          </div>
        </article>

        <article className="project-card">
          <div className="portfolio_item_image">
            <img src={IMG2} alt="portfolio1" />
          </div>
          <h3 className="project-title">Cloning Of ANIMOTO</h3>
          <small className="project-description">
            Animoto is a cloud-based video creation service that produces video
            from photos, video clips, and music into video slideshows, and
            customized web-based presentations. A collaborative project built by
            a team of 5 executed in 5 days.
          </small>
          <p className="project-tech-stack">
            TechStack : HTML | CSS | JavaScript | jQuery | Fabric.JS | Node
            Module | Local Storage
          </p>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/rohan209547mourya/deeply-tub-2367"
              className="project-github-link"
              target="_blank"
            >
              Github
            </a>
            <a
              href="https://animoto-in.netlify.app/html/templates.html"
              className="project-deployed-link"
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
