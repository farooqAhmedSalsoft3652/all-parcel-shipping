
import usePageTitle from "@hooks/usePageTitle";
import { Layout } from "@components/Layout/layout";
import { Col, Container, Row } from "react-bootstrap";
import SiteButton from "../../components/Button/button";
import {CustomInput} from "@components/CustomInput";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Tracking = () => {

  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault(); 
    navigate("/tracking/tracking-order");
    console.log("Form submitted!");
  }
  usePageTitle("Ship My Parcel");
  return (
    <>
      <Layout>
        <main className="align-bottom page-content bg-white">
          <Container>
            <Row>
              <Col xs={12} className="title">
                <h2 className="text-primary mb-2 fw-medium">
                  Track Your Order!
                </h2>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="mt-5">
                <div className="bg-light p-4 p-xl-5 card-form">
                  <form onSubmit={handleSubmit} id="">
                    <Row>
                      <Col xxl={11} className="mt-0">
                        <Row>
                          <Col xs={12} className="mb-3 my-md-4 d-md-flex">
                            <div className="flex-grow-1">
                              <CustomInput
                                label="Order ID"
                                type="text"
                                id="full_name"
                                required
                                placeholder="Enter Order ID"
                                labelClass="mainLabel bold"
                                inputClass="mainInput"
                              />
                            </div>
                            <div className="flex-shrink-0 align-self-end mt-3 mt-md-0 text-center text-md-start">
                              <SiteButton
                                type="submit"
                                className="btn-primary width-220"
                              >
                                Continue
                              </SiteButton>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </main>
      </Layout>
    </>
  );
}
export default Tracking;


