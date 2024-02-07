import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Layout } from "@components/Layout/layout";
import {CustomInput} from "@components/CustomInput";
import SiteButton from "@components/Button/button";
import CustomTable from "@components/CustomTable";
import usePageTitle from "@hooks/usePageTitle";
import CustomModal from "@components/customModal";
import LoadingSpinner from "@components/loader";
import axios from "axios";
import { useFormik } from "formik";
import { chargesValidate } from "@components/validations";

const ChargesManagement = () => {
  usePageTitle("Charges Management");
  const chargesLogsHeader = [
    {
      key: "id",
      title: "S.no",
    },
    {
      key: "online_charges",
      title: "Online Session Charges",
    },
    {
      key: "onsite_charges",
      title: "Onsite Session Charges",
    },
    {
      key: "request_date",
      title: "Update On",
    },
  ];
  const [showModel, setShowModel] = useState(false);
  const [formData, setFormData] = useState({
    online_charges: "",
    onsite_charges: "",
    is_online_active: false,
    is_onsite_active: false
  });
  const [chargesManagement, setChargesManagement] = useState([]);
  const [filters, setFilters] = useState({from: "", to: ""});
  const [load, setLoad] = useState(true);
  const [load2, setLoad2] = useState(false);
  
  const loadCharges = async () => {
    setLoad(true);
    let url = '/charges';
    if(filters.from) url += `?from=${filters.from}`;
    if(filters.to)   url += `&to=${filters.to}`;
    
    let data = await axios.get(url)
      .then(response => {
        setChargesManagement(response.data.data);
        setLoad(false);
      })
      .catch(err => {
        console.error(err.response.data);
        setLoad(false);
      });
  }

  useEffect(() => {
    loadCharges();
  }, [filters]);

  const {
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit, 
    handleReset
  } = useFormik({
    initialValues: formData,
    validationSchema: chargesValidate,
    onSubmit: (values) => handleFormSubmit(values)
  });

  const handleFormSubmit = async (data) => {
    setLoad2(true);

    if(data.is_online_active === false && data.is_onsite_active === false){
      setLoad2(false);
      document.getElementById('response').innerHTML = 
        `<div className="text-danger ms-2">At least one field is required to update charges.</div>`;
    }
    else{ 
      if(data.is_online_active === false) data.online_charges = 0;
      if(data.is_onsite_active === false) data.onsite_charges = 0;
      document.getElementById('response').innerHTML = "";

      let response = await axios.post('/charges/update', data)
      .then(() => {
        setShowModel(true);
        loadCharges();
        handleReset();
        setLoad2(false);
      })
      .catch(err => {
        document.getElementById('response').innerHTML = 
        `<div className="text-danger ms-2">${err.response.data.message}</div>`;
        setLoad2(false);
      });
    }
  };


  return (
    <>
      <Layout>
        <section className="charges-management section_padding two_pices_bg">
          <Container>
            <Row>
              <Col xs={12}>
                <div className="form_layout">
                  <Row className="pt-5 ms-auto ps-4">
                    <Col xs={12}>
                      <div className="section_title">
                        <h3>Charges Management</h3>
                      </div>
                    </Col>
                  </Row>
                  <Form onSubmit={handleSubmit}>
                    <Row className="my-5 justify-content-center">
                      <Col xs={10} md={8}>
                      <div id="response"></div>
                        <Row className="justify-content-center">
                          <Col lg={6}>
                            <div className="text-end">
                              {errors.is_online_active && (
                                <small className="text-danger">{errors.is_online_active}</small>
                              )}
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  id="is_online_active"
                                  name="is_online_active"
                                  value={values.is_online_active}
                                  onChange={handleChange}
                                />
                                <span className="slider-btn round"></span>
                              </label>
                            </div>
                            <CustomInput
                              label="Hourly Online Session Charges"
                              labelClass="mainLabel"
                              type="number"
                              id="online_charges"
                              placeholder="$10"
                              inputClass="mainInput"
                              value={values.online_charges}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              errors={errors.online_charges}
                              touched={touched.online_charges}
                            />
                          </Col>
                          <Col lg={6}>
                            <div className="text-end">
                              {errors.is_onsite_active && (
                                <small className="text-danger">{errors.is_onsite_active}</small>
                              )}
                              <label className="switch">
                                <input
                                  type="checkbox"
                                  id="is_onsite_active"
                                  name="is_onsite_active"
                                  value={values.is_onsite_active}
                                  onChange={handleChange}
                                />
                                <span className="slider-btn round"></span>
                              </label>
                            </div>
                            <CustomInput
                              label="Hourly Onsite Session Charges"
                              labelClass="mainLabel"
                              type="number"
                              id="onsite_charges"
                              placeholder="$10"
                              inputClass="mainInput"
                              value={values.onsite_charges}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              errors={errors.onsite_charges}
                              touched={touched.onsite_charges}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <div className="text-center py-4">
                              <SiteButton
                                type="submit"
                                className="site-btn"
                                load={load2}
                              >
                                Update Charges
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
            <Row>
              <Col xs={12}>
                <div className="form_layout">
                  <Row className="pt-5 ms-auto ps-4">
                    <Col xs={12}>
                      <div className="section_title">
                        <h3>Charges Logs</h3>
                      </div>
                    </Col>
                  </Row>
                  <Row className="my-5 justify-content-center">
                    <Col xs={12} md={11}>
                      <CustomTable
                        headers={chargesLogsHeader}
                        
                        required
                        filterSort={false}
                        renderEntries={false}
                        dateFilter={true}
                        sortStatus={false}
                        renderSearchWrapper={false}
                        paginateRecords={false}
                        filters={filters}
                        setFilters={setFilters}
                      >
                        <tbody>
                          {load ? (
                            <tr>
                              <td colSpan="100%">
                                <LoadingSpinner />
                              </td>
                            </tr>
                          ) : (
                          chargesManagement.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>${item.online_charges}</td>
                              <td>${item.onsite_charges}</td>
                              <td>{item.updated_on}</td>
                            </tr>
                          )))}
                        </tbody>
                      </CustomTable>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
      
      <CustomModal
        show={showModel}
        close={() => setShowModel(false)}
        onClickOk={() => setShowModel(false)}
        success
        para="Charges Updated Successfully"
      />
    </>
  );
};

export default ChargesManagement;
