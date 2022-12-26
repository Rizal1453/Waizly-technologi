import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  BrowserRouter,
} from "react-router-dom";
import Landing from "./pages/Landing";

import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { useContext, useEffect } from "react";
import { LoginContext } from "./components/LoginContext";
import { API, setAuthToken } from "./components/config/Api";
import { ToastContainer } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(LoginContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    if (state.islogin === false) {
      navigate("/");
    }
  }, [state]);

  const cekUser = async () => {
    try {
      const response = await API.get("/check-auth");
      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
     if (localStorage.token) {
      cekUser();
  }
 } ,[]);
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/landing" element={<Landing />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
