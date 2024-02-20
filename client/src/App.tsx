import "./App.css";
import ResponsiveAppBar from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import Footer from "./components/Footer.tsx";
import VoyageForm from "./components/VoyageForm.tsx";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Main />
      <VoyageForm />
      <Footer />
    </>
  );
}

export default App;
