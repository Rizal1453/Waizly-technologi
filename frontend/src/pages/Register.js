import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../components/config/Api";
import { Globalbutton } from "../components/GlobalButton";
import User from "../components/images/user.png";
import { Error, Success } from "../components/toast";

export const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const [change, setChange] = useState(false);

  const changeSize = () => {
    if (window.innerWidth <= 850) {
      setChange(true);
    } else {
      setChange(false);
    }
  };

  window.addEventListener("resize", changeSize);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      Success({ message: `register Success!` });
      navigate("/");
    } catch (error) {
      Error({ message: `register Failed!` });
    }
  };
  useEffect(() => {
    changeSize();
  }, []);
  return (
    <div className="myBG d-flex flex-column align-items-center">
      <img src={User} alt="" width="150" height="150" className="mt-5" />
      <h1 className=" c-pink">Register</h1>

      <Form className={change ? "w-50" : "w-25"}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="Full Name"
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
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

        <Globalbutton
          text="Register"
          size="w-100 mb-3 "
          onClick={(e) => handleSubmit(e)}
        />
      </Form>
      <p className="text-white">
        Have an account klik
        <span className="ms-2 c-pink" onClick={() => navigate("/")}>
          Login
        </span>
      </p>
    </div>
  );
};
