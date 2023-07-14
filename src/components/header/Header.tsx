import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function Header() {
  const isLogin = false;

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">
          <div className="fw-bold">
            Books<span className="text-bg-primary">Bazar</span>
          </div>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link text-capitalize">
              Home
            </NavLink>
            <NavLink to="/books" className="nav-link text-capitalize">
              books
            </NavLink>
            {isLogin ? (
              <NavLink to="/signin" className="nav-link text-capitalize">
                Sign In
              </NavLink>
            ) : (
              <NavLink to="/signup" className="nav-link text-capitalize">
                Sign Up
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
