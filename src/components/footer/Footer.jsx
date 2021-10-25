import React from 'react';
import './footer.scss';
import whatzapp from '../../assets/whatzapp.png';
import mail from '../../assets/mail.png';
import telefono from '../../assets/telefono.png';

function Footer() {
  return (
    <div className="Footer">
      <a className='navLink' href='https://wa.me/+393488733334' target='blank'>
        <img
          className='contactIcon'
          id='whatzapp'
          src={whatzapp}
          alt='whatzapp'
        />
      </a>
      <a className='navLink' href='mailto:sjmanca@gmail.com' target='blank'>
        <img className='contactIcon' id='mail' src={mail} alt='mail' />
      </a>
      <a className='navLink' href='tel:+393488733334' target='blank'>
        <img
          className='contactIcon'
          id='telefono'
          src={telefono}
          alt='telefono'
        />
      </a>
    </div>
  );
}

export default Footer;
