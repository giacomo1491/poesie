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
  const [prefazione, setPrefazione] = useState([]);
  const [indice, setIndice] = useState([]);
  const [acque, setAcque] = useState([]);
  const [terre, setTerre] = useState([]);
  const [amori, setAmori] = useState([]);
  const [postfazione, setPostfazione] = useState([]);
  const [poems, setPoems] = useState([]);

  const book = useRef();
  const backendUrl = 'http://localhost:9000/';

  const loadPrefazione = async () => {
    const response = await fetch(`${backendUrl}prefazione`);
    const prefazione = await response.json();
    setPrefazione(prefazione);
  };
  const loadIndice = async () => {
    const response = await fetch(`${backendUrl}indice`);
    const indice = await response.json();
    setIndice(indice);
  };

  const loadAcque = async () => {
    const response = await fetch(`${backendUrl}acque`);
    const acque = await response.json();
    setAcque(acque);
  };
  const loadTerre = async () => {
    const response = await fetch(`${backendUrl}terre`);
    const terre = await response.json();
    setTerre(terre);
  };
  const loadAmori = async () => {
    const response = await fetch(`${backendUrl}amori`);
    const amori = await response.json();
    setAmori(amori);
  };
  const loadPostfazione = async () => {
    const response = await fetch(`${backendUrl}postfazione`);
    const postfazione = await response.json();
    setPostfazione(postfazione);
  };

  useEffect(() => {
    (async () => {
      await setPoems((prev) => [
        ...prev,
        ...prefazione,
        ...indice,
        ...acque,
        ...terre,
        ...amori,
        ...postfazione,
      ]);
      await loadPrefazione();
      await loadIndice();
      await loadAcque();
      await loadTerre();
      await loadAmori();
      await loadPostfazione();
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
          {poems.map((poem, poemIndex) => {
            console.log(poem.title);
            const arrOfPoemsLines = poem.text.split('\n');
            const batchSize = poem.title === 'PREFAZIONE' ? 3 : 16;
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
