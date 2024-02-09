import "./index.css";
import { Container, Row, Col } from "react-bootstrap";
import {featuresCardData} from "@config/data";
import { Link, useNavigate } from "react-router-dom";
import SiteButton from "@components/Button/button";
import { coin1, coin2, coin3 } from "../../../assets/images";
import { useEffect, useState } from "react";

const Featured = (props) => {
  const navigate = useNavigate()
  const [data, setData]= useState([])
  useEffect(()=>{
    setData(featuresCardData)
  }, [])

  return (
    <>
      <div className="quick-quote__highlight"></div>
      <div
        dusk="usp"
        className="usp-insert usp-insert--home pad-top-4 pad-bottom-4 js-animate-in-view"
        id="usp"
      >
        <Container>
          <Row>
            <Col xs={12}>
              <h2 className="usp-insert__title">Lorem ipsum dolor sit amet</h2>
              <ul>
                {data.map((data, index) => (
                  <li key={index}>
                  <span>
                    <span className="label-tag label-tag--dark">{data.tag}</span> {data.text}
                  </span>
                </li>
                ))}
              </ul>
              <div className="medium-width-6 h-center t-center push-top-2">
                <SiteButton type="button" className="btn btn--quarternary" onClick={() => navigate("/")}>Try our shipping calculator</SiteButton>
              </div>
              <p className="usp-insert__disclaimer t-small push-top-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
                totam amet aliquid quas veniam atque temporibus magnam
              </p>
              <img className="coin coin-1" src={coin1} alt={true.toString()} />
              <img className="coin coin-2" src={coin2} alt={true.toString()} />
              <img className="coin coin-3" src={coin3} alt={true.toString()} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Featured;
