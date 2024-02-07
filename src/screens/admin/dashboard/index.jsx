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
    "Total Earning",
    "Mentees Registered",
    "Mentor Registered",
    "Requests Received",
  ];

  return (
    <DashboardLayout>
      <Container fluid>
        <div className="dashCard mb-4 py-5 m-h">
          <h3 className="mainTitle">Dashboard</h3>
          <Row>
            {statistics.map((item, index) => (
              <Col
                key={item.id}
                xxl={3}
                xl={6}
                md={6}
                className="statsCard-border"
              >
                <div className="dashboard-stats">
                  <StatsCard item={item} index={index} stats={stats} />
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <Row>
          {chartTitles.map((title, index) => (
            <Col key={index} xl={12}>
              <ChartCard key={index} title={title} />
            </Col>
          ))}
        </Row>
      </Container>
    </DashboardLayout>
  );
};
