import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Login from './pages/Login/Index';
import DefaultLayout from "./layouts/DefaultLayout";
import Dashboard from "./pages/Dashboard/Index";
function App() {

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
