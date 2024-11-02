import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import plus from "../../Assets/Plus.png";
import multiply from "../../Assets/multiply.png";
import minus from "../../Assets/minus.png";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Maths() {
  return (
    <CardGroup>
      <Card>
        <Card.Img variant="top" src={plus} />
        <Card.Body>
          <Card.Title>Addition</Card.Title>
          <Card.Text>
            Addition is combining two or more numbers together to get a new
            total. The symbol used in addition problems looks like a cross, +,
            and is called a plus sign. The total for addition is called the sum.
          </Card.Text>
          <Link to="/addition">
            <Button variant="primary">Addition Problems</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src={minus} />
        <Card.Body>
          <Card.Title>Subtraction</Card.Title>
          <Card.Text>
            Subtraction is the process of taking one number away from another to
            get a new total. The symbol used in subtraction is a minus sign (-)
            which looks like a dash sign. The result of subtraction is called
            the difference.
          </Card.Text>
          <Link to="/substraction">
            <Button variant="primary">Substraction Problems</Button>
          </Link>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src={multiply} />
        <Card.Body>
          <Card.Title>Multiplication</Card.Title>
          <Card.Text>
            Multiplication is the process of combining equal groups to find the
            total amount. The symbol used in multiplication is an asterisk (*)
            or a multiplication sign (×). The result of multiplication is called
            the product.
          </Card.Text>
          <Link to="/Multiplication">
            <Button variant="primary">Multiplication Problems</Button>
          </Link>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}

export default Maths;
