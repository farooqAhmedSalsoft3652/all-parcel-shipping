import { Col, Container, Row } from "react-bootstrap";

import { FooterLogo, amex, maestro, mastercard, paypal, visa } from "../../assets/images/";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLinkedin,
  faSquareFacebook,
  faSquareInstagram,
  faSquarePinterest,
  faSquareTwitter,
  faSquareYoutube,
} from "@fortawesome/free-brands-svg-icons";

export const SiteFooter = () => {
  return (
    <>
      <footer className="footer js-footer">
        <div className="footer__inner">
          <Container className="cf">
            <Row className="row">
              <Col xl={10}>
                <Row>
                  <Col xs={12} lg={4}>
                    <ul className="footer__list">
                      <li>
                        <Link to="/" className="gtm-footer-link">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link to="/ship-my-parcel" className="gtm-footer-link">
                          Ship A Package
                        </Link>
                      </li>
                      <li>
                        <Link to="/tracking" className="gtm-footer-link">
                          Track A Package
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact-us" className="gtm-footer-link">
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link to="/faq" className="gtm-footer-link">
                          FAQ’s
                        </Link>
                      </li>
                      <li>
                        <Link to="/about-us" className="gtm-footer-link">
                          About Us
                        </Link>
                      </li>
                    </ul>
                  </Col>
                  <Col xs={12} lg={4}>
                    <ul className="footer__list">
                      <li>
                        <Link to="/couriers" className="gtm-footer-link">
                          Couriers
                        </Link>
                      </li>
                      <li>
                        <Link to="#_" className="gtm-footer-link">
                          Delivery Services
                        </Link>
                      </li>
                      <li>
                        <Link to="/retailer-returns" className="gtm-footer-link">
                          Retailer Returns
                        </Link>
                      </li>
                    </ul>
                  </Col>
                  <Col xs={12} lg={4}>
                    <ul className="footer__list">
                      <li>
                        <Link
                          to="/terms-conditions"
                          rel="nofollow"
                          className="gtm-footer-link"
                        >
                          Terms &amp; Conditions
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/privacy-policy"
                          rel="nofollow"
                          className="gtm-footer-link"
                        >
                          Privacy policy
                        </Link>
                      </li>
                      <li>
                        <Link to="/reviews" className="gtm-footer-link">
                          Reviews
                        </Link>
                      </li>
                      <li>&copy; All Parcel Shipping 2024</li>
                    </ul>
                  </Col>
                </Row>
                <div className="t-center cl push-top-2 push-bottom-2 large-push-bottom-0 large-left">
                  <img src={amex} alt="AMEX" width="64" height="36" />
                  <img src={maestro} alt="MAESTRO" width="64" height="36" />
                  <img
                    src={mastercard}
                    alt="MASTERCARD"
                    width="64"
                    height="36"
                  />
                  <img src={paypal} alt="PAYPAL" width="64" height="36" />
                  <img src={visa} alt="VISA" width="64" height="36" />
                </div>
                <p className="footer__social"></p>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="footer__locales">
          <Container className="cf">
            <section className="footer__locale-choice large-width-12 ">
              {/* <svg className="icon--globe icon--globe-dims footer__locales-icon color-icon-white">
                <use xlink:href="/app/sprites/sprite.main.symbol.svg?v=173a2f411dbd011eceb1ef656a4fff22#globe"></use>
              </svg> */}
              <ul className="footer__locale-list">
                <li>
                  <a href="#_">australia</a>
                </li>
                <li>
                  <a href="#_">belgië</a>
                </li>
                <li>
                  <a href="#_">deutschland</a>
                </li>
                <li>
                  <a href="#_">españa</a>
                </li>
                <li>
                  <a href="#_">france</a>
                </li>
                <li>
                  <a href="#_">italia</a>
                </li>
                <li>
                  <a href="#_">nederland</a>
                </li>
                <li>
                  <a href="#_">united kingdom</a>
                </li>
                <li>
                  <strong>united states</strong>
                </li>
              </ul>
            </section>
          </Container>
        </div>
      </footer>

      {/* <footer className="overflow-hidden position-relative pt-4 site_footer">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={10}>
              <img className="img-fluid" src={FooterLogo} alt="footerlogo" />
              <ul className="d-flex flex-column flex-md-row footer_links justify-content-center mt-4 navFooter mb-0">
                <li className="list-unstyled">
                  <Link to="/" className="text-decoration-none">
                    home
                  </Link>
                </li>
                <li className="list-unstyled">
                  <Link to="/about-us" className="text-decoration-none ">
                    about us
                  </Link>
                </li>
                <li className="list-unstyled">
                  <Link to="/featured-ads" className="text-decoration-none">
                    Featured Ads
                  </Link>
                </li>
                <li className="list-unstyled">
                  <Link to="/ads" className="text-decoration-none">
                    Ads
                  </Link>
                </li>
                <li className="list-unstyled">
                  <Link to="/contact-us" className="text-decoration-none ">
                    contact us
                  </Link>
                </li>
              </ul>
              <ul className="footer_links d-flex justify-content-center socialIcons flex-wrap mt-4 mb-0">
                <li className="list-unstyled">
                  <Link
                    to="https://facebook.com"
                    className="text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      className="fb_icon"
                      size="2x"
                      icon={faSquareFacebook}
                    />
                  </Link>
                </li>
                <li className="list-unstyled">
                  <Link
                    to="https://instagram.com"
                    className="text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      className="insta_icon"
                      size="2x"
                      icon={faSquareInstagram}
                    />
                  </Link>
                </li>
                <li className="list-unstyled">
                  <Link
                    to="https://linkedin.com"
                    className="text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      className="linkdin_icon"
                      size="2x"
                      icon={faLinkedin}
                    />
                  </Link>
                </li>
                <li className="list-unstyled">
                  <Link
                    to="https://youtube.com"
                    className="text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      className="youtube_icon"
                      size="2x"
                      icon={faSquareYoutube}
                    />
                  </Link>
                </li>
                <li className="list-unstyled">
                  <Link
                    to="https://twitter.com"
                    className="text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      className="twitter_icon"
                      size="2x"
                      icon={faSquareTwitter}
                    />
                  </Link>
                </li>
                <li className="list-unstyled">
                  <Link
                    to="https://pinterest.com"
                    className="text-decoration-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      className="pinterest_icon"
                      size="2x"
                      icon={faSquarePinterest}
                    />
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
        <section className="copy_write py-lg-5 py-4">
          <Container>
            <Row className="align-items-baseline justify-content-center border-top-secondary pt-lg-4">
              <Col
              lg={5}
              className="d-flex mb-0 mt-lg-0 mt-3 justify-content-center justify-content-lg-start order-lg-1 order-2"
            >
              <p className="text-capitalize p-0 m-0">
                Copyright ©2023 ACOLAI. All Rights Reserved.
              </p>
            </Col>
            <Col lg={7} className=" order-lg-2 order-1">
              <ul className="d-flex flex-column flex-md-row text-center copy_write_list mb-0 mt-3 justify-content-lg-end justify-content-center">
                <li className="list-unstyled">
                  <Link className="text-decoration-none l-grey-color">
                    Privacy Policy{" "}
                  </Link>
                </li>
                <li className="list-unstyled">
                  <Link className="text-decoration-none l-grey-color">
                    {" "}
                    Terms & Conditions
                  </Link>
                </li>
                <li className="list-unstyled">
                  <Link className="text-decoration-none l-grey-color">
                    User Agreement
                  </Link>
                </li>
                <li className="list-unstyled">
                  <Link className="text-decoration-none l-grey-color">
                    FAQ’s
                  </Link>
                </li>
              </ul>
            </Col>
            </Row>
          </Container>
        </section>
      </footer> */}
    </>
  );
};
