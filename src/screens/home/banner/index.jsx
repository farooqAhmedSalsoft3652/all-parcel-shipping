import "./index.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { roles } from "@config/data";
import useAuth from "@hooks/useAuth";
import SiteButton from "@components/Button/button";
import CustomModal from "@components/customModal";
import { CustomInput } from "@components/CustomInput";


import {
    CountrySelect,
} from "react-country-state-city";
import ReactFlagsSelect from "react-flags-select";

// import "react-country-state-city/dist/react-country-state-city.css";

const Banner = () => {
    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);
  const { role } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showSignUpButton, setShowSignUpButton] = useState(true);

  const [selected, setSelected] = useState("US");


  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Login button clicked!");
    navigate("/login");
  };

  const handleSignUp = () => {
    console.log("Sign Up button clicked!");
    navigate("/signup");
  };
  return (
    <>
      <section
        id="hero-1"
        className="hero hero--home pad-bottom-3 js-animate-in-view has-qq hero--show-qq-form-for-mobile animate-in-view animate-in-view--once"
      >
        

        <div className="hero__text-cont">
          <h1 className="hero__title ">Lorem ipsum dolor</h1>
          <p className="hero__sub-title " role="heading" aria-level="2">
            sit amet consectetur adipisicing
          </p>
          <p className="hero__discount">
            <span className="label-tag">Discounted</span> Lorem ipsum dolor sit
            amet consectetur adipisicing
          </p>
          
          <div className="hero-flex-image-wrapper">
            <div className="hero__flex-image"></div>
          </div>
        </div>
        
        <section className="js-quick-quote quick-quote quick-quote--hero quick-quote--show-form-for-mobile">
          <div className="container">
            <div className="quick-quote__outer">
              <h2 className="h3 quick-quote__header">
                Get a quote without signing up
              </h2>
              
              <div className="quick-quote__window">
                <div className="quick-quote__field-outer">
                  <div className="grid">
                    <div className="grid-item medium-width-4 border-end">
                      <div className="form-input  quick-quote__from-input d-lg-flex">
                        <label for="collection_country_code_1" class="d-inline-block flex-shrink-0 align-self-center pe-2">From:</label>
                        <ReactFlagsSelect
                          selected={selected}
                          onSelect={(code) => setSelected(code)}
                          className="flex-grow-1"
                          searchable
                        />
                      </div>
                    </div>
                    <div className="grid-item medium-width-4 border-end">
                      <div className="form-input  quick-quote__from-input d-lg-flex">
                        <label for="collection_country_code_1" class="d-inline-block flex-shrink-0 align-self-center pe-2">To:</label>
                        <ReactFlagsSelect
                          selected={selected}
                          onSelect={(code) => setSelected(code)}
                          className="flex-grow-1"
                          searchable
                        />
                      </div>
                    </div>
                    <div className="grid-item medium-width-4">
                      <div className="form-input quick-quote__from-input  d-flex">
                        <div className="flex-grow-1">
                          <CustomInput
                            labelClass="mainLabel bold ms-0"
                            type="number"
                            id="firstname"
                            placeholder="Parcel Weight?"
                            inputClass="mainInput"
                          />
                          </div>
                        <label for="collection_country_code_1" class="d-inline-block flex-shrink-0 align-self-center ps-2 ps-lg-0 pe-lg-5">lb</label>
                      </div>
                    </div>
                  </div>
                  <div class="grid">
                    <div class="grid-item medium-width-12 text-center textt-lg-start">
                      <SiteButton type="submit" className="btn-primary" onClick={()=> navigate('/ship-my-parcel')}>
                        Get Quote
                      </SiteButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tes"><Link to="/ship-my-parcel" class="quick-quote__multiple-link">Need to book multiple shipments?</Link></div>
            </div>
          </div>
        </section>
      </section>
      

      {/* <section className="banner position-relative two_pices_bg">
      <Container>
        <Row>
          <Col xs={12} className="text-center">
            <div className="banner_text pt-5 pb-3">
              <p className="text-capitalize">
                struggling to find mentors in your life?
              </p>
              <h1 className="text-capitalize">
                We Help You Find The
                <span className="primary_color">
                  &nbsp;Right
                  <br />
                  Mentors That Help&nbsp;
                </span>
                You With Any
                <br />
                Struggle You’re Facing
              </h1>
            </div>
            {role.role === roles.mentor
            ? null 
            : role.role === roles.mentee ? (
              <>
                <SiteButton
                  onClick={() => navigate("/featured-ads")}
                  className="site-btn"
                >
                  Find Mentor
                </SiteButton>
              </>
            ) : (
              <>
                <SiteButton
                  onClick={() => navigate("/signup", { state: {tab: "Mentee"} })}
                  className="site-btn"
                >
                  Find Mentor
                </SiteButton>
                <SiteButton
                  onClick={() => navigate("/signup")}
                  className="ms-3 site-btn site_border_btn "
                >
                  Become a Mentor
                </SiteButton>
              </>
            )}
          </Col>
        </Row>
        <Row className="text-center mt-5 mantor_sec">
          <Col lg={4} className="position-relative mentor-col-one">
            <img
              src={womanOne}
              alt=""
              className="banner_mentors_one banner-mentors img-fluid"
            />
          </Col>
          <Col lg={4} className="position-relative mentor-col-two">
            <img
              src={womanTwo}
              alt=""
              className="banner_mentors_two banner-mentors img-fluid"
            />
          </Col>
          <Col lg={4} className="position-relative mentor-col-three">
            <img
              src={manOne}
              alt=""
              className="banner_mentors_three banner-mentors img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </section> */}

      <CustomModal
        show={showModal}
        close={() => setShowModal(false)}
        para="To View The Complete Detail Of The Mentor You 
        Will Need To Login Or Signup First"
        success={false}
        action={() => console.log("Yes button clicked!")}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
        showLoginSignUpButtons={showLoginButton || showSignUpButton}
      />
    </>
  );
};

export default Banner;
