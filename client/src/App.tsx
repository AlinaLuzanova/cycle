import RouteForm from "./components/RouteForm.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/createroute" element={<RouteForm />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
