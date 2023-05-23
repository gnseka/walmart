import { getAllProduct } from "../utils";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Card, Container, Row, Col } from "react-bootstrap";

import ProductsImage from "./ProductsImage";

let ignore = false;

export default function AllProducts({ addCartCall }) {
  const [allProd, setallProd] = useState([]);

  const fetchAllproduct = async () => {
    const response = await getAllProduct();
    setallProd(response);
    localStorage.setItem("allproducts", JSON.stringify(response));
  };

  useEffect(() => {
    if (!ignore) {
      fetchAllproduct();
      ignore = true;
    }
  }, []);

  return (
    <>
      <Container>
        <Row>
          {allProd?.map((element) => {
            return (
              <Col lg={4} sm={12} xs={12}>
                <Card className="card-img">
                  <ProductsImage element={element} />
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>
                      {element.description?.substring(0, 200)}
                    </Card.Text>
                    <Card.Text>Rs. {element.price}</Card.Text>
                    <Button onClick={addCartCall} variant="primary">
                      Add Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
