import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import AdCardContent from "../adCardContent";
import axios from "axios";

const AdCard = ({ leftData, rightData }) => {
  const [mentorSubs, setMentorSubs] = useState({});
  
  const loadSubscription = async () => {
    let subscription = await axios.get('/mentor/home')
      .then(response => {
        console.log(response.data);
        setMentorSubs(response.data.data);
      })
      .catch(err => console.error(err.response.data));
  }

  useEffect(() => {
    loadSubscription();
  }, []);

  return (
    <Row>
      <Col xs={12} md={6}>
        <div className="card-bg">
          <div className="cardTitle mb-3">
            <h4 className="text-black text-capitalize">Active Ad</h4>
          </div>
          <Row className="g-3">
            {mentorSubs.ads ? (
              <AdCardContent
                data={mentorSubs.ads}
              />
            ) : (
              <p className="text-center text-muted">Ad subscription expired/not purchased.</p>
            )}
          </Row>
        </div>
      </Col>
      <Col xs={12} md={6} className="mt-md-0 mt-3">
        <div className="card-bg">
          <div className="cardTitle mb-3">
            <h4 className="text-black text-capitalize">Active Featured Ad</h4>
          </div>
          <Row className="g-3">
            {mentorSubs.featured ? (
              <AdCardContent
                data={mentorSubs.featured}
              />
            ) : (
              <p className="text-center text-muted">Featured Ad subscription expired/not purchased.</p>
            )}
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default AdCard;
