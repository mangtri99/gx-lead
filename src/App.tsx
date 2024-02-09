import { Route, Routes } from "react-router-dom";
import Login from './pages/Login/Index';
import DefaultLayout from "./layouts/DefaultLayout";
import Dashboard from "./pages/Dashboard/Index";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';
import Index from "./pages/Lead/Index";
import { Toaster } from "react-hot-toast";
import Detail from "./pages/Lead/Detail";
import Setting from "./pages/Setting/Index";
import Form from "./pages/Lead/Form";

ChartJS.register(Colors,ArcElement, Tooltip, Legend );

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Index />} />
          <Route path="/leads/:id/detail" element={<Detail />} />
          <Route path="/leads/create" element={<Form />} />
          <Route path="/leads/:id/edit" element={<Form />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
