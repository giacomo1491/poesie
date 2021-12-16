import { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './book.scss';
import Page from './page/Page';
import React, { useCallback } from 'react';
import FadeIn from 'react-fade-in';
import { FaSpinner } from 'react-icons/fa';
import { useTheme } from '../../../ThemeContext';

// https://www.npmjs.com/package/react-pageflip
// https://reactjs.org/docs/forwarding-refs.html

function Book() {
  const [poems, setPoems] = useState([]);
  const book = useRef();
  const indexBook = useRef([]);
  const { currentUser, setNavActive } = useTheme();

  // const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const backendUrl = 'http://localhost:9000';

  useEffect(() => {
    setNavActive([false, true, true, true]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const navBannersBook = [
    { title: 'indice', page: 0 },
    { title: 'prefazione', page: 7 },
    { title: 'postfazione', page: 186 },
  ];

  const goToPoem = (poemTitle, num) => {
    const current = indexBook.current;
    const poemFound = current.find((item) => item.poemTitle === poemTitle);
    poemFound && book.current.pageFlip().flip(poemFound.pageCounter + num);
    // console.log(poemFound);
    // console.log({ poemTitle });
  };

  let pageCounter = 0;

  const handleAddLike = async (poem, description) => {
    console.log(poem.likes);
    console.log(typeof likes);
    await fetch(`${backendUrl}/addLike/${description}/${poem._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      likes: poem.likes,
      body: JSON.stringify({ userName: currentUser.userName }),
    });
    (async () => {
      await loadPoems();
    })();

    // 2. Solution to see the likes without refresh the page

    // const response = await fetch(`${backendUrl}/addLike/acque/${poem._id}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // const data = await response.json();
    // poems.find((m) => m._id === poem._id).likes = data.likes
    //   setPoems((prev) => [...prev, ...poems]);
  };

  return (
    <>
      <ul className='bookNavbar'>
        {navBannersBook.map((banner, index) => (
          <li
            key={index}
            onClick={() => book.current.pageFlip().flip(banner.page)}
          >
            <p>{banner.title}</p>
          </li>
        ))}
      </ul>

      <div className='Book'>
        {poems.length < 1 && (
          <FadeIn transitionDuration='800'>
            <div>
              <FaSpinner className='spinner' />
              <span className='loading'> Loading...</span>
            </div>
          </FadeIn>
        )}
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
            // console.log({ pageCounter, poem: poem.title });
            const arrOfPoemsLines = poem.text.split('\n');
            const batchSize =
              poem.description === 'prefazione' ||
              poem.description === 'postfazione'
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
                  pageIndex={pageIndex}
                  pageNumber={`${1 + poemIndex}.${pageIndex + 1}`}
                  pageDescription={
                    (poemIndex === 79 && pageIndex === 0) ||
                    (poemIndex === 80 && pageIndex === 0)
                      ? ''
                      : poem.description
                  }
                  title={pageIndex === 0 ? poem.title : '.....'}
                  poem={poem}
                  addLike={() => {
                    if (currentUser.userName === 'anonymousUser') {
                      alert('to like the poems you must be registered');
                      setNavActive([false, true, false, false]);
                    }
                    if (
                      poem.likes.find(
                        (element) => element === currentUser.userName
                      )
                    ) {
                      alert('you can vote only once per poem');
                    } else handleAddLike(poem, poem.description.slice(3));
                  }}
                  text={page.map((line, index) => {
                    return (
                      <>
                        {poem.description === 'indice' ? (
                          <p
                            className='bookIndexTitle'
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
                            - {line}
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
