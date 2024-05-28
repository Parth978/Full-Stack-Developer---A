import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);
  return <><RouterProvider router={router} /></>;
}

export default App;
