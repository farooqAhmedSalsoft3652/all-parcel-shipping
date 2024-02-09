import usePageTitle from "@hooks/usePageTitle";
import { Layout } from "@components/Layout/layout";
import { Col, Container, Row } from "react-bootstrap";

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom";

const retailerReturns = () => {

  usePageTitle("Retailer Returns");
  return (
    <>
      <Layout>

      <section className="page-title text-center">
          <Container>
              <Row>
                <Col xs={12}>
                <h2 className="text-primary mb-0 fw-medium">Retailer Returns</h2>
                </Col>
              </Row>
          </Container>
        </section>
        <section className="align-bottom content-section bg-white">
          <Container>
              <Row>
                <Col xs={12} className="mb-5">
                  <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Retailer Returns</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col xs={12}>
                  <h2 className="text-primary mb-4 fw-medium">Retailer Returns</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Col>
                <Col xs={12} className="mt-5">
                <ul className="order-list p-0 m-0">
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/amazon-returns">Amazon Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/asos-returns">ASOS Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/best-buy-returns">Best Buy Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/bloomingdales-returns">Bloomingdales Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/forever-21-returns">Forever 21 Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/gap-returns">Gap Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/home-depot-returns">Home Depot Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/ikea-returns">IKEA Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/kohls-returns">Kohls Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/ll-bean-returns">LL Bean Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/lulus-returns">Lulus Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/macys-returns">Macys Returns Policy</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/neiman-marcus-returns">Neiman Marcus Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/nordstrom-returns">Nordstrom Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/old-navy-returns">Old Navy Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/patagonia-returns">Patagonia Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/sephora-returns">Sephora Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/target-returns">Target Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/venus-returns">Venus Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/walmart-returns">Walmart Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/wayfair-returns">Wayfair Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/zappos-returns">Zappos Returns</Link></li>
                  <li><Link href="https://www.parcelmonkey.com/retailer-returns/zara-returns">Zara Returns</Link></li>
                </ul>
                </Col>
              </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
}
export default retailerReturns;


