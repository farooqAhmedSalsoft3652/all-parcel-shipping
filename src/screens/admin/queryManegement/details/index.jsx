import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { DashboardLayout } from "@/layout/dashboardLayout";
import LoadingSpinner from "@components/loader";
import usePageTitle from "@hooks/usePageTitle";
import BackButton from "@components/backButton";
import axios from "axios";
import {queryObjectData} from "@config/data";
import SiteButton from "@components/Button/button";

const QueryDetails = () => {
  usePageTitle("View Query");
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [load, setLoad] = useState(true);


  const loadQueryDetail = async () => {
    setLoad(true);
    let data = await axios.get(`/queries/${id}`)
    .then(response => {
      // setDetailData(response.data.data);
      //setDetailData(queryObjectData);
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

  useEffect(() => {
    const filteredData = queryObjectData.find((item) => id == item.id);
    // console.log(filteredData, id, "text");
    if (filteredData) {
      setDetailData(filteredData);
    }
  }, [queryObjectData, id]);


  return (
    <>
      <DashboardLayout>
        <Container fluid>
          <div className="dashCard ">
            <div className="bg-white rounded-10 shadow-sm p-5 p-lg-5 p-xxl-5">
              <div class="mainTitle mb-0 mb-4 mb-lg-5">
                <div className="d-flex align-items-center gap-2 ">
                  <BackButton />
                  <h2 className="text-black fw-medium">View Query</h2>
                </div>
              </div>
              <div className="detail-block">
                <Row>
                  <Col xs={12} lg={10} xl={8} xxl={7}>
                    {load ? (
                      <LoadingSpinner />
                    ) : (
                    <Row>
                      <Col xs={12} className="mt-4 mt-md-4 mt-xxl-5">
                        <h5 className="fw-medium mb-1 mb-md-2">Name:</h5>
                        <p className="">
                          {detailData.name}
                        </p>
                      </Col>
                      <Col xs={12} className="mt-4 mt-md-4 mt-xxl-5">
                        <h5 className="fw-medium mb-1 mb-md-2">Email:</h5>
                        <p className="">
                          {detailData.email}
                        </p>
                      </Col>
                      <Col xs={12} className="mt-4 mt-md-4 mt-xxl-5">
                        <h5 className="fw-medium mb-1 mb-md-2">User Type:</h5>
                        <p className="">
                          {detailData.userType}
                        </p>
                      </Col>
                      <Col xs={12} className="mt-4 mt-md-4 mt-xxl-5">
                        <h5 className="fw-medium mb-1 mb-md-2">Subject:</h5>
                        <p className="">
                          {detailData.subject}
                        </p>
                      </Col>
                      <Col xs={12} className="mt-4 mt-md-4 mt-xxl-5">
                        <h5 className="fw-medium mb-1 mb-md-2">Date:</h5>
                        <p className="">
                          {detailData.date}
                        </p>
                      </Col>
                      <Col xs={12} className="mt-4 mt-md-4 mt-xxl-5">
                        <h5 className="fw-medium mb-1 mb-md-2">Message:</h5>
                        <p className="">
                          {detailData.message}
                        </p>
                      </Col>
                      <Col xs={12} className="mt-4 mt-md-4 mt-xxl-5">
                      <label for="first_name" class="mainLabel bold ms-0 mt-0"> Your  Response<span class="text-danger">*</span></label>
                      <textarea name="reason" id="reason" rows="8" className='mainInput mt-0' placeholder='Write Here....' required />
                      <SiteButton
                        className="site-btn me-2 mt-5"
                        type="submit"
                        load={load}
                        >Send</SiteButton>
                      </Col>
                    </Row>
                    )}
                  </Col>
                </Row>
              </div>
            </div>
            
          </div>
        </Container>
      </DashboardLayout>
    </>
  );
};

export default QueryDetails;
