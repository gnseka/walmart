/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { getAllCategories } from "../utils";
import LoginForm from "../LoginForm/LoginForm";

import { useEffect, useState } from "react";
import SignUp from "../SignUp/SignUp";

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
                <img
                  height={50}
                  width={50}
                  alt="Cart image"
                  src="https://thumbs.dreamstime.com/b/shopping-icon-shopping-cart-icon-dark-background-simple-vector-icon-shopping-icon-shopping-cart-icon-dark-background-116659167.jpg"
                ></img>
              </Nav.Link>
              {!loggedInuserName && (
                <Nav.Link href="#deets">
                  <h3 onClick={handleSignUpShow}>Sign Up</h3>
                </Nav.Link>
              )}
              {!loggedInuserName && (
                <Nav.Link href="#deets">
                  <h3 onClick={handleShow}>Login In</h3>
                </Nav.Link>
              )}
              <Nav.Link>
                <h3>{loggedInuserName}</h3>
              </Nav.Link>
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
