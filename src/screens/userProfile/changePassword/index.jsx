import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Col, Container, Form, Row } from "react-bootstrap"
import { useFormik } from "formik"
import { Layout } from "@components/Layout/layout"
import { changePasswordValidate } from "@components/validations"
import BackButton from "@components/backButton"
import {CustomInput} from "@components/CustomInput"
import SiteButton from "@components/Button/button"
import CustomModal from "@components/customModal"
import usePageTitle from "@hooks/usePageTitle"
import axios from "axios"

const PasswordChange = () => {
  usePageTitle("Change Password");
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: ""
  });
  const [load, setLoad] = useState(false);

  // const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
  //   initialValues: formData,
  //   validationSchema: changePasswordValidate,
  //   onSubmit: (value) => handleFormSubmit(value)
  // });

  // const handleFormSubmit = async (data) => {
  //   setLoad(true);

  //   let response = await axios.post('/change-password', data)
  //     .then(() => {
  //       setShowModal(true);
  //       setLoad(false);
  //     })
  //     .catch(err => {
  //       document.getElementById('response').innerHTML = 
  //       `<div className="alert alert-danger" role="alert"><strong>Ops!</strong> ${err.response.data.message}</div>`;
  //       setLoad(false);
  //     });
  // }

  const passwordUpdate = () => {
    navigate(-1);
  }

  const handleSubmit = ((event)=>{
    event.preventDefault();
    setShowModal(true)
  })


  return (
    <>
    <Layout>
    <main className="align-bottom page-content bg-white">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="title">
                <h2 className="text-primary mb-2 fw-medium"><BackButton className="text-primary" /> Change Password</h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12} className="mt-5">
              <div className="bg-light p-4 p-xl-5 detail-block">
                <Form onSubmit={handleSubmit}>
                  <div id="response"></div>
                  <Row>
                    <Col lg={11}>
                      <Row>
                        <Col xs={12} md={6} lg={6} className="mt-4 mt-md-4 mt-xxl-5">
                          <CustomInput 
                            label="Current Password" 
                            labelClass="mainLabel" 
                            type="password" 
                            id="old_password"
                            placeholder="Enter Current Password" 
                            inputClass="mainInput" 
                            required
                            // value={values.old_password}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            // errors={errors.old_password}
                            // touched={touched.old_password}
                          />
                        </Col>
                        <Col xs={12} md={6} lg={6} className="mt-4 mt-md-4 mt-xxl-5">
                          <CustomInput 
                            label="New Password" 
                            labelClass="mainLabel" 
                            type="password" 
                            id="new_password"
                            placeholder="Enter New Password" 
                            inputClass="mainInput" 
                            required 
                            // value={values.new_password}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            // errors={errors.new_password}
                            // touched={touched.new_password}
                          />
                        </Col>
                        <Col xs={12} md={6} lg={6} className="mt-4 mt-md-4 mt-xxl-5">
                          <CustomInput 
                            label="Confirm Password" 
                            labelClass="mainLabel" 
                            type="password" 
                            id="confirm_password"
                            placeholder="Confirm New Password" 
                            inputClass="mainInput" 
                            required 
                            // value={values.confirm_password}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            // errors={errors.confirm_password}
                            // touched={touched.confirm_password}
                          />
                        </Col>
                        <Col xs={12} className="mt-4 mt-md-4 mt-xxl-5">
                          <div className="py-4">
                            <SiteButton className="site-btn" type="submit" load={load}>
                              Update
                            </SiteButton>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
    </main>
    </Layout>

    <CustomModal
        show={showModal}
        close={() => setShowModal(false)}
        heading="System Message"
        para="Password updated successfully"
        success={true}
        buttonText="Okay"
        onClickOk={() => setShowModal(false)}
      />
    </>
  )
}

export default PasswordChange