import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/main/Main';
import { ThemeProvider } from './ThemeContext';


function App() {
  return (
    <ThemeProvider>
    <Router>
      <div className='App'>
        <Main />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
