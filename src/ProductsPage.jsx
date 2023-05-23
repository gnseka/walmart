import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import { Card, Container, Row, Col } from "react-bootstrap";

import { getProductById } from "./utils";
import ProductsImage from "./Main/ProductsImage";

export default function ProductsPage() {
  console.log({ a: useLocation(), b: useNavigate(), c: useParams() });

  const [prod, setProd] = useState([]);

  const { productId } = useParams();

  const callProd = async () => {
    const response = await getProductById(productId || 1);
    setProd(response);
  };

  useEffect(() => {
    callProd();
  }, []);

  return (
    <>
      <Container className="mt-5">
        <Row>
          {[prod]?.map((element) => {
            return (
              <Col>
                <Row>
                  <Col>
                    <ProductsImage element={element} />
                  </Col>
                  <Col>
                    <Card.Body>
                      <Card.Title>{element.title}</Card.Title>
                      <Card.Text>{element.description}</Card.Text>
                      <Card.Text>Rs. {element.price}</Card.Text>
                      <Button variant="primary" onClick={() => {}}>
                        Add Cart
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
