import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../Assets/BabySprout.png";
import { Badge } from "react-bootstrap";

function Navbared() {
  const logoStyles = {
    borderRadius: "100%",
    height: "40px",
    width: "140px",
    objectFit: "cover",
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <h3>
              <img
                src={logo}
                style={logoStyles}
                height="40"
                className="d-inline-block align-top"
                alt="BabySprout logo"
              />{" "}
              <Badge bg="secondary">Baby Sprout</Badge>
            </h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-3">
              <Nav.Link href="/">
                <h3>
                  <Badge bg="secondary">Home</Badge>
                </h3>
              </Nav.Link>
              <Nav.Link href="/maths">
                {" "}
                <h3>
                  <Badge bg="secondary">Explore Maths</Badge>
                </h3>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbared;
