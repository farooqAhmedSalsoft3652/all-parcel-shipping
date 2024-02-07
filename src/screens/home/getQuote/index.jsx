import { Container, Row, Col } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import SiteButton from "@components/Button/button";

import { monkeyHalfBox } from "../../../assets/images";

const GetQuote = (props) => {
  return (
    <>
      <section className="monkey-peek js-animate-in-view cf z-index-forestfloor">
        <img src={monkeyHalfBox} alt={true.toString()} className="img-fluid" />
      </section>
      <section className="pad-top-4 pad-bottom-4 monkey-jungle js-animate-in-view">
        <Container>
          <Row>
            <Col xs={12} className="z-1">
              <h4 className="h2 t-center">Don&#039;t take our word for it</h4>
              <h5 className="h3 t-center push-bottom-2">
                Thousands of people give us 5 stars!
              </h5>
              <div className="medium-width-6 t-center h-center push-bottom-4">
                <a
                  className="btn btn--quarternary btn--ghosted color-bg-white"
                  href="#_"
                >
                  See more All Parcel Shipping reviews
                </a>
              </div>
              <h3 className="h2 t-center push-bottom-3">
                Ready to send a package?
              </h3>
              <div className="medium-width-6 t-center h-center">
                <SiteButton
                  className="btn btn btn--overlay"
                  onClick={() => navigate("/ads")}
                >
                  Get a quote!
                </SiteButton>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default GetQuote;
