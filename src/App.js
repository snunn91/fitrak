import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Dashboard from "./components/dashboard";

import Header from "./components/header";
import Home from "./components/home";

import { AuthProvider } from "./contexts/authContext";
import { ModalProvider } from "./contexts/modalContext/modalContext";
import { useRoutes } from "react-router-dom";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <ModalProvider>
        <Header />
        <div className="">{routesElement}</div>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
