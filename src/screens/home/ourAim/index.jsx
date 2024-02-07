import "./index.css";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { OurAdsGroup } from "@/assets/images";
import SiteButton from "@components/Button/button";

const OurAims = () => {
  const navigate = useNavigate();

  return (
    <section className="our_aim section_padding position-relative my-5 my-sm-0">
      <Container>
        <Row>
          <Col xs={12}>
            <div className="text-center">
              <h2 className="text-black text-capitalize">Are You An Expert?</h2>
              <p className="d-grey-color">
                Register now to make a difference in someone’s journey.
              </p>
              <SiteButton
                onClick={() => navigate("/about-us")}
                className=" site-btn site_border_btn"
              >
                our aim?
              </SiteButton>
              <div className="">
                <img className="img-fluid" src={OurAdsGroup} alt={true.toString()} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OurAims;
