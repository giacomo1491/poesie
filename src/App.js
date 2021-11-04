import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Main from './components/main/Main';


function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Main />
       
      </div>
      
    </Router>
  );
}

export default App;
