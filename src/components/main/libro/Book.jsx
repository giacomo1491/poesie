import { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './book.scss';
import Page from './page/Page';
import Navbar from '../../navbar/Navbar';
import React, { useCallback } from 'react';

// https://www.npmjs.com/package/react-pageflip
// https://reactjs.org/docs/forwarding-refs.html

function Book() {
  const [poems, setPoems] = useState([]);
  const book = useRef();
  const indexBook = useRef([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  // const backendUrl = 'https://alporto.herokuapp.com/';

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
    console.log('Current page: ' + e.data);
  }, []);

  const navBanners = ['home'];
  const navBannersBook = [
    { title: 'indice', page: 1 },
    { title: 'prefazione', page: 7 },
    { title: 'postfazione', page: 187 },
  ];

  const goToPoem = (poemTitle) => {
    const current = indexBook.current;
    const poemFound = current.find((item) => item.poemTitle === poemTitle);
    poemFound && book.current.pageFlip().flip(poemFound.pageCounter + 1);
    console.log(poemFound);
    // console.log({ poemTitle });
  };

  let pageCounter = 1;

  return (
    <>
      <div className='Navbars'>
        <Navbar navBanners={navBanners} />
        <ul className='Navbar'>
          {navBannersBook.map((banner, index) => (
            <li
              key={index}
              onClick={() => book.current.pageFlip().flip(banner.page)}
            >
              <p>{banner.title}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className='Book'>
        <HTMLFlipBook
          ref={book}
          onFlip={onFlip}
          flippingTime={1250}
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
                  pageDescription={poem.description}
                  title={pageIndex === 0 ? poem.title : '.....'}
                  text={page.map((line, index) => {
                    return (
                      <>
                        {poem.description === 'INDICE' ? (
                          <p
                            // onClick={() => goToPoem(line.substring(2))}
                            onClick={() => goToPoem(line)}
                            key={index}
                            style={{ cursor: 'grabbing' }}
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
