import React from "react";
import { Row, Col } from "react-bootstrap";

const AdCardContent = (props) => {
  return (
    <>
      <Col xs={12} md={6}>
        <div className="inner-title inner-bg-1 text-center">
          <h5>{props.data.package_title}</h5>
          <p className="m-0 p-0">Ad Title</p>
        </div>
      </Col>
      <Col xs={12} md={6}>
        <div className="inner-title inner-bg-1 text-center">
          <h5>{props.data.subscription_date}</h5>
          <p className="m-0 p-0">Subscription Date</p>
        </div>
      </Col>
      <Col xs={12} md={6}>
        <div className="inner-title inner-bg-1 text-center">
          <h5>{props.data.no_of_request}</h5>
          <p className="m-0 p-0">Requests Received</p>
        </div>
      </Col>
      <Col xs={12} md={6}>
        <div className="inner-title inner-bg-1 text-center">
          <h5>{props.data.remaining_requests}</h5>
          <p className="m-0 p-0">Remaining Requests</p>
        </div>
      </Col>
    </>
  );
};

export default AdCardContent;
