import { createBrowserRouter } from "react-router-dom";
import Login from './pages/Login/Index';
import DefaultLayout from "./layouts/DefaultLayout";
import Dashboard from "./pages/Dashboard/Index";
import Index from "./pages/Lead/Index";
import Detail from "./pages/Lead/Detail";
import Setting from "./pages/Setting/Index";
import Form from "./pages/Lead/Form";
import { default as NotFound } from "./pages/404/Index";

export const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/leads",
          element: <Index />,
        },
        {
          path: "/leads/:id/detail",
          element: <Detail />,
        },
        {
          path: "/leads/create",
          element: <Form isEdit={false} />,
        },
        {
          path: "/leads/:id/edit",
          element: <Form isEdit />,
        },
        {
          path: "/setting",
          element: <Setting />,
        },
      ],
    },
    // not found
    {
      path: "*",
      element: <NotFound />,
    },
  ],
);