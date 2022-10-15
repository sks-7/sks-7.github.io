import React from 'react'
import './contact.css'
import { MdOutlineEmail } from 'react-icons/md'
import { BsWhatsapp } from 'react-icons/bs'
import { BsLinkedin } from 'react-icons/bs'
import { useRef } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const form = useRef()
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_duncf9k',
      'template_c29ajjt',
      form.current,
      'wV8DvWuLXQTmDu9Do'
    );
     e.target.reset()
  }
  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>
      <div className="container contact-container">
        <div className="contact_options">
          <article className="contact_option">
            <MdOutlineEmail className="coi" />
            <h4>Email</h4>
            <h5>sachinsingh.kumar07@gmail.com</h5>
            <a href="mailto:sachinsingh.kumar07@gmail.com" target="_blank">
              Send a message
            </a>
          </article>
          <article className="contact_option">
            <BsWhatsapp className="coi" />
            <h4>Whatsapp</h4>
            <h5>{'+91'} 7667456574</h5>
            <a
              href="https://api.whatsapp.com/send?phone=7667456574"
              target="_blank"
            >
              Send a message
            </a>
          </article>
          <article className="contact_option">
            <BsLinkedin className="coi" />
            <h4>LinkedIn</h4>
            <h5>Sachin Kumar</h5>
            <a
              href="https://www.linkedin.com/in/sachin-kumar-2a8a47231/"
              target="_blank"
            >
              Send a message
            </a>
          </article>
        </div>
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
          />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="7"
            required
          ></textarea>
          <button type="submit" className="btn btn_primary">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact