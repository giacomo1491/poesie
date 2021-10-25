import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Main />
        <Footer />
      </div>
      
    </Router>
  );
}

export default App;
