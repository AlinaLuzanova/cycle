import RouteForm from "./components/RouteForm.tsx";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main.tsx";
import Layout from "./components/Layout.tsx";

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/"  element={<Main />} />
            <Route path="/createroute" element={<RouteForm />} />
          </Route>
        </Routes>
      </>
  );
}

export default App;
