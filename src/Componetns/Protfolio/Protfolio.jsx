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
        <article className="portfolio_item">
          <div className="portfolio_item_image">
            <img src={IMG1} alt="portfolio1" />
          </div>
          <h3>Cloning Of Clockify</h3>
          <small className="portofolio_margin">
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
              href="https://clockify-one.vercel.app/"
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
          <h3>Cloning SkinStore</h3>
          <small className="portofolio_margin">
            SkinStore is an authorized retailer of 100s of premium beauty brands
            across skin, makeup, and hair including SkinCeuticals. it is a solo
            project built in 5 days.
          </small>
          <p className="bold">
            Tech stack : ReactJs | ContexApi | Json-server | npm | vercel |
            chakra-ui
          </p>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/sks-7/SkinStore"
              className="btn"
              target="_blank"
            >
              Github
            </a>
            <a
              href="https://supreme-honey-5251.vercel.app/"
              className="btn btn_primary"
              target="_blank"
            >
              Live Demo
            </a>
          </div>
        </article>

        <article className="portfolio_item">
          <div className="portfolio_item_image">
            <img src={IMG4} alt="portfolio1" />
          </div>
          <h3>CLOFETCH</h3>
          <small className="portofolio_margin">
            CLOFETCH is an e-commerce website that is expertly curated by the
            best luxury fashion brands and boutiques around You can buy the best
            ever branded clothes where you can buy men's, women and kids'
            products.
          </small>
          <p className="bold">
            Tech stack : react | redux | chakra UI | Firebase | Json-Server
          </p>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/sks-7/Clofetch"
              className="btn"
              target="_blank"
            >
              Github
            </a>
            <a
              href="https://farfetch-henna.vercel.app/"
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
              href="https://animoto-in.netlify.app/html/templates.html"
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
