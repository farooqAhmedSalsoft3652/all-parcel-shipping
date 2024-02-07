import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "@/layout/dashboardLayout";
import BackButton from "@components/backButton";
import SiteButton from "@components/Button/button";
import usePageTitle from "@hooks/usePageTitle";
import LoadingSpinner from "@components/loader";
import axios from "axios";

const SubscriptionDetail = () => {
  usePageTitle("Subscription Detail");
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [load, setLoad] = useState(true);

  const loadAdsDetail = async () => {
    setLoad(true);
    let data = await axios.get(`/ad-management/${id}`)
      .then(response => {
        setDetailData(response.data.data);
        setLoad(false);
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad(false);
      })
  }

  useEffect(() => {
    loadAdsDetail();
  }, [id]);

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
                          Subscription Detail
                        </h3>
                      </div>
                    </Col>
                  </Row>
                  {load ? (
                    <LoadingSpinner />
                  ) : (
                  <>
                    <Row className="py-3">
                      <Col xs={12}>
                        <div className="my-4">
                          <label className="xl-grey-color p-xs profile_label">
                            Package Title
                          </label>
                          <p className="fw-bold mt-3 label-text">
                            {detailData.package_title}
                          </p>
                        </div>
                        <div className="my-4">
                          <label className="xl-grey-color p-xs profile_label">
                            Amount
                          </label>
                          <p className="fw-bold mt-3 label-text">
                            ${detailData.amount}
                          </p>
                        </div>
                        <div className="my-4">
                          <label className="xl-grey-color p-xs profile_label">
                            Number of Requests
                          </label>
                          <p className="fw-bold mt-3 label-text">
                            {detailData.no_of_request}
                          </p>
                        </div>
                        <div className="my-4">
                          <label className="xl-grey-color p-xs profile_label">
                            Details
                          </label>
                          <p className="fw-bold mt-3 label-text">
                            {detailData.details}
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} className="p-0">
                        <SiteButton
                          onClick={() => navigate(`/admin/ad-subscription/edit-subscription/${detailData.id}`)}
                          className="site-btn"
                        >
                          Edit
                        </SiteButton>
                      </Col>
                    </Row>
                  </>
                  )}
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </DashboardLayout>
    </>
  );
};

export default SubscriptionDetail;
