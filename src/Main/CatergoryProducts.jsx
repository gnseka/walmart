import Button from "react-bootstrap/Button";
import { Card, Container, Row, Col } from "react-bootstrap";

import ProductsImage from "./ProductsImage";

export default function CatergoryProducts({ productsOnCatergories ,addCartCall}) {
  return (
    <>
      <Container>
        <Row>
          {productsOnCatergories?.map((element) => {
            return (
              <Col lg={4} sm={12} xs={12}>
                <Card  className="card-img">
                <ProductsImage element={element} />
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>{element.description.substring(0, 200)}</Card.Text>
                    <Card.Text>Rs. {element.price}</Card.Text>
                    <Button variant="primary" onClick={addCartCall} >Add Cart</Button>
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
