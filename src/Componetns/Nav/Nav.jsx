import React from 'react'
import './nav.css'
import {AiOutlineHome} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'
import {BiBook} from 'react-icons/bi'
import {RiServiceLine} from 'react-icons/ri'
import {BiMessageSquareDetail} from 'react-icons/bi'
import { useState } from 'react'

const Nav = () => {
  const [activenav,setActivenav] = useState("#")
  return (
    <div className='nav_content'>
    <nav>
      <a href="#" onClick={()=>setActivenav("#")} className={activenav==="#" ? "active" : ""}><AiOutlineHome/></a>
      <a href="#about" onClick={()=>setActivenav("#about")} className={activenav==="#about" ? "active" : ""}><AiOutlineUser/></a>
      <a href="#experience" onClick={()=>setActivenav("#experience")} className={activenav==="#experience" ? "active" : ""}><BiBook/></a>
      <a href="#skill" onClick={()=>setActivenav("#skill")} className={activenav==="#skill" ? "active" : ""}><RiServiceLine/></a>
      <a href="#contact" onClick={()=>setActivenav("#contact")} className={activenav==="#contact" ? "active" : ""}><BiMessageSquareDetail/></a>
    </nav>
    </div>
  )
}

export default Nav