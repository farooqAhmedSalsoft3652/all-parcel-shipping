import "./index.css";
import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { DashboardLayout } from "@/layout/dashboardLayout";
import { stats } from "@config/data";
import StatsCard from "@components/statsCard";
import ChartCard from "@components/chart";
import usePageTitle from "@hooks/usePageTitle";
import axios from "axios";

export const Dashboard = () => {
  usePageTitle("Admin Dashboard")
  const [statistics, setStatistics] = useState([]);

  const loadStats = async () => {
    let data = await axios.get('/dashboard')
      .then(response => setStatistics(response.data.data))
      .catch(err => console.error(err.response.data.message));
  }
  
  useEffect(() => {     
    loadStats();
  }, []);
 
  const chartTitles = [
    "User Analytics"
  ];

  return (
    <DashboardLayout>
      <Container fluid>
        <div className="dashCard mb-4 py-0 m-h">
          <div class="mainTitle mb-0">
            <div class="row">
              <div class="col-12 col-sm-12 mb-4">
                <h2 class="text-black fw-medium">Dashboard</h2>
              </div>
            </div>
          </div>
          <Row>
            {statistics.slice(0, 2).map((item, index) => (
              <Col
                key={item.id}
                md={6}
                className="statsCard-border"
              >
                <div className="dashboard-stats rounded-10 shadow-sm">
                  <StatsCard item={item} index={index} stats={stats} />
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <div className="dashCard mb-5  m-h">
          <div className="bg-white rounded-10 shadow-sm p-5">

          {chartTitles.map((title, index) => (
            <Col key={index} xl={12} className="px-3">
              <ChartCard key={index} title={title} />
            </Col>
          ))}
          </div>
        </div>
      </Container>
    </DashboardLayout>
  );
};
