import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductsImage({ element }) {
  return (
    <Link to={"/products/" + element.id}>
      <Card.Img
        style={{
          cursor: "pointer",
          maxWidth: "100%",
          maxHeight: "45vh",
        }}
        variant="top"
        src={element.image}
      />
    </Link>
  );
}
