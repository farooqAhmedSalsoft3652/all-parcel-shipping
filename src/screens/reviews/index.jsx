
import usePageTitle from "@hooks/usePageTitle";
import { Layout } from "@components/Layout/layout";
import { Col, Container, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

import {userAvatar} from "@/assets/images";

import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Reviews = () => {

  usePageTitle("Reviews");
  return (
    <>
      <Layout>

      <section className="page-title text-center">
          <Container>
              <Row>
                <Col xs={12}>
                <h2 className="text-primary mb-0 fw-medium">Reviews</h2>
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
                    <Breadcrumb.Item active>Reviews</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col xs={12}>
                  <h2 className="text-primary mb-4 fw-medium">All Parcel Shipping Reviews</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                </Col>
                <Col lg={4} className="my-5">
                  <Card className='review-card border-0'>
                    <Card.Header className='bg-transparent px-4 px-lg-5 pt-4 pt-lg-5 border-0'>
                        <img className="roundedCircle user-img" src={userAvatar} alt="" />
                    </Card.Header>
                    <Card.Body className='position-relative px-4 px-lg-5'>
                    <Card.Text>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled..
                  </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-transparent px-4 px-lg-5 pt-4 pb-4 pb-lg-5 border-0 pt-0">
                    <div className="author ">
                        <h5 className="mb-2 fw-bold">Alex John</h5>
                        <h6 className="mb-0 fw-regular">Customer</h6>
                    </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col lg={4} className="my-5">
                  <Card className='review-card border-0'>
                    <Card.Header className='bg-transparent px-4 px-lg-5 pt-4 pt-lg-5 border-0'>
                        <img className="roundedCircle user-img" src={userAvatar} alt="" />
                    </Card.Header>
                    <Card.Body className='position-relative px-4 px-lg-5'>
                    <Card.Text>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled..
                  </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-transparent px-4 px-lg-5 pt-4 pb-4 pb-lg-5 border-0 pt-0">
                    <div className="author ">
                        <h5 className="mb-2 fw-bold">Alex John</h5>
                        <h6 className="mb-0 fw-regular">Customer</h6>
                    </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col lg={4} className="my-5">
                  <Card className='review-card border-0'>
                    <Card.Header className='bg-transparent px-4 px-lg-5 pt-4 pt-lg-5 border-0'>
                        <img className="roundedCircle user-img" src={userAvatar} alt="" />
                    </Card.Header>
                    <Card.Body className='position-relative px-4 px-lg-5'>
                    <Card.Text>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled..
                  </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-transparent px-4 px-lg-5 pt-4 pb-4 pb-lg-5 border-0 pt-0">
                    <div className="author ">
                        <h5 className="mb-2 fw-bold">Alex John</h5>
                        <h6 className="mb-0 fw-regular">Customer</h6>
                    </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col lg={4} className="my-5">
                  <Card className='review-card border-0'>
                    <Card.Header className='bg-transparent px-4 px-lg-5 pt-4 pt-lg-5 border-0'>
                        <img className="roundedCircle user-img" src={userAvatar} alt="" />
                    </Card.Header>
                    <Card.Body className='position-relative px-4 px-lg-5'>
                    <Card.Text>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled..
                  </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-transparent px-4 px-lg-5 pt-4 pb-4 pb-lg-5 border-0 pt-0">
                    <div className="author ">
                        <h5 className="mb-2 fw-bold">Alex John</h5>
                        <h6 className="mb-0 fw-regular">Customer</h6>
                    </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col lg={4} className="my-5">
                  <Card className='review-card border-0'>
                    <Card.Header className='bg-transparent px-4 px-lg-5 pt-4 pt-lg-5 border-0'>
                        <img className="roundedCircle user-img" src={userAvatar} alt="" />
                    </Card.Header>
                    <Card.Body className='position-relative px-4 px-lg-5'>
                    <Card.Text>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled..
                  </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-transparent px-4 px-lg-5 pt-4 pb-4 pb-lg-5 border-0 pt-0">
                    <div className="author ">
                        <h5 className="mb-2 fw-bold">Alex John</h5>
                        <h6 className="mb-0 fw-regular">Customer</h6>
                    </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col lg={4} className="my-5">
                  <Card className='review-card border-0'>
                    <Card.Header className='bg-transparent px-4 px-lg-5 pt-4 pt-lg-5 border-0'>
                        <img className="roundedCircle user-img" src={userAvatar} alt="" />
                    </Card.Header>
                    <Card.Body className='position-relative px-4 px-lg-5'>
                    <Card.Text>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled..
                  </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-transparent px-4 px-lg-5 pt-4 pb-4 pb-lg-5 border-0 pt-0">
                    <div className="author ">
                        <h5 className="mb-2 fw-bold">Alex John</h5>
                        <h6 className="mb-0 fw-regular">Customer</h6>
                    </div>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
}
export default Reviews;


