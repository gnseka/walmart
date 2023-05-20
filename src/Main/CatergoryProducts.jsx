import Button from "react-bootstrap/Button";
import { Card, Container, Row, Col } from "react-bootstrap";

export default function CatergoryProducts({ productsOnCatergories }) {
  return (
    <>
      <Container>
        <Row>
          {productsOnCatergories?.map((element) => {
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
