import React from 'react'
import './services.css'
import { BsPatchCheckFill } from 'react-icons/bs'
import Aos from 'aos'
import "aos/dist/aos.css"
import { useEffect } from 'react'
// import AVTAR from "../../Assests/avatar1.jpg"

const Services = () => {
  // useEffect(() => {
  //   Aos.init({ duration: 1000 })
  // }, [])
  return (
    <section id='skill'>
      <h5 >The Skills I Have</h5>
      <h2 >Techincal Skills & SoftSkills</h2>

      <div className='container experience_container pad_div'>
        <div className="experience_frontend">
          <h3 >Techincal Skills</h3>
          <div className="experience_content">
            <article  className='experince_details'>
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div className='circle_one'>
                <div className='circle_main'>
                <div className="percent">
                  <div className="dot"></div>
                <svg>
                  <circle cx="35" cy="35" r="35"></circle>
                  <circle cx="35" cy="35" r="35"></circle>
                </svg>
                <div className="number_circle">
                  <h2>90<span>%</span></h2>
                </div>
                </div>
                </div>
                <h4 className='circle_title'>HTML</h4>
                {/* <small className='text_light'>Experienced</small> */}
              </div>
            </article>
            <article  className='experince_details'>
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div className='circle_two'>
              <div className='circle_main'>
                <div className="percent">
                  <div className="dot"></div>
                <svg>
                  <circle cx="35" cy="35" r="35"></circle>
                  <circle cx="35" cy="35" r="35"></circle>
                </svg>
                <div className="number_circle">
                  <h2>85<span>%</span></h2>
                </div>
                </div>
                </div>
                <h4>CSS</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article  className='experince_details'>
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div className='circle_three'>
              <div className='circle_main'>
                <div className="percent">
                  <div className="dot"></div>
                <svg>
                  <circle cx="35" cy="35" r="35"></circle>
                  <circle cx="35" cy="35" r="35"></circle>
                </svg>
                <div className="number_circle">
                  <h2>75<span>%</span></h2>
                </div>
                </div>
                </div>
                <h4>Javascript</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article  className='experince_details'>
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div className='circle_four'>
              <div className='circle_main'>
                <div className="percent">
                  <div className="dot"></div>
                <svg>
                  <circle cx="35" cy="35" r="35"></circle>
                  <circle cx="35" cy="35" r="35"></circle>
                </svg>
                <div className="number_circle">
                  <h2>60<span>%</span></h2>
                </div>
                </div>
                </div>
                <h4>Chakra UI</h4>
                {/* <small className='text_light'>Experienced</small> */}
              </div>
            </article>
            <article  className='experince_details'>
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div className='circle_five'>
              <div className='circle_main'>
                <div className="percent">
                  <div className="dot"></div>
                <svg>
                  <circle cx="35" cy="35" r="35"></circle>
                  <circle cx="35" cy="35" r="35"></circle>
                </svg>
                <div className="number_circle">
                  <h2>75<span>%</span></h2>
                </div>
                </div>
                </div>
                <h4>React</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article className='experince_details'>
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div className='circle_six'>
              <div className='circle_main'>
                <div className="percent">
                  <div className="dot"></div>
                <svg>
                  <circle cx="35" cy="35" r="35"></circle>
                  <circle cx="35" cy="35" r="35"></circle>
                </svg>
                <div className="number_circle">
                  <h2>80<span>%</span></h2>
                </div>
                </div>
                </div>
                <h4>Backend</h4>
                {/* <small className='text_light'>Intermeiate</small> */}
              </div>
            </article>
          </div>
        </div>
        <div className="experience_backend">
          <h3>Soft Skills</h3>
          <div className="experience_content">
            <article  className='experince_details'>
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div className='circle_seven'>
              <div className='circle_main'>
                <div className="percent">
                  <div className="dot"></div>
                <svg>
                  <circle cx="35" cy="35" r="35"></circle>
                  <circle cx="35" cy="35" r="35"></circle>
                </svg>
                <div className="number_circle">
                  <h2>86<span>%</span></h2>
                </div>
                </div>
                </div>
                <h4>Presentation</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article  className='experince_details'>
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div className='circle_eight'>
              <div className='circle_main'>
                <div className="percent">
                  <div className="dot"></div>
                <svg>
                  <circle cx="35" cy="35" r="35"></circle>
                  <circle cx="35" cy="35" r="35"></circle>
                </svg>
                <div className="number_circle">
                  <h2>92<span>%</span></h2>
                </div>
                </div>
                </div>
                <h4>Team Work</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article  className='experince_details'>
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div className='circle_nine'>
              <div className='circle_main'>
                <div className="percent">
                  <div className="dot"></div>
                <svg>
                  <circle cx="35" cy="35" r="35"></circle>
                  <circle cx="35" cy="35" r="35"></circle>
                </svg>
                <div className="number_circle">
                  <h2>86<span>%</span></h2>
                </div>
                </div>
                </div>
                <h4>Interpersonal</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article  className='experince_details'>
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div className='circle_ten'>
              <div className='circle_main'>
                <div className="percent">
                  <div className="dot"></div>
                <svg>
                  <circle cx="35" cy="35" r="35"></circle>
                  <circle cx="35" cy="35" r="35"></circle>
                </svg>
                <div className="number_circle">
                  <h2>90<span>%</span></h2>
                </div>
                </div>
                </div>
                <h4>LeaderShip</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
            <article  className='experince_details'>
              {/* <BsPatchCheckFill className='experience_details_icon' /> */}
              <div className='circle_eleven'>
              <div className='circle_main'>
                <div className="percent">
                  <div className="dot"></div>
                <svg>
                  <circle cx="35" cy="35" r="35"></circle>
                  <circle cx="35" cy="35" r="35"></circle>
                </svg>
                <div className="number_circle">
                  <h2>84<span>%</span></h2>
                </div>
                </div>
                </div>
                <h4>Creativity</h4>
                {/* <small className='text_light'>Intermediate</small> */}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services