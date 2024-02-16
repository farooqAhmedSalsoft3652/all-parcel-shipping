
import usePageTitle from "@hooks/usePageTitle";
import { Layout } from "@components/Layout/layout";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BackButton from "@components/backButton";
import {trackImg} from '../../assets/images'

const TrackingOrder = () => {

  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault(); 
    navigate("/ship-my-parcel/step-2");
    console.log("Form submitted!");
  }
  usePageTitle("Ship My Parcel");
  return (
    <>
      <Layout>
        <main className="align-bottom page-content bg-white">
          <Container>
            <Row>
              <Col lg={6} className="title">
                <h2 className="text-primary mb-2 fw-medium">
                  <BackButton className="text-primary" /> Order Id #0000000
                </h2>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="mt-3">
                <Row>
                  <Col xs={12} className="text-center">
                    <img src={trackImg} alt="" className="img-fluid" />
                  </Col>
                  <Col xs={12} className="text-center mt-3">
                    <h2 className="fw-bold">Your parcel has left the warehouse! ETA - 2 Days</h2>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </main>
      </Layout>
    </>
  );
}
export default TrackingOrder;


