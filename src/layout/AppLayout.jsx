import "./AppLayout.style.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet, useNavigate } from "react-router-dom";
import banterflixLogo from "../images/banterflix_logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer/Footer";

const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchByKeyword = (event) => {
    event.preventDefault();
    navigate(`/search?q=${keyword}`);
    setKeyword("");
  };

  return (
    <div className="wrapper">
      <Navbar
        expand="lg"
        variant="dark"
        // bg="dark"
        className="bg-body-tertiary, navbar-area"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              src={banterflixLogo}
              alt="Banterflix Logo"
              style={{ width: "220px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/" className="navbar-btn">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="movies" className="navbar-btn">
                Films
              </Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 search-box"
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <Button variant="outline-danger" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet className="contentWrapper" />
      <Footer className="footer-test" />
    </div>
  );
};

export default AppLayout;
