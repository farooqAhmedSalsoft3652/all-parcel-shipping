import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { DashboardLayout } from "@/layout/dashboardLayout";
import LoadingSpinner from "@components/loader";
import usePageTitle from "@hooks/usePageTitle";
import BackButton from "@components/backButton";
import axios from "axios";

const QueriesDetail = () => {
  usePageTitle("Queries Detail");
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [load, setLoad] = useState(true);

  const loadQueryDetail = async () => {
    setLoad(true);
    let data = await axios.get(`/queries/${id}`)
    .then(response => {
      setDetailData(response.data.data);
      setLoad(false);
    })
    .catch(err => {
      console.error(err.response.data.message);
      setLoad(false);
    });
  }

  useEffect(() => {
    loadQueryDetail();
  }, [id]);

  return (
    <>
      <DashboardLayout>
        <Container fluid>
          <div className="dashCard ">
            <Row>
              <Col xs={12} md={11} className="m-auto">
                <Row className="pt-5">
                  <Col xs={12}>
                    <h3>
                      <BackButton />
                      Queries Detail
                    </h3>
                  </Col>
                </Row>
                <div className="ps-4 ms-1">
                  {load ? (
                    <LoadingSpinner />
                  ) : (
                  <Row>
                    <Col xs={12} md={10}>
                      <div className="my-4">
                        <label className="xl-grey-color p-xs">Name</label>
                        <p className="fw-bold mt-3 label-text">
                          {detailData.full_name}
                        </p>
                      </div>
                      <div className="my-4">
                        <label className="xl-grey-color p-xs">
                          Email Address
                        </label>
                        <p className="fw-bold mt-3 label-text">
                          {detailData.email}
                        </p>
                      </div>
                      <div className="my-4">
                        <label className="xl-grey-color p-xs">User Type</label>
                        <p className="fw-bold mt-3 label-text">
                          {detailData.user_type}
                        </p>
                      </div>
                      <div className="my-4">
                        <label className="xl-grey-color p-xs">Subject</label>
                        <p className="fw-bold mt-3 label-text">
                          {detailData.subject}
                        </p>
                      </div>
                      <div className="my-4">
                        <label className="xl-grey-color p-xs">
                          Message
                        </label>
                        <p className="fw-bold mt-3 label-text">
                          {detailData.message}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </DashboardLayout>
    </>
  );
};

export default QueriesDetail;
