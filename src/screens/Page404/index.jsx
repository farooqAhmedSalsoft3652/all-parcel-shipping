
import './index.css';
import { Container, Row, Col } from 'react-bootstrap';
import BackButton from '@components/backButton';
import usePageTitle from '@hooks/usePageTitle';

const NotFound = () => {
  usePageTitle("Error");
  return (
    <Container className="not-found-container">
      <Row>
        <Col>
          <h1>404</h1>
          <p>Page not found</p>
          <h4 className='mt-2'><BackButton/> Go Back</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;