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
        {/* <p className='header-text'>
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
        </p> */}
        “Così le belle parole creano una bella natura” Con questa citazione di
        Masaru Emoto, l’autrice apre la sua raccolta di poesie &quot;Al
        Porto&quot;, sottotitolata: di acque, di Terre, di Amori. La prima volta
        che ebbi l’opportunità di leggere l’opera che affonda le radici
        nell’atavica Terra del Sulcis, ragionai sulla veridicità della suddetta
        dichiarazione. Ci sono poesie che ascoltiamo con piacere, altre che non
        riusciamo a comprendere nella loro plenitudine, ci sono poesie che
        vorremmo declamare all’occasione, infine, poesie che come la tela di un
        pittore ci scuotono mediante un fremito di vita. Qualcuno un giorno
        disse: “Il poeta è un pittore che dipinge con la penna”, concordo
        pienamente e aggiungo che prima di dipingere intinge la penna nel cuore.
        Ho letto le poesie una di seguito all’altra e mentre leggevo, nel
        sospiro della notte, ascoltavo suoni, respiravo profumi, vedevo Cius
        leggeri in laguna, uccelli librarsi in volo e anime raccontarsi sino a
        mettersi a nudo. “Le belle parole” creavano “una bella natura”, quella
        che Duilia Dias mi mostrava prendendomi per mano senza
      </div>
    </div>
  );
}

export default Header;
