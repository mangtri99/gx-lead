import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Login from './pages/Login/Index';
import DefaultLayout from "./layouts/DefaultLayout";
import Dashboard from "./pages/Dashboard/Index";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';
import Index from "./pages/Lead/Index";

ChartJS.register(Colors,ArcElement, Tooltip, Legend );

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Index />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
