import HTMLFlipBook from 'react-pageflip';
import './libro.scss';
import Page from './page/Page';
import Navbar from '../../navbar/Navbar';
import Prefazione from './prefazione/Prefazione'
import React, { useCallback } from 'react';
// https://www.npmjs.com/package/react-pageflip
// https://reactjs.org/docs/forwarding-refs.html
function Libro() {
  const onFlip = useCallback((e) => {
    console.log('Current page: ' + e.data);
  }, []);

  const navBanners = ['home','prefazione','postfazione'];

  return (
    <>
        <Navbar navBanners={navBanners}/>

    <div className='BookOpened'>
      <HTMLFlipBook
        onFlip={onFlip}
        width={600}
        height={700}
        className='FlipBook'
      >
        <Page number='1'>

“Crea parole
Le parole sono vibrazioni della natura
Così le belle parole creano una bella natura
Questa è la radice dell'universo”

Masaru Emoto

</Page>
        <Page number='2' children='we'>
        Prefazione


“Così le belle parole creano una bella natura”
Con questa citazione di Masaru Emoto, l’autrice apre la sua raccolta di poesie "Al Porto", sottotitolata:  di acque, di Terre, di Amori.
La prima volta che ebbi l’opportunità di leggere l’opera che affonda le radici nell’atavica Terra del Sulcis, ragionai sulla veridicità della suddetta dichiarazione.
Ci sono poesie che ascoltiamo con piacere, altre che non riusciamo a comprendere nella loro plenitudine, ci sono poesie che vorremmo declamare all’occasione, infine, poesie che come la tela di un pittore ci scuotono mediante un fremito di vita.
Qualcuno un giorno disse: “Il poeta è un pittore che dipinge con la penna”, concordo pienamente e aggiungo che prima di dipingere intinge la penna nel cuore. Ho letto le poesie una di seguito all’altra e mentre leggevo, nel sospiro della notte, ascoltavo suoni, respiravo profumi, vedevo Cius leggeri in laguna, uccelli librarsi in volo e anime raccontarsi sino a mettersi a nudo.
“Le belle parole” creavano “una bella natura”, quella che Duilia Dias mi mostrava prendendomi per mano senza fiatare.



        </Page>
        <Page number='3'>Prefazione


</Page>
        <Page number='4'>Page text</Page>
        <Page number='5'>Page text</Page>
        <Page number='6'>Page text</Page>
      </HTMLFlipBook>
    </div>
    </>
  );
}

export default Libro;
