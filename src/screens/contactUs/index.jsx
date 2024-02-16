import "./index.css";
import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Layout } from "@components/Layout/layout";
import { contactValidations } from "@components/validations";
import SiteButton from "@components/Button/button";
import CustomModal from "@components/customModal";
import {CustomInput} from "@components/CustomInput";
import usePageTitle from "@hooks/usePageTitle";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  usePageTitle("Contact-Us");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [load, setLoad] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    subject: "",
    message: ""
  });

  const { 
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit 
  } = useFormik({
    initialValues: formData,
    validationSchema: contactValidations,
    onSubmit: (values) => handleSubmitForm(values)
  });

  const handleSubmitForm = async (data) => {
    setLoad(true);
    
    let response = await axios.post('/contact-us', data)
      .then(() => {
        setShowModal(true);
        setLoad(false);
      })
      .catch(err => {
        console.error(err.response.data);
        setLoad(false);
      });
  };

  const contactSuccess = () => {
    setShowModal(false);
    navigate('/');
  }


  return (
    <>
      <Layout>
        <main className="align-bottom page-content bg-white">
          <Container>
            <Row>
              <Col xs={12} className="title">
                <h2 className="text-primary mb-2 fw-medium">Contact Admin</h2>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="mt-5">
                <div className="bg-light p-4 p-xl-5 card-form">
                  <Row>
                    <Col xxl={11} className="mt-0">
                      <Form onSubmit={handleSubmit} id="contact-form">
                        <Row className="pt-4">
                          <Col md={6} className="mb-4">
                            <CustomInput
                              label="Full Name"
                              type="text"
                              id="full_name"
                              required
                              placeholder="Enter Full Name"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              value={values.full_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              errors={errors.full_name}
                              touched={touched.full_name}
                            />
                          </Col>
                          <Col md={6} className="mb-4">
                            <CustomInput
                              label="Email Address"
                              type="email"
                              id="email"
                              required
                              placeholder="Enter Email Address"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              errors={errors.email}
                              touched={touched.email}
                            />
                          </Col>
                          <Col md={6} className="mb-4">
                            <CustomInput
                              label="Subject"
                              type="text"
                              id="subject"
                              required
                              placeholder="Enter Subject"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              value={values.subject}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              errors={errors.subject}
                              touched={touched.subject}
                            />
                          </Col>
                          <Col xs={12} className="mb-4">
                            <CustomInput
                              label="Message"
                              type="textarea"
                              id="message"
                              rows="10"
                              placeholder="Write Here"
                              labelClass="mainLabel bold"
                              inputClass="mainInput"
                              value={values.message}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                            {errors?.message && touched?.message ? (
                              <small className="text-danger ms-2">
                                {errors?.message}
                              </small>
                            ) : null}
                          </Col>
                          <Col xs={12} className="mt-4">
                            <SiteButton
                              type="submit"
                              className="site-btn width-220"
                              load={load}
                            >
                              Submit
                            </SiteButton>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </main>
      </Layout>

      <CustomModal
        show={showModal}
        close={contactSuccess}
        onClickOk={contactSuccess}
        heading="System Message"
        para="Your Message has been Submitted!"
        success
      />
    </>
  );
};

export default ContactUs;
