import React from 'react';
import mail from '../../assets/mail.png'

function Contatti() {
  return (
    <div>
        <p>duiliadias@gmail.com</p>
      <a className='navLink' href='mailto:duiliadias@gmail.com' target='blank'>
        <img className='contactIcon' id='mail' src={mail} alt='mail' />
      </a>
    </div>
  );
}

export default Contatti;
