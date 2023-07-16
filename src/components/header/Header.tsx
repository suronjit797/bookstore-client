import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    setIsLogin(false);
    navigate("/signin");
  };

  return (
    <Navbar expand="md" className="bg-dark-subtle">
      <Container fluid>
        <NavLink to="/" className="navbar-brand">
          <div className="fw-bold">
            Books<span className="text-bg-primary pe-1 ">Bazar</span>
          </div>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <NavLink to="/" className="nav-link text-capitalize">
              Home
            </NavLink>
            <NavLink to="/books" className="nav-link text-capitalize">
              books
            </NavLink>
            <NavLink to="/wishlist" className="nav-link text-capitalize">
              wishlist
            </NavLink>
            <NavLink to="/add-new" className="nav-link text-capitalize">
              add new book
            </NavLink>
            {isLogin ? (
              <>
                {/* <NavLink to="/add-new" className="nav-link text-capitalize">
                  add new book
                </NavLink> */}

                <Button
                  className="ms-2"
                  onClick={logoutHandler}
                  variant="danger"
                >
                  Logout
                </Button>
              </>
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
