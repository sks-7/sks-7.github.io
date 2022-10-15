import React from 'react'
import './testimonial.css'
import { Pagination, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
const data = [
  {
    avatar: "https://d27028dliefpk3.cloudfront.net/assets/favicon/favicon-32x32.png",
    name: "Masai School",
    year:"Feb 2022-Sep 2022",
    review: "Masai is an outcome driven career school.It is Intensive and Immersive Program. In a duration of 40 weeks, I have 1200+ hours hands on coding , 100+ Hour on SoftSkills."
  },
  {
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUD1nFZH9vgk_IMcI2rgZhtNmG3r8UfZQVAA&usqp=CAU",
    name: "H.D. JAIN COLLEGE, ARA",
    year:" Sep 2018 - sep 2021",
    review: "BSc (Mathematics) "
  },
  {
    avatar: "https://encrypted-tbn0.gstatic.com/iages?q=tbn:ANd9GcSUD1nFZH9vgk_IMcI2rgZhtNmG3r8UfZQVAA&usqp=CAU",
    name: "RAM NAGINA PANDEY +2 SCHOOL ARA, BHOJPUR",
    year:"July 2016 - Dec 2018",
    review: "Council of Heigher Secondary Education in Science offers an integrated package in Physics, Chemistry, Biology and Mathematics. I have Studied Physics,Chemistry , Math and other related subjects."
  }

]

const Testimonial = () => {
  return (
    <section id="testmonial">
      <h5>My</h5>
      <h2>Education</h2>
      <Swiper
        className="container testimonials_container"
        modules={[Pagination, A11y]}
        spaceBetween={40}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {data.map((el, index) => {
          return (
            <SwiperSlide className="testimonial">
              <div className="client_avtar">
                <img src={el.avatar} alt="avatar" />
              </div>
              <h5 className="client_name">{el.name}</h5>
              <h5 className="client_name">{el.year}</h5>
              <small className="client_review">{el.review}</small>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

export default Testimonial