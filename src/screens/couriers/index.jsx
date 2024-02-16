
import usePageTitle from "@hooks/usePageTitle";
import { Layout } from "@components/Layout/layout";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { dhl, fedexIcon, purolatorIcon, ups, usps, ips, dpd, asendia,pitneyBowes, bpost, chronopost, colissimo, parcelforce  } from "@/assets/images";

const Couriers = () => {

  const navigate = useNavigate()
  usePageTitle("Couriers");
  return (
    <>
      <Layout>
        <section className="page-title text-center">
          <Container>
              <Row>
                <Col xs={12}>
                <h2 className="text-primary mb-0 fw-medium">Couriers</h2>
                </Col>
              </Row>
          </Container>
        </section>
        <section className="content-section bg-white">
          <Container>
              <Row>
                <Col xs={12} className="mb-5">
                  <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Couriers</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col xs={12}>
                  <h2 className="text-primary mb-3 fw-medium">US freight forwarders</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Col>
              </Row>
          </Container>
        </section>

        <section className="bg-light-gray logo-tags">
          <Container>
              <Row>
                <Col xs={12}>
                <ul>
                    <li>
                      <Link to="/couriers-details">
                        <div div className="logo-tags__logo"><img src={dhl} alt="DHL" /></div>
                        <div className="logo-tags__content">
                          <div className="logo-tags__title">DHL</div>
                          <div className="logo-tags__sub-text">
                            View courier details
                            <FontAwesomeIcon icon={faAngleRight} />
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/couriers-details">
                        <div div className="logo-tags__logo"><img src={fedexIcon} alt="FedEx" /></div>
                        <div className="logo-tags__content">
                          <div className="logo-tags__title">FedEx</div>
                          <div className="logo-tags__sub-text">
                            View courier details
                            <FontAwesomeIcon icon={faAngleRight} />
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/couriers-details">
                        <div div className="logo-tags__logo"><img src={purolatorIcon} alt="Purolator" /></div>
                        <div className="logo-tags__content">
                          <div className="logo-tags__title">Purolator</div>
                          <div className="logo-tags__sub-text">
                            View courier details
                            <FontAwesomeIcon icon={faAngleRight} />
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/couriers-details">
                        <div div className="logo-tags__logo"><img src={ups} alt="UPS" /></div>
                        <div className="logo-tags__content">
                          <div className="logo-tags__title">UPS</div>
                          <div className="logo-tags__sub-text">
                            View courier details
                            <FontAwesomeIcon icon={faAngleRight} />
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/couriers-details">
                        <div div className="logo-tags__logo"><img src={usps} alt="DHL" /></div>
                        <div className="logo-tags__content">
                          <div className="logo-tags__title">DHL</div>
                          <div className="logo-tags__sub-text">
                            View courier details
                            <FontAwesomeIcon icon={faAngleRight} />
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </Col>
              </Row>
          </Container>
        </section>
        <section className="content-section bg-white">
          <Container>
              <Row>
                <Col xs={12}>
                  <h2 className="text-primary mb-3 fw-medium">US freight forwarders</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Col>
              </Row>
          </Container>
        </section>
        <section className="bg-light-gray logo-tags">
          <Container>
              <Row>
                <Col xs={12}>
                <ul>
                    <li>
                      <Link to="/couriers-details">
                        <div div className="logo-tags__logo"><img src={asendia} alt="Asendia" /></div>
                        <div className="logo-tags__content">
                          <div className="logo-tags__title">Asendia</div>
                          <div className="logo-tags__sub-text">
                            View courier details
                            <FontAwesomeIcon icon={faAngleRight} />
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/couriers-details">
                        <div div className="logo-tags__logo"><img src={ips} alt="IPS" /></div>
                        <div className="logo-tags__content">
                          <div className="logo-tags__title">IPS</div>
                          <div className="logo-tags__sub-text">
                            View courier details
                            <FontAwesomeIcon icon={faAngleRight} />
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/couriers-details">
                        <div div className="logo-tags__logo"><img src={pitneyBowes} alt="Pitney Bowes" /></div>
                        <div className="logo-tags__content">
                          <div className="logo-tags__title">Pitney Bowes</div>
                          <div className="logo-tags__sub-text">
                            View courier details
                            <FontAwesomeIcon icon={faAngleRight} />
                          </div>
                        </div>
                      </Link>
                    </li>
                   
                    
                  </ul>
                </Col>
              </Row>
          </Container>
        </section>


        <section className="content-section bg-white align-bottom">
          <Container>
              <Row>
                <Col xs={12}>
                  <h2 className="text-primary mb-3 fw-medium">Courier companies in Europe</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Col>
              </Row>
          </Container>
        </section>

        <section className="align-bottom bg-light-gray logo-tags">
          <Container>
              <Row>
                <Col xs={12}>
                <ul>
                    <li>
                      <Link to="/couriers-details">
                        <div div className="logo-tags__logo"><img src={bpost} alt="BPost" /></div>
                        <div className="logo-tags__content">
                          <div className="logo-tags__title">BPost</div>
                          <div className="logo-tags__sub-text">
                            View courier details
                            <FontAwesomeIcon icon={faAngleRight} />
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/couriers-details">
                        <div div className="logo-tags__logo"><img src={chronopost} alt="Chronopost" /></div>
                        <div className="logo-tags__content">
                          <div className="logo-tags__title">Chronopost</div>
                          <div className="logo-tags__sub-text">
                            View courier details
                            <FontAwesomeIcon icon={faAngleRight} />
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/couriers-details">
                        <div div className="logo-tags__logo"><img src={colissimo} alt="Colissimo" /></div>
                        <div className="logo-tags__content">
                          <div className="logo-tags__title">Colissimo</div>
                          <div className="logo-tags__sub-text">
                            View courier details
                            <FontAwesomeIcon icon={faAngleRight} />
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/couriers-details">
                        <div div className="logo-tags__logo"><img src={dpd} alt="DPD" /></div>
                        <div className="logo-tags__content">
                          <div className="logo-tags__title">DPD</div>
                          <div className="logo-tags__sub-text">
                            View courier details
                            <FontAwesomeIcon icon={faAngleRight} />
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/couriers-details">
                        <div div className="logo-tags__logo"><img src={parcelforce} alt="ParcelForce" /></div>
                        <div className="logo-tags__content">
                          <div className="logo-tags__title">ParcelForce</div>
                          <div className="logo-tags__sub-text">
                            View courier details
                            <FontAwesomeIcon icon={faAngleRight} />
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </Col>
              </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
}
export default Couriers;


