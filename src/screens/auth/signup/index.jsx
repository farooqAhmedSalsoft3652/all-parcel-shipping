import "./index.css";
import "react-phone-number-input/style.css";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Layout } from "@components/Layout/layout";
import SiteButton from "@components/Button/button";
import CustomModal from "@components/customModal";
import {CustomInput} from "@components/CustomInput";
import usePageTitle from "@hooks/usePageTitle";



import { AuthImg, loginImg,  logo } from "../../../assets/images";

const SignUp = () => {
  usePageTitle("Sign Up");
  const navigate = useNavigate();
  const { state } = useLocation();

  const [signupModal, setSignupModal] = useState(false);

  const [value, setValue] = useState();

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [load1, setLoad1] = useState(false);
  const [load2, setLoad2] = useState(false);

  

  // const [education, setEducation] = useState([educationFields]);
  // const [workExperience, setWorkExperience] = useState([workExperienceFields]);
  // const [certification, setCertification] = useState([certificationFields]);


  const handleClick = () => {
    // setShowModal(false);
    // setShowModal2(false);
    navigate("/login");
  };

  const loadInterest = async () => {
    const options = [];
    let response = await axios.get('/get-interests')
      .then(res => {
        res.data.data.map(item => {
          options.push({
            value: item.name,
            label: item.name
          });
        });
        // console.log(res.data);
        setInterests(options);
      })
      .catch(err => console.error(err.response.data));
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(() => ({ ...formData, [id]: value }));
  };

  const handleMultipleSelect = (value) => {
    setFormData(() => ({ ...formData, interests: value }));
    // console.log(`Selected: ${value}`);
  };

  const handleBaseImage = (e) => {
    let profile = e.target.files[0];
    setFormData(() => ({ ...formData, profile }));
  }

  const handleDetailFields = (event, itemId, setData) => {
    const { name, value, files } = event.target;
    setData((prevState) => {
      return prevState.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            [name]: files !== null ? files[0] : value
          };
        }
        return item;
      });
    });
  };

  useEffect(() => {
    loadInterest();
  }, []);

  const handleMentorSignup = async (e) => {
    setSignupModal(true)
    console.log("test");
    e.preventDefault();
    setLoad2(true);

    if (value) formData.phone_number = value;

    let response = await axios.post('/signup/mentor', formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        setLoad2(false);
        // setSignupModal(true);
        setFormData({});
        // setEducation([educationFields]);
        // setWorkExperience([workExperienceFields]);
        // setCertification([certificationFields]);
        setFormErrors({});
      })
      .catch(err => {
        setLoad2(false);
        setFormErrors(err.response.data.data);
      });
  }

  const addRow = (setData, data, fields) => {
    setData([...data,
    {
      ...fields,
      id: data.length + 1,
    }
    ]);
  }

  const deleteRow = (setData, data) => {
    const filteredRows = data.filter((row, index) => index !== data.length - 1);
    setData(filteredRows);
  }

  return (
    <>
      <Layout showFooter={false}>
        <section className="align-bottom page-content bg-white position-relative">
          <Container>
            <Row className="g-0 authBox">
              <Col lg={6}>
                <div className="authFormWrapper">
                  <div className="authForm signup">
                    <div className="authLogo pb-3">
                      <img src={logo} alt="authLogo" />
                    </div>
                    <div className="authFormHeader">
                      <h1 className="p-xxl text-black">Signup</h1>
                    </div>

                    <Form onSubmit={handleMentorSignup}>
                      <Row className="pt-4">
                        <Col xs={12} className="mb-4">
                          <CustomInput
                            label="Name"
                            type="text"
                            id="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter Name"
                            labelClass="mainLabel bold"
                            inputClass="mainInput"
                            inputError={formErrors.first_name}
                          />
                        </Col>
                        <Col xs={12} className="mb-4">
                          <label className="mainLabel bold">
                            Contact Number
                            <span className="text-danger">*</span>
                          </label>
                          <PhoneInput
                            placeholder="Enter Contact Number"
                            value={value}
                            onChange={setValue}
                            className="mainInput"
                            defaultCountry="US"
                            // focusInputOnCountrySelection="false"
                          />
                          {formErrors.phone_number ? (
                            <small className="text-danger ms-2">
                              {formErrors.phone_number[0]}
                            </small>
                          ) : null}
                        </Col>

                        <Col xs={12} className="mb-4">
                          <CustomInput
                            label="Email Address"
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter Email Address"
                            labelClass="mainLabel bold"
                            inputClass="mainInput"
                            inputError={formErrors.email}
                          />
                        </Col>
                        <Col xs={12} className="mb-4">
                          <CustomInput
                            label="New Password"
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter New Password"
                            labelClass="mainLabel bold"
                            inputClass="mainInput"
                            inputError={formErrors.password}
                          />
                        </Col>
                        <Col xs={12} className="mb-4">
                          <CustomInput
                            label="Enter Confirm Password"
                            type="password"
                            id="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleInputChange}
                            required
                            placeholder="Confirm Password"
                            labelClass="mainLabel bold"
                            inputClass="mainInput"
                            inputError={formErrors.confirm_password}
                          />
                        </Col>
                        <Col xs={12} className="mb-4">
                          <SiteButton
                            type="submit"
                            className="site-btn w-100"
                            // onClick={handleNext}
                          >
                            Signup
                          </SiteButton>
                        </Col>
                        <Col xs={12} className="text-center">
                          <div className="mt-2">
                            <p className="fw-regular already-acount">
                              Have an account already?
                              <span className="ms-2 fw-bold">
                                <Link
                                  className="text-decoration-none"
                                  to="/Login"
                                >
                                  Login
                                </Link>
                              </span>
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </div>
              </Col>
              <Col xs={6} className="authImage position-relative">
                <img src={loginImg} alt="authImage"/>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>

      <CustomModal
        show={signupModal}
        close={() => setSignupModal(false)}
        onClickOk={handleClick}
        heading="System Message"
        para="Check your email to verify your account!"
        buttonText="Okay"
        success
      />
      {/* <CustomModal
        show={signupModal}
        close={() => setSignupModal(false)}
        onClickOk={handleClick}
        para="Profile Created Successfully"
        success
      /> */}
    </>
  );
};

export default SignUp;
