import React, { useState, useRef, useEffect } from "react";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

import { Card,Col } from "react-bootstrap";

import { getUserCart } from "../utils";
import "./index.css";

export default function Cart() {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const [cartProdcuts, setCartProdcuts] = useState([]);
  const [cartFullProdcut, setCartFullProdcut] = useState([]);

  const ref = useRef(null);
  const userId = localStorage.getItem("userId");

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);

    const allproducts = JSON.parse(localStorage.getItem("allproducts"));
    const cartIds = cartProdcuts.map((element) => element.productId);

    const cart = allproducts.filter((eachProduct) => {
      return cartIds.includes(eachProduct.id);
    });

    setCartFullProdcut(cart);
  };

  useEffect(() => {
    if (userId) {
      getUserCart(userId).then((response) => {
        if (response.length) {
          setCartProdcuts(response[0].products);
        }
      });
    }
  }, [userId]);

  return (
    <>
      <div ref={ref}>
        <div onClick={handleClick} style={{ position: "relative" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <h6 className="cart">{cartProdcuts.length}</h6>
        </div>

        <Overlay
          show={show}
          target={target}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Header as="h3">Your Items</Popover.Header>
            <Popover.Body>
              {cartFullProdcut?.map((element) => {
                return (
                  <Col lg={4}>
                    <Card style={{ width: "15rem" }}>
                      <Card.Img
                        style={{
                          width: "15vw",
                          height: "18vw",
                        }}
                        variant="top"
                        src={element.image}
                      />
                      <Card.Body>
                        <Card.Title>{element.title}</Card.Title>
                        <Card.Text>{element.description}</Card.Text>
                        <Card.Text>Rs. {element.price}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>
    </>
  );
}
