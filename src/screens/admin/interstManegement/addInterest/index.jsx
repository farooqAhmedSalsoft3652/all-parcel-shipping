import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import { DashboardLayout } from "@/layout/dashboardLayout";
import BackButton from "@components/backButton";
import {CustomInput} from "@components/CustomInput";
import SiteButton from "@components/Button/button";
import usePageTitle from "@hooks/usePageTitle";
import CustomModal from "@components/customModal";
import axios from "axios";
import { useFormik } from "formik";
import { addInterestValidate } from "../../../../components/validations";

const AddInterest = () => {
  const navigate = useNavigate();
  usePageTitle("Add Interest");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({name: "", status: ""});
  const [load, setLoad] = useState(false);

  const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
    initialValues: formData,
    validationSchema: addInterestValidate,
    onSubmit: (values) => handleFormSubmit(values)
  });

  const handleFormSubmit = async (data) => {
    setLoad(true);

    let response = await axios.post('/interest-management/add', data)
      .then(() => {
        setShowModal(true);
        setLoad(false);
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad(false);
      });
  };

  const handleSuccess = () => {
    setShowModal(false);
    navigate("/admin/interests-management");
  }

  return (
    <>
      <DashboardLayout>
        <section>
          <Container fluid>
            <div className="dashCard py-3">
              <Row className="py-5 ps-5 ">
                <Col xs={12} xl={8}>
                  <Row>
                    <Col xs={12}>
                      <div>
                        <h3 className="text-capitalize">
                          <BackButton />
                          Add Interest
                        </h3>
                      </div>
                    </Col>
                  </Row>
                  <Form onSubmit={handleSubmit}>
                    <Row className="pt-5 pb-3">
                      <Col xs={12} md={6}>
                        <CustomInput
                          label="Interest Name"
                          labelClass="mainLabel bold"
                          type="text"
                          id="name"
                          placeholder="Enter Interest Name"
                          inputClass="mainInput"
                          required
                          value={values.name}
                          errors={errors.name}
                          touched={touched.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <label htmlFor="" className="mainLabel bold">
                          Status<span className="text-danger">*</span>
                        </label>
                        <select
                          className="mainInput"
                          id="status"
                          required
                          value={values.status}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">Select Status</option>
                          <option value="1">Active</option>
                          <option value="0">Inactive</option>
                        </select>
                        {errors.status && touched.status && (
                          <small className="text-danger ms-2">{errors.status}</small>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <SiteButton
                          className="site-btn"
                          type="submit"
                          load={load}
                        >
                          Create
                        </SiteButton>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </DashboardLayout>
      
      <CustomModal
        show={showModal}
        close={() => setShowModal(false)}
        para="Interest Added Successfully"
        onClickOk={handleSuccess}
        success
      />
    </>
  );
};

export default AddInterest;