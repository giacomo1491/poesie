import HTMLFlipBook from 'react-pageflip';
import './libro.scss';
import Page from './page/Page';
import React, { useCallback } from 'react';
// https://www.npmjs.com/package/react-pageflip
// https://reactjs.org/docs/forwarding-refs.html
function Libro() {
  const onFlip = useCallback((e) => {
    console.log('Current page: ' + e.data);
  }, []);
  return (
    <div className='BookOpened'>
      <HTMLFlipBook
        onFlip={onFlip}
        width={600}
        height={700}
        className='FlipBook'
      >
        <Page number='1'>Page text</Page>
        <Page number='2' children='we'>
          Page text
        </Page>
        <Page number='3'>Page text</Page>
        <Page number='4'>Page text</Page>
        <Page number='5'>Page text</Page>
        <Page number='6'>Page text</Page>
      </HTMLFlipBook>
    </div>
  );
}

export default Libro;
