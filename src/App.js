import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/main/Main';
import { ThemeProvider } from './ThemeContext';
import Navbar from "./components/navbar/Navbar";

function App() {
 
  return (
    <ThemeProvider>
      <Router>
        <div className='App'>
          <Navbar />
          <Main />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
