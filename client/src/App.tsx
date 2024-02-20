import './App.css'
import ResponsiveAppBar from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import Footer from "./components/Footer.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
      <>
        <ResponsiveAppBar/>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
        <Footer/>
      </>
  );
}

export default App
