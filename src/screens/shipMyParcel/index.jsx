
import usePageTitle from "@hooks/usePageTitle";
import { Layout } from "@components/Layout/layout";
import { Col, Container, Row } from "react-bootstrap";
import SiteButton from "../../components/Button/button";
import {CustomInput} from "@components/CustomInput";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ShipMyParcel = () => {

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
        <main className="align-bottom page-content bg-blue">
          <Container>
            <Row>
              <Col xs={6}>
                <div className="title">
                  <h2 className="text-white mb-4 fw-medium">Ship My Parcel</h2>
                  <p className="text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean euismod bibendum laoreet. Proin gravida dolor sit
                    amet lacus accumsan et viverra justo commodo.
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="mt-5">
                <div className="bg-light p-4 p-xl-5 card-form">
                  <form onSubmit={handleSubmit} id="">
                    <Row>
                      <Col
                        xs={12}
                        className="d-md-flex justify-content-md-between mb-4"
                      >
                        <h3 className="mb-3 mb-md-0 fw-bold">Dimension</h3>
                        <SiteButton
                          type="submit"
                          className="btn-outline-primary"
                        >
                          <FontAwesomeIcon icon={faPlus} className="me-3" />
                          Click Here To Add Another Package
                        </SiteButton>
                      </Col>

                      <Col xxl={11} className="mt-3">
                        <Row>
                          <Col md={4} className="mb-3 mb-md-0">
                            <CustomInput
                              label="Length of Parcel"
                              type="text"
                              id="full_name"
                              required
                              placeholder="Length of Parcel"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              inputUnit="Cm"
                            />
                          </Col>
                          <Col md={4} className="mb-3 mb-md-0">
                            <CustomInput
                              label="Width of Parcel"
                              type="text"
                              id="full_name"
                              required
                              placeholder="Width of Parcel"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              inputUnit="Cm"
                            />
                          </Col>
                          <Col md={4} className="mb-3 mb-md-0">
                            <CustomInput
                              label="Height of Parcel"
                              type="text"
                              id="full_name"
                              required
                              placeholder="Height of Parcel"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              inputUnit="Cm"
                            />
                          </Col>
                        </Row>
                        <Row className="mt-4 mt-xl-5 mb-4">
                          <Col xs={12}>
                            <h3 className="mb-3 mb-md-4 fw-bold">Weight</h3>
                          </Col>
                          <Col md={8}>
                            <CustomInput
                              label="Total Weight of Package"
                              type="text"
                              id="full_name"
                              required
                              placeholder="Total Weight of Package"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              inputUnit="Kg"
                            />
                          </Col>
                          <Col
                            md={4}
                            className="d-flex justify-content-center justify-content-md-end mt-4 mt-md-0"
                          >
                            <SiteButton
                              type="submit"
                              className="btn-primary d-block w-75 align-self-end"
                            >
                              Continue
                            </SiteButton>
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
};

export default ShipMyParcel;


