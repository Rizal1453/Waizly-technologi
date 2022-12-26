import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../components/config/Api";
import { Globalbutton } from "../components/GlobalButton";
import User from "../components/images/user.png";
import { LoginContext } from "../components/LoginContext";
import { Error, Success } from "../components/toast";

export const Login = () => {
  const [state, dispatch] = useContext(LoginContext);
  const navigate = useNavigate();
  const [form, setForm] = useState();

  const [change, setChange] = useState(false);

  const changeSize = () => {
    if (window.innerWidth <= 850) {
      setChange(true);
    } else {
      setChange(false);
    }
  };

  window.addEventListener("resize", changeSize);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/login", form);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });
      localStorage.setItem("token", response.data.data.token);
      navigate("/landing");
      Success({ message: `Login Success!` });
    } catch (error) {
      Error({ message: `Login Failed!` });
    }
  };
  useEffect(()=>{
    changeSize()
  },[])

  return (
    <div className="myBG d-flex flex-column align-items-center">
      <img src={User} alt="" width="150" height="150" className="mt-5" />
      <h1 className=" c-pink">Login</h1>
      <Form className={change ? "w-50" : "w-25"}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <Globalbutton text="Login" size="w-100 mb-3 " onClick={handleSubmit} />
      </Form>
      <p className="text-white">
        Dont Have account klik
        <span className="ms-2 c-pink" onClick={() => navigate("/register")}>
          Register
        </span>
      </p>
    </div>
  );
};
