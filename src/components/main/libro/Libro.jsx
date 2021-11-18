import { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './libro.scss';
import Page from './page/Page';
import Navbar from '../../navbar/Navbar';
import React, { useCallback } from 'react';
// https://www.npmjs.com/package/react-pageflip
// https://reactjs.org/docs/forwarding-refs.html
function Libro() {
  const [poems, setPoems] = useState([]);

	const backendUrl = 'http://localhost:9000'

	const loadPoems = async () => {
		const response = await fetch(backendUrl);
		const poems = await response.json();
		poems.forEach(user => user.isEditingEmail = false);
		setPoems(poems);
	}

	useEffect(() => {
		loadPoems();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
  const onFlip = useCallback((e) => {
    console.log('Current page: ' + e.data);
  }, []);

  const navBanners = ['home', 'prefazione', 'postfazione'];

  return (
    <>
      <Navbar navBanners={navBanners} />

      <div className='BookOpened'>
        <HTMLFlipBook
          onFlip={onFlip}
          width={600}
          height={700}
          className='FlipBook'
        >
          {poems.map((poem, index) => {
            return (
              <Page key={index} pageNumber={index + 1}>
                <h2 style={{ color: 'red' }}>{poem.title}</h2>
                <br /><br />

                <p>
                  {poem.text.split('\n').map((item, index) => {
                    return (
                      <>
                        <p key={index}>{item}</p>
                        <br />
                      </>
                    );
                  })}
                </p>
              </Page>
            );
          })}
        </HTMLFlipBook>
      </div>
    </>
  );
}

export default Libro;
