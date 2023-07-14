import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import './footer.css'

const Footer = () => {
  return (
    <footer className="mt-auto bg-dark-subtle py-4">
      <Container>
        <Row>
          <Col>
            <div className="fw-bold">
              Books<span className="text-bg-primary pe-1 ">Bazar</span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
