import RouteForm from "./components/RouteForm.tsx";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main.tsx";
import Layout from "./components/Layout.tsx";
import Auth from "./components/Auth.tsx"
import './App.css';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/createRoute" element={<RouteForm />} />
          <Route path="/users" element={<Auth/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
