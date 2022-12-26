import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginContext";

export const NavbarComponents = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(LoginContext);
   const logout = () => {
     console.log(state);
     dispatch({
       type: "LOGOUT",
     });
     navigate("/");
   };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Hi,{state.user.name}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="w-100 d-flex justify-content-end">
            <Button variant="outline-light" onClick={logout}>
              Log Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
