import './header.css';
import Nav from './navbar/nav';

function Header() {
  return (
    <div className='header--wrapper'>
      <div className='header--home'>
        <Nav />
        <h2>Al Porto</h2>
      </div>
      <div className='header--slide2'>
        <Nav />
        <p className='header-text'>
          “Crea parole <br /> Le parole sono vibrazioni della natura <br /> Così
          le belle parole creano una bella natura <br /> Questa è la radice
          dell'universo”
          <br /> <br /> <span id='masaru-emoto'>Masaru Emoto</span>
        </p>
        <p className='main-text'>
          “Così le belle parole creano una bella natura” Con questa citazione,
          l’autrice apre la sua raccolta <br /> di poesie "
          <span className='span-title'>Al Porto"</span>, sottotitolata: di
          acque, di Terre, di Amori.
        </p>
      </div>
    </div>
  );
}

export default Header;
