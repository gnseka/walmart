import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";

import { getProductId, getLimitResult, getSorted } from "../utils";

import "./index.css";

export default function FilterTray({ setProductsOnFilters }) {
  const [filterData, setFilterData] = useState({
    limit: 0,
    productId: 0,
  });

  const [sortState, setsortState] = useState(true);

  const onSortClick = async () => {
    setsortState(!sortState);
    const sort = sortState ? "desc" : "asc";
    let response = await getSorted(sort);
    setProductsOnFilters(response);
  };

  const hanldeFilterChange = (event) => {
    if (event.target.name === "limit") {
      setFilterData({
        limit: event.target.value,
        productId: 0,
      });
    } else if (event.target.name === "product") {
      setFilterData({
        limit: 0,
        productId: event.target.value,
      });
    }
  };

  const submitFilter = async () => {
    if (filterData.productId) {
      const singleProduct = await getProductId(filterData.productId);
      setProductsOnFilters([singleProduct]);
    } else if (filterData.limit) {
      const limitedResult = await await getLimitResult(filterData.limit);
      setProductsOnFilters(limitedResult);
    }
  };

  return (
    <Container fluid style={{ marginTop: 10 }} className="filter-container">
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Limit Result</InputGroup.Text>
            <Form.Control
              placeholder="Limit Count"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={hanldeFilterChange}
              name="limit"
              type="number"
              value={filterData.limit}
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Select Product</InputGroup.Text>
            <Form.Control
              name="product"
              placeholder="Product Id"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={hanldeFilterChange}
              type="number"
              value={filterData.productId}
            />
          </InputGroup>
        </Col>
        <Col>
          <Button onClick={onSortClick} variant="info">
            Sort Order {sortState ? "Ascending" : "decending"}
          </Button>
        </Col>
        <Col>
          <Button onClick={submitFilter} variant="primary">
            Apply Filter
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
