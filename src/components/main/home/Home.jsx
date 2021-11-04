import React from 'react';
import { NavLink } from 'react-router-dom';
import './home.scss';

function Home() {
  return (
    <NavLink to='/libro'>
      <div className='Home'>
        <div className='book'>
          <div className='front'>
            <div className='cover'>
              <section>
                <p style={{ fontSize: '1.5vw' }} className='author'>
                  Duilia Dias
                </p>
                <br />
                <br />
                <br />
                <p
                  style={{ fontWeight: 'bolder', fontSize: '2.5vw' }}
                  className='author'
                >
                  Al Porto
                </p>
                <br />
                <p
                  style={{ fontFamily: 'italic', fontSize: '1.5vw' }}
                  className='author'
                >
                  Poesie
                </p>

                <p
                  style={{ fontFamily: 'italic', fontSize: '1.5vw' }}
                  className='author'
                >
                  di acque, di terre, di amori
                </p>
              </section>
            </div>
          </div>
          <div className='left-side'>
            <h2>
              <span>Duilia Dias</span>
              <span>Al Porto</span>
              <span>2021</span>
            </h2>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default Home;
