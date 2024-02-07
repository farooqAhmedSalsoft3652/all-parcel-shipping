import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import { DashboardLayout } from "@/layout/dashboardLayout";
import usePageTitle from "@hooks/usePageTitle";
import {CustomInput} from "@components/CustomInput";
import CustomModal from "@components/customModal";
import SiteButton from "@components/Button/button";
import BackButton from "@components/backButton";
import LoadingSpinner from "@components/loader";
import axios from "axios";

const EditSubscription = () => {
  usePageTitle("Edit Subscription");
  const navigate = useNavigate();
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [detailData, setDetailData] = useState({});
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);

  const loadAdsDetail = async () => {
    setLoad2(true);
    let data = await axios.get(`/ad-management/${id}`)
      .then(response => {
        setDetailData(response.data.data);
        setLoad2(false);
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad2(false);
      })
  }

  useEffect(() => {
    loadAdsDetail();
  }, [id]);

  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData({...formData, [id]: value})
  }

  const handleClickUpdate = (e) => {
    e.preventDefault();
    setLoad(true);

    let data = axios.post(`/ad-management/${id}/update`, formData)
      .then(response => {
        setShowModal(true);
        setLoad(false);
        setFormData({});
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad(false);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/admin/ad-subscription");
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
                          Edit Subscription
                        </h3>
                      </div>
                    </Col>
                  </Row>
                  {load2 ? (
                    <LoadingSpinner />
                  ) : (
                  <Form onSubmit={handleClickUpdate}>
                    <Row className="pt-5 pb-3">
                      <Col xs={12} md={6}>
                        <CustomInput
                          label="Package Title"
                          labelClass="mainLabel bold"
                          type="text"
                          id="package_title"
                          placeholder="Enter Package Title"
                          inputClass="mainInput"
                          required
                          value={formData.package_title ?? detailData.package_title}
                          onChange={handleInput}
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <CustomInput
                          label="Amount"
                          labelClass="mainLabel bold"
                          type="text"
                          id="amount"
                          placeholder="Enter Amount"
                          inputClass="mainInput"
                          required
                          value={formData.amount ?? detailData.amount}
                          onChange={handleInput}
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <CustomInput
                          label="Number Of Requests"
                          labelClass="mainLabel bold"
                          type="number"
                          id="no_of_request"
                          placeholder="Enter Number Of Requests"
                          inputClass="mainInput"
                          required
                          value={formData.no_of_request ?? detailData.no_of_request}
                          onChange={handleInput}
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <CustomInput
                          label="Detail"
                          labelClass="mainLabel bold"
                          type="text"
                          id="details"
                          placeholder="Enter Package Details"
                          inputClass="mainInput"
                          required
                          value={formData.details ?? detailData.details}
                          onChange={handleInput}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <SiteButton
                          type="submit"
                          className="site-btn"
                          load={load}
                        >
                          Update
                        </SiteButton>
                      </Col>
                    </Row>
                  </Form>
                  )}
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </DashboardLayout>

      <CustomModal
        show={showModal}
        close={closeModal}
        onClickOk={closeModal}
        success
        para="Subscription Package Has Been Updated Successfully"
      />
    </>
  );
};

export default EditSubscription;