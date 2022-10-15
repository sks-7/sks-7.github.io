import React from "react";
import Header from './Componetns/Header/Header'
import Nav from './Componetns/Nav/Nav'
import About from './Componetns/About/About'
import Experience from './Componetns/Experience/Experience'
// import Servises from './Componetns/Services/Servises'
import Protfolio from './Componetns/Protfolio/Protfolio'
import Testimonial from './Componetns/Testimonials/Testimonial'
import Contact from './Componetns/Contact/Contact'
import Footer from './Componetns/Footer/Footer'
import Services from "./Componetns/Services/Servises";
import Github from "./Componetns/GithubCalender/githubCalender";


function App() {
  return (
   <>
      <Header/>
      <Nav/>
      <About/>
      <Experience/>
      <Protfolio/>
      <Services/>
      <Github/>
      <Testimonial/>
      <Contact/>
      <Footer/>
   </>
  );
}

export default App;
