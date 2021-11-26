import { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './book.scss';
import Page from './page/Page';
import Navbar from '../../navbar/Navbar';
import React, { useCallback } from 'react';
// import indice from './indice.json';
// https://www.npmjs.com/package/react-pageflip
// https://reactjs.org/docs/forwarding-refs.html

function Book() {

  const [poems, setPoems] = useState([]);
  const book = useRef();
  const backendUrl = 'http://localhost:9000';

  const loadPoems = async () => {
    const response = await fetch(`${backendUrl}`);
    const poemsResponse = await response.json();
    setPoems(poemsResponse);
  };

  useEffect(() => {
    (async () => {
       await loadPoems();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onFlip = useCallback((e) => {
    // console.log('Current page: ' + e.data);
  }, []);

  const navBanners = ['home', 'indice', 'prefazione', 'postfazione'];

  return (
    <>
      <Navbar navBanners={navBanners} />
      <button onClick={() => book.current.pageFlip().flip(14)}>
        Next page
      </button>

      <div className='Book'>
        <HTMLFlipBook
          ref={book}
          onFlip={onFlip}
          flippingTime={1200}
          // size={"stretch"}
          width={700}
          height={800}
          className='FlipBook'
        >
          {/* {indice.map((indice, indiceIndex) => {
            const arrOffIndicesLines = indice.text.split('\n');
            const batchSize = 16;
            const amountBatches = Math.ceil(
              arrOffIndicesLines.length / batchSize
            );
            const batches = [];
            for (let i = 0; i < amountBatches; i++) {
              const batch = arrOffIndicesLines.slice(
                i * batchSize,
                i * batchSize + batchSize
              );
              batches.push(batch);
            }

            return batches.map((page, pageIndex) => {
              return (
                <Page
                  idStyle={`indice${1 + indiceIndex}page${pageIndex + 1}`}
                  key={pageIndex + 10000000}
                  pageNumber={indice.description}
                  title={pageIndex === 0 ? indice.title : '.....'}
                  text={page.map((line, index) => {
                    return (
                      <ul>
                        <li>{line}</li>
                        <br />
                      </ul>
                    );
                  })}
                />
              );
            });
          })} */}
          {poems.map((poem, poemIndex) => {
            console.log(poem.title);
            const arrOfPoemsLines = poem.text.split('\n');
            const batchSize = poem.title === "PREFAZIONE" ? 3 : 16;
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
                  idStyle={`poem${1 + poemIndex}page${pageIndex + 1}`}
                  key={pageIndex}
                  pageNumber={`${1 + poemIndex}.${pageIndex + 1}`}
                  title={pageIndex === 0 ? poem.title : '.....'}
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

export default Book;
