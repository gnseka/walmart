import { getAllProduct } from "../utils";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Card, Container, Row, Col } from "react-bootstrap";

export default function AllProducts(params) {
  const [allProd, setallProd] = useState([]);

  const fetchAllproduct = async () => {
    const response = await getAllProduct();
    console.log(response, "get all products response");
    setallProd(response);
  };

  useEffect(() => {
    fetchAllproduct();
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
