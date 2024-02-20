import './App.css'
import ResponsiveAppBar from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  return (
    <>
      <ResponsiveAppBar/>
        <Main/>
        <Footer/>
    </>
  )
}

export default App
