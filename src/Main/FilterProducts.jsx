import Button from "react-bootstrap/Button";
import { Card, Container, Row, Col } from "react-bootstrap";

export default function FilterProducts({ productsOnFilters, addCartCall }) {
  return (
    <>
      <Container>
        <Row>
          {productsOnFilters?.map((element) => {
            return (
              <Col lg={4} sm={12} xs={12} >
                <Card className="card-img">
                  <Card.Img variant="top" className="card-img" src={element.image} />
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>{element.description}</Card.Text>
                    <Card.Text>Rs. {element.price}</Card.Text>
                    <Button variant="primary" onClick={addCartCall}>
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
