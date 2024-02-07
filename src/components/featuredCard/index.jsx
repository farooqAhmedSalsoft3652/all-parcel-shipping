import { SERVER_URL } from "../../config/data";
import "./index.css";
import { Col, Row } from "react-bootstrap";
const FeaturedCard = (props) => {
  const { avatar, full_name, charges, interests } = props.data;

  return (
    <div className="featured_card">
      <div className="featured_card_img">
        <img className="ad_featured_img img-fluid" src={SERVER_URL + avatar} alt={true.toString()} />
      </div>
      <div className="featured_card_body pt-4 px-3">
        <div className="d-flex align-items-center gap-2 mb-3">
          <img className="ad_poster_img" src={SERVER_URL + avatar} alt={true.toString()} />
          <h4 className="ad_poster mb-0 p-md ">{full_name}</h4>
        </div>
        <Row>
          <Col lg={6}>
            <p className="mb-0 l-grey-color fw-bold text-dark">Online Session</p>
            <p className="d-grey-color ">${charges?.online_charges}</p>
          </Col>
          <Col lg={6}>
            <p className="mb-0 l-grey-color fw-bold text-dark">Onsite Session</p>
            <p className="d-grey-color ">${charges?.onsite_charges}</p>
          </Col>
          <Col lg={12}>
            <p className="mb-0 l-grey-color fw-bold text-dark">Area of Interest</p>
            <p className="d-grey-color">
              {(interests?.length > 0) ? interests.map((item, index) => (
                (index + 1 === interests.length) ? 
                <span key={index}>{item.interests}</span> : 
                <span key={index}>{item.interests}, </span>
              )) : <>none</>}
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FeaturedCard;
