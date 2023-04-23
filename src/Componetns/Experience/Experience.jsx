import React from 'react';
import './experience.css';
import { BsPatchCheckFill } from 'react-icons/bs';
// import Aos from 'aos';
// import 'aos/dist/aos.css';
// import { useEffect } from 'react';

const Experience = () => {
  // useEffect(()=>{
  //   Aos.init({duration:1000})
  // },[])
  return (
    <section id="skills">
      <h5>The Skills I Learnt</h5>
      <h2>Skills and Tools</h2>

      <div className="container experience_container">
        <div className="experience_frontend">
          <h3>Frontend Development</h3>
          <div className="experience_content">
            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://arjun-porfolio.vercel.app/assets/images/flaticon/html-5.png"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">HTML</h4>
                {/* <small className='text_light'>Experienced</small> */}
              </div>
            </article>
            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://arjun-porfolio.vercel.app/assets/images/flaticon/css-3.png"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">CSS</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://arjun-porfolio.vercel.app/assets/images/flaticon/js.png"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">Javascript</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="avatar"
                     className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">Chakra UI</h4>
                {/* <small className='text_light'>Experienced</small> */}
              </div>
            </article>

            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://bootstrapmade.com/assets/img/logo-hero.png"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">Bootstrap</h4>
                {/* <small className='text_light'>Intermeiate</small> */}
              </div>
            </article>
            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://arjun-porfolio.vercel.app/assets/images/flaticon/react.png"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">React</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article className="skills-card">
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="data:image/png;base64,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"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">Redux</h4>
              </div>
            </article>

            <article className="skills-card">
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGTBnrQrSgbJbcghgoZT_nVwXWi9DZ1nSj8TcSf_tiOQ&s"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">Redux-Toolkit</h4>
              </div>
            </article>
          </div>
        </div>
        <div className="experience_backend">
          <h3>Backend Development</h3>
          <div className="experience_content">
            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://arjun-porfolio.vercel.app/assets/images/flaticon/nodejs.png"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">Node JS</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://w7.pngwing.com/pngs/925/447/png-transparent-express-js-node-js-javascript-mongodb-node-js-text-trademark-logo.png"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">Express</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://arjun-porfolio.vercel.app/assets/images/flaticon/mongodb.png"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">MongoDB</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="data:image/png;base64,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"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">Atlas</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
          </div>
        </div>
        {/* ********* Tools ****************** */}
        <div className="experience_backend">
          <h3>Tools</h3>
          <div className="experience_content">
            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://w1.pngwing.com/pngs/933/874/png-transparent-github-logo-version-control-source-code-branching-repository-code-review-software-repository-commit.png"
                    alt="avatar"
                  />
                </div>
                <h4 className="skills-card-name">Git</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">GitHub</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/netlify-3629537-3032320.png"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">Netlify</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://yt3.ggpht.com/_q52i8bUAEvcb7JR4e-eNTv23y2A_wg5sCz0NC0GrGtcw1CRMWJSOPVHUDh_bngD0q4gMvVeoA=s900-c-k-c0x00ffffff-no-rj"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">Vs Code</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://arjun-porfolio.vercel.app/assets/images/flaticon/postman.png"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">Postman</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://res.cloudinary.com/crunchbase-production/image/upload/dtokjerhk1dxyludtlwc"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">Vercel</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>

            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://www.tomsquest.com/img/posts/2018-10-02-better-npm-ing/npm_logo.png"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">npm</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>

            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="https://pbs.twimg.com/profile_images/501903297142202370/FMSUktfc_400x400.png"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">Mockaroo</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>

            <article className="skills-card">
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div>
                <div className="client_avtar icon_img">
                  <img
                    src="data:image/png;base64,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"
                    alt="avatar"
                    className="skills-card-img"
                  />
                </div>
                <h4 className="skills-card-name">Code Sand Box</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
