import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/main/Main';

function App() {
  return (
    <Router>
      <div className='App'>
        <Main />
        ciao
      </div>
    </Router>
  );
}

export default App;
