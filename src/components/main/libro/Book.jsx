import { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './book.scss';
import like from '../../../assets/like.png';
import Page from './page/Page';
import Navbar from '../../navbar/Navbar';
import React, { useCallback } from 'react';

// https://www.npmjs.com/package/react-pageflip
// https://reactjs.org/docs/forwarding-refs.html

function Book() {
  const [poems, setPoems] = useState([]);
  // const [likesCounter, setLikesCounter] = useState(0);
  const book = useRef();
  const indexBook = useRef([]);

  // const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const backendUrl = 'http://localhost:9000/';

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

  const goToPoem = (poemTitle, num) => {
    const current = indexBook.current;
    const poemFound = current.find((item) => item.poemTitle === poemTitle);
    poemFound && book.current.pageFlip().flip(poemFound.pageCounter + num);
    // console.log(poemFound);
    // console.log({ poemTitle });
  };

  let pageCounter = 0;

  const handleAddLike = async (poem) => {
    await fetch(`${backendUrl}/editpoem/${poem._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        likes: poem.likes,
      }),
    });
  };

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
          width={600}
          height={680}
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
                  // pageNumber={`${1 + poemIndex}.${pageIndex + 1}`}
                  pageNumber={pageIndex}
                  // pageNumber={poemIndex}
                  pageDescription={poem.description}
                  title={pageIndex === 0 ? poem.title : '.....'}
                  likeImg={like}
                  likeOpacity={
                    pageIndex === 0 &&
                    poem.title !== 'PREFAZIONE' &&
                    poem.title !== 'POSTFAZIONE' &&
                    poem.description !== 'INDICE'
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                  // likesCounter={pageIndex === 0 ? likesCounter : ''}
                  likesCounter={
                    pageIndex === 0 &&
                    poem.title !== 'PREFAZIONE' &&
                    poem.title !== 'POSTFAZIONE' &&
                    poem.description !== 'INDICE'
                      ? poem.likes
                      : ''
                  }
                  addLike={() => {
                    // setLikesCounter(likesCounter + 1);
                    handleAddLike(poem);
                  }}
                  text={page.map((line, index) => {
                    return (
                      <>
                        {poem.description === 'INDICE' ? (
                          <p
                            onClick={() => {
                              if (pageIndex === 0 && poemIndex === 0) {
                                goToPoem(line, 0);
                              }
                              if (pageIndex === 1) {
                                goToPoem(line, -2);
                              }
                              if (
                                (pageIndex === 0 &&
                                  poem.title === 'Di Terre') ||
                                (pageIndex === 0 && poem.title === 'Di Amori')
                              ) {
                                goToPoem(line, 2);
                              }
                            }}
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
