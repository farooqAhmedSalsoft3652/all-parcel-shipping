import { Col, Container, Row } from "react-bootstrap";
import usePageTitle from "@hooks/usePageTitle";
import { DashboardLayout } from "@/layout/dashboardLayout";
import BackButton from "@components/backButton";
import SiteButton from "@components/Button/button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InterstManagementData } from "@config/data";

const DetailInterest = () => {

  const Navigate = useNavigate();

  const { id } = useParams();
 
  const [detailData, setDetailData] = useState("");

  usePageTitle("interst-detail");

  useEffect(() => {
    InterstManagementData.forEach((item) => {
      if (item.id == id) {
        setDetailData(item);
      }
    });
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
                          Interest Detail
                        </h3>
                      </div>
                    </Col>
                  </Row>
                  <Row className="py-3">
                    <Col xs={12} md={6}>
                      <div className="my-4">
                        <label className="xl-grey-color p-xs profile_label">
                          Interest Name
                        </label>
                        <p className="fw-bold mt-3 label-text">
                          {detailData.name}
                        </p>
                      </div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div className="my-4">
                        <label className="xl-grey-color p-xs profile_label">
                         Status
                        </label>
                        <p className="fw-bold mt-3 label-text">
                          {detailData.status ? "active" : "inactive"}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} className="p-0">
                      <SiteButton
                        onClick={() => Navigate(`/admin/interests-management/edit-interest/${detailData.id}`)}
                        className="site-btn"
                      >
                        Edit
                      </SiteButton>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </DashboardLayout>
    </>
  );
};

export default DetailInterest;
