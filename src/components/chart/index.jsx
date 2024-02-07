import React from "react";
import { CChart } from '@coreui/react-chartjs';
import { Row, Col } from "react-bootstrap";

const ChartCard = ({ title }) => (
  <div className="dashCard mb-5 py-5 m-h">
    <Row>
      <Col xs={12} className="d-sm-flex justify-content-between mb-3">
        <h3 className="mainTitle">{title}</h3>
        <select className="dropdown-graph">
          <option value="all">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <div className="graph-wrapper position-relative">
          <CChart
            type="bar"
            height="90"
            options={{
              scales: {
                y: {
                  suggestedMin: 0,
                  suggestedMax: 400,
                },
              },
            }}
            data={{
              labels: ["Jan", "Feb", "March", "April", "May", "August", "September", "October", "November", "December"],
              datasets: [
                {
                  label: "Earning",
                  backgroundColor: "#83E9FF",
                  borderColor: "#83E9FF",
                  borderWidth: 1,
                  data: [240, 350, 300, 200, 150, 250, 300, 350, 380, 280],
                },
                {
                  label: "Payment",
                  backgroundColor: "#000",
                  borderColor: "#000",
                  borderWidth: 1,
                  data: [350, 100, 230, 150, 200, 300, 150, 250, 200, 180],
                },
              ],
            }}
          />
          <p className="text-center text-color">Months</p>
          <p className="x-axis text-color">{title}</p>
        </div>
      </Col>
    </Row>
  </div>
);

export default ChartCard