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

  const backendUrl = 'http://localhost:9000';

  const loadPoems = async () => {
    const response = await fetch(backendUrl);
    const poems = await response.json();
    setPoems(poems);
  };

  useEffect(() => {
    loadPoems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onFlip = useCallback((e) => {
    console.log('Current page: ' + e.data);
  }, []);

  const navBanners = ['home', 'indice', 'prefazione', 'postfazione'];

  return (
    <>
      <Navbar navBanners={navBanners} />

      <div className='BookOpened'>
        <HTMLFlipBook
          onFlip={onFlip}
          width={700}
          height={800}
          className='FlipBook'
        >
          {poems.map((poem, poemIndex) => {
            const arrOfPoemsLines = poem.text.split('\n');
            const batchSize = 16;
            const amountBatches = Math.ceil(arrOfPoemsLines.length / batchSize);
            const batches = [];
            for (let i = 0; i < amountBatches; i++) {
              const batch = arrOfPoemsLines.slice(
                i * batchSize,
                i * batchSize + batchSize
              );
              batches.push(batch);
            }

            return batches.map((page, pageIndex) => {
              return (
                <Page
                  idStyle={`page${1 + poemIndex}`}
                  key={pageIndex}
                  pageNumber={`${1 + poemIndex}.${pageIndex}`}
                  title={pageIndex === 0 ? poem.title : ''}
                  text={page.map((line, index) => {
                    return (
                      <>
                        <p key={index}>{line}</p>
                        <br />
                      </>
                    );
                  })}
                />
              );
            });
          })}
        </HTMLFlipBook>
      </div>
    </>
  );
}

export default Libro;
