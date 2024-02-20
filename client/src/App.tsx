import "./App.css";
import ResponsiveAppBar from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import Footer from "./components/Footer.tsx";
import RouteForm from "./components/RouteForm.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      {/* <ResponsiveAppBar /> */}
      <Routes>
        <Route path="/" element={<ResponsiveAppBar />}>
          <Route path="/" element={<Main />} />
          <Route path="/createroute" element={<RouteForm />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
