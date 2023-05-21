/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";

import { getAllCategories } from "../utils";
import LoginForm from "../LoginForm/LoginForm";

import { useEffect, useState } from "react";
import SignUp from "../SignUp/SignUp";
import Cart from "../Cart/Cart";

import { ToastContainer } from "react-toastify";

let ignore = false;

function NavbarDark({ setselectedCatergory }) {
  const [AllCategories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [showSignUp, setshowSignUp] = useState(false);
  const [loggedInuserName, setloggedInuserName] = useState("");

  const getUser = async () => {
    const user = await localStorage.getItem("username");
    setloggedInuserName(user);
  };

  useEffect(() => {
    getUser();
  }, [show]);

  const handleClose = () => {
    setShow(false);
    setshowSignUp(false);
  };

  const handleShow = () => setShow(true);

  const handleSignUpShow = () => setshowSignUp(true);

  const handleLogout = () => {
    // localStorage.clear();
    localStorage.removeItem("userId", "");
    localStorage.removeItem("username", "");
    setloggedInuserName("");
    window.location.reload();
  };

  useEffect(() => {
    if (!ignore) {
      getAllCategories().then((response) => {
        setCategories(response);
        ignore = true;
      });
    }
    return () => {
      ignore = true;
    };
  }, []);

  const onCategorySelect = (eventkey) => {
    if (!("Categories" === eventkey.target.text)) {
      setselectedCatergory(eventkey.target.text);
    }
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <img
            width={200}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj6Jot5zq_PtLQ9DmmeNntdcVWpm4v1uxYdQ&usqp=CAU"
          ></img>
          {/* <Navbar.Brand href="#home">Walmark</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown
                title="Categories"
                id="collasible-nav-dropdown"
                onClick={onCategorySelect}
              >
                {AllCategories.map((element, index) => {
                  return (
                    <NavDropdown.Item key={index} href="#action/3.1">
                      {element}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">
                <Cart />
              </Nav.Link>
              {!loggedInuserName && (
                <Nav.Link href="#deets">
                  <h3 onClick={handleSignUpShow}>Sign Up</h3>
                </Nav.Link>
              )}
              {!loggedInuserName && (
                <Nav.Link href="#deets">
                  <h3 onClick={handleShow}>Log In</h3>
                </Nav.Link>
              )}
              <Nav.Link>
                <h3>{loggedInuserName}</h3>
              </Nav.Link>
              {loggedInuserName && (
                <Nav.Link href="#deets">
                  <h3 onClick={handleLogout}>
                    Log
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="currentColor"
                      class="bi bi-box-arrow-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                      />
                    </svg>
                  </h3>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm setShow={setShow} />
        </Modal.Body>
      </Modal>

      <Modal show={showSignUp} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUp setshowSignUp={setshowSignUp} />
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default NavbarDark;
