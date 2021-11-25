import { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './libro.scss';
import Page from './page/Page';
import Navbar from '../../navbar/Navbar';
import React, { useCallback } from 'react';
// import indice from './indice.json';
// https://www.npmjs.com/package/react-pageflip
// https://reactjs.org/docs/forwarding-refs.html
function Libro() {
  const [acque, setAcque] = useState([]);
  const [terre, setTerre] = useState([]);
  const [amori, setAmori] = useState([]);
  // const [prefazione, setPrefazione] = useState([]);
  const [indice, setIndice] = useState([]);
  const [poems, setPoems] = useState([]);

  // const indice2 = [...indice];
  const book = useRef();
  const backendUrl = 'http://localhost:9000/';

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
  // const loadPrefazione = async () => {
  //   const response = await fetch(`${backendUrl}prefazione`);
  //   const prefazione = await response.json();
  //   setPrefazione(prefazione);
  // };
  const loadIndice = async () => {
    const response = await fetch(`${backendUrl}indice`);
    const indice = await response.json();
    setIndice(indice);
  };

  useEffect(() => {
    (async () => {
      await loadAcque();
      await loadTerre();
      await loadAmori();
      await loadIndice();
      setPoems((prev) => [...prev,...acque, ...terre, ...amori]);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onFlip = useCallback((e) => {
    // console.log('Current page: ' + e.data);
  }, []);
  console.log(indice);
  const navBanners = ['home', 'indice', 'prefazione', 'postfazione'];

  return (
    <>
      <Navbar navBanners={navBanners} />
      <button onClick={() => book.current.pageFlip().flip(14)}>
        Next page
      </button>

      <div className='BookOpened'>
        <HTMLFlipBook
          ref={book}
          onFlip={onFlip}
          flippingTime={1200}
          // size={"stretch"}
          width={700}
          height={800}
          className='FlipBook'
        >
          {indice.map((indice, indiceIndex) => {
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
          })}
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

export default Libro;
