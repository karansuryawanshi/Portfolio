import React from 'react'
import {BsTwitter , BsInstagram} from 'react-icons/bs';
import {FaFacebookF} from 'react-icons/fa';
import {FaLinkedin} from 'react-icons/fa'
import { VscGithub } from "react-icons/vsc";
import { FaGithubSquare } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className='app__social' style={{
      color:"white",
    }}>
      <div>
        <a href="https://twitter.com/KaranSu50693772?t=HyET6ej3IawcN17dpp24Cw&s=09" target='_blank'><BsTwitter/></a>
      </div>
      <div>
        <a href="https://github.com/karansuryawanshi" target='_blank'><FaGithubSquare /></a>
          
      </div>
      {/* <div>
        <a href="https://instagram.com/karansuryawanshi3?igshid=ZDdkNTZiNTM=" target='_blank'><BsInstagram/></a> 
         
      </div> */}
      <div>
        <a href="https://www.linkedin.com/in/karan-suryawanshi-1b1786267/" target='_blank'><FaLinkedin/></a> 
      </div>
    </div>
  )
}

export default SocialMedia
