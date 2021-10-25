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
    <HTMLFlipBook onFlip={onFlip} width={300} height={500} className='FlipBook'>
      <Page number='1'>Page text</Page>
      <Page number='2' children='we'>
        Page text
      </Page>
      <Page number='3'>Page text</Page>
      <Page number='4'>Page text</Page>
    </HTMLFlipBook>
  );
}

export default Libro;
