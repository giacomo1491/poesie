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
  const indexBook = useRef([]);
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

  const goToPoem = (poemTitle) => {
    const current = indexBook.current;
    const poemFound = current.find((item) => item.poemTitle === poemTitle);
    poemFound && book.current.pageFlip().flip(poemFound.pageCounter);
    console.log(poemFound);
    // console.log({ poemTitle });
  };

  let pageCounter = 1;

  return (
    <>
      <Navbar navBanners={navBanners} />
      <button onClick={() => goToPoem("Di Acque")}>
        indice
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
          {poems.map((poem, poemIndex) => {
            console.log({ pageCounter, poem: poem.title });
            const arrOfPoemsLines = poem.text.split('\n');
            const batchSize =
              poem.title === 'PREFAZIONE' || poem.title === 'POSTFAZIONE'
                ? 3
                : 16;
            const amountBatches = Math.ceil(arrOfPoemsLines.length / batchSize);
            const batches = [];
            for (let i = 0; i < amountBatches; i++) {
              const batch = arrOfPoemsLines.slice(
                i * batchSize,
                i * batchSize + batchSize
              );
              batches.push(batch);
            }

            indexBook.current.push({
              poemTitle: poem.title,
              pageCounter,
            });
            pageCounter = pageCounter + amountBatches;
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
                        {poem.description === 'INDICE' ? (
                          <p
                            onClick={() => goToPoem(line.substring(2))}
                            key={index}
                          >
                            {line}
                          </p>
                        ) : (
                          <p key={index}>{line}</p>
                        )}
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