import React from 'react'
import {BsTwitter , BsInstagram} from 'react-icons/bs';
import {FaFacebookF} from 'react-icons/fa';
import {FaLinkedin} from 'react-icons/fa'

const SocialMedia = () => {
  return (
    <div className='app__social'>
      <div>
        <a href="https://twitter.com/KaranSu50693772?t=HyET6ej3IawcN17dpp24Cw&s=09" target='_blank'><BsTwitter/></a>
         
      </div>
      <div>
        <a href="https://www.facebook.com/karan.suryawanshi.9847" target='_blank'><FaFacebookF/></a>
          
      </div>
      <div>
        <a href="https://instagram.com/karansuryawanshi3?igshid=ZDdkNTZiNTM=" target='_blank'><BsInstagram/></a> 
         
      </div>
      {/* <div>
        <a href="https://linkedin.com" target='_blank'><FaLinkedin/></a> 
         
      </div> */}
    </div>
  )
}

export default SocialMedia
