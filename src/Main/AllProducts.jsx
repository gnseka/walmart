import { getAllProduct } from "../utils";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Card, Container, Row, Col } from "react-bootstrap";

let ignore = false;

export default function AllProducts(params) {
  const [allProd, setallProd] = useState([]);

  const fetchAllproduct = async () => {
    const response = await getAllProduct();
    setallProd(response);
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
              <Col lg={4}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={element.image} />
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>{element.description}</Card.Text>
                    <Card.Text>Rs. {element.price}</Card.Text>
                    <Button variant="primary">Go somewhere</Button>
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
