import React, { useEffect, useState } from "react";
import "./App.css";
import LogIn from "../Accounts/LogIn";
import { auth } from "../../firebaseConfig";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Offers from "../Offers/Offers";
import Register from "../Accounts/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged, User } from "firebase/auth";
import { PacmanLoader } from "react-spinners";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/offers" />,
  },
  {
    path: "/offers",
    element: <Offers />,
  },
]);

const unauthenticatedRouter = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  const [userToken, setUserToken] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(true);

  const handleAuthStateChange = () => {
    setIsLoading(true);

    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          user.getIdToken().then((token) => {
            localStorage.setItem("token", token);
            setUserToken(token);
            setIsLoading(false);
          });
        } else {
          localStorage.removeItem("token");
          setUserToken(null);
          setIsLoading(false);
        }
      },
      (error) => {
        toast.error(`Token refresh error:${error}`, {
          type: "error",
        });
        console.log("Token refresh error:", error);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    handleAuthStateChange();
    localStorage.getItem("token")
      ? setUserToken(localStorage.getItem("token"))
      : setUserToken(null);
  }, []);

  return (
    <div className="App">
      {isLoading && <PacmanLoader />}
      {!isLoading && (
        <RouterProvider router={userToken ? router : unauthenticatedRouter} />
      )}
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App;
