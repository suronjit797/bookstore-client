import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/signin')
  };

  return (
    <Navbar expand="lg" className="bg-dark-subtle">
      <Container>
        <NavLink to="/" className="navbar-brand">
          <div className="fw-bold">
            Books<span className="text-bg-primary pe-1 ">Bazar</span>
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
              <Button onClick={logoutHandler} variant="danger">
                {" "}
                Logout{" "}
              </Button>
            ) : (
              <NavLink to="/signin" className="nav-link text-capitalize">
                Sign In
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
