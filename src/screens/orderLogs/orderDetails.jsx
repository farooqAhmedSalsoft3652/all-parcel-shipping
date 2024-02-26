import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@components/Layout/layout";
import usePageTitle from "@hooks/usePageTitle";
import CustomTable from "@components/CustomTable";
import UseTableControls from "@config/useTableControls";
import LoadingSpinner from "@components/loader";
import BackButton from "@components/backButton";
import CustomModal from "@components/customModal";
import axios from "axios";

import { orderLogsData } from "@config/data";
import SiteButton from "../../components/Button/button";

const OrderDetails = () => {
  usePageTitle("Order Logs Details");
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [cancelPickup, setCancelPickup] = useState(false);
  const [reasonModal, setReasonModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  
  const [reportPickup, setReportPickup] = useState(false);
  const [reportReasonModal, setReportPickupReason] = useState(false);
  const [sendReportModal, setSendReportModal] = useState(false);

  const [reportBooking, setReportBooking] = useState(false);
  const [reportBookingReson, setReportBookingReson] = useState(false);
  const [sendReportBooking, setSendReportBooking] = useState(false);
  
  

  const showCancelPickup = (e) => {
    setCancelPickup(true);
  };
  const showReasonModal = (e) => {
    setCancelPickup(false);
    setReasonModal(true);
  };
  const showCancelModal = (e) => {
    setReasonModal(false)
    setCancelModal(true)
  };


  const showReportPickup = (e) => {
    setReportPickup(true)
  };
  const showReportResonModal = (e) => {
    setReportPickup(false)
    setReportPickupReason(true)
  };
  const showReportSendModal = (e) => {
    setReportPickupReason(false)
    setSendReportModal(true)
  };



  const showReportBooking = (e) => {
    setReportBooking(true)
  };
  const showReportBookingReson = (e) => {
    setReportBooking(false)
    setReportBookingReson(true)
  };
  const showSendBookingReson = (e) => {
    setReportBookingReson(false)
    setSendReportBooking(true)
  };


  useEffect(() => {
    const filteredData = orderLogsData.find((item) => id == item.id);
    console.log(filteredData, id, "text");
    if (filteredData) {
      setData(filteredData);
    }
  }, [orderLogsData, id]);

  return (
    <>
    <Layout>
      <section className="align-bottom page-content bg-white">
        <Container>
          <Row>
            <Col xs={12} className="title d-block d-md-flex justify-content-md-between">
              <h2 className="text-primary mb-2 fw-medium">
                <BackButton className="text-primary" /> Order Details
              </h2>
              
              <div class={`order-tag align-self-center ${data.status === "completed" ? 'completed' : data.status === "cancelled" ? 'cancelled' : data.status === "pending" ? 'pending' : ''}`}>
                {data.status === "completed" ? 'Completed' : data.status === "cancelled" ? 'Cancelled By User' : data.status === "pending" ? 'Pending' : ''}
              </div>
            </Col>
            <Col xs={12}>
              <div className="detail-block bg-paleblue position-relative p-4 p-lg-5  mt-4">
                <Row>
                  <Col xs={12} className="mb-3">
                    <h3>Order Details:</h3>
                  </Col>
                  <Col xs={12} md={6} lg={3} className="mt-4 mt-md-4 mt-xxl-5">
                    <h5 className="mb-1 mb-md-2">Tracking No</h5>
                    <p className="">{data.trackingNo}</p>
                  </Col>
                  <Col xs={12} md={6} lg={3} className="mt-4 mt-md-4 mt-xxl-5">
                    <h5 className="mb-1 mb-md-2">Order No</h5>
                    <p className="">{data.orderNo}</p>
                  </Col>
                  <Col xs={12} md={6} lg={3} className="mt-4 mt-md-4 mt-xxl-5">
                    <h5 className="mb-1 mb-md-2">Shipping Carrier</h5>
                    <p className="">{data.shippingCarrier}</p>
                  </Col>
                  <Col xs={12} md={6} lg={3} className="mt-4 mt-md-4 mt-xxl-5">
                    <h5 className="mb-1 mb-md-2">Total Price</h5>
                    <p className="">{data.totalPrice}</p>
                  </Col>
                  <Col xs={12} md={6} lg={3} className="mt-4 mt-md-4 mt-xxl-5">
                    <h5 className="mb-1 mb-md-2">No. of Parcels</h5>
                    <p className="">{data.noParcels}</p>
                  </Col>
                  <Col xs={12} md={6} lg={3} className="mt-4 mt-md-4 mt-xxl-5">
                    <h5 className="mb-1 mb-md-2">Pick Up Generated</h5>
                    <p className="">{data.pickUpGenerated}</p>
                  </Col>
                  <Col xs={12} md={6} lg={3} className="mt-4 mt-md-4 mt-xxl-5">
                    <h5 className="mb-1 mb-md-2">Estimated Delivery Date</h5>
                    <p className="">{data.estimatedDeliveryDate}</p>
                  </Col>
                  <Col xs={12} md={6} lg={3} className="mt-4 mt-md-4 mt-xxl-5">
                    <h5 className="mb-1 mb-md-2">Delivery Type</h5>
                    <p className="">{data.deliveryType}</p>
                  </Col>
                </Row>
              </div>

              {data.pickupDetails ? (
                  <div className="detail-block bg-light position-relative p-4 p-lg-5  mt-5">
                    <Row>
                      <Col xs={12} className="mb-3">
                        <h3>Pickup Details:</h3>
                      </Col>
                      <Col
                        xs={12}
                        md={6}
                        lg={3}
                        className="mt-4 mt-md-4 mt-xxl-5"
                      >
                        <h5 className="mb-1 mb-md-2">Your Contact No</h5>
                        <p className="">{data.pickupDetails.yourContactNo}</p>
                      </Col>
                      <Col
                        xs={12}
                        md={6}
                        lg={3}
                        className="mt-4 mt-md-4 mt-xxl-5"
                      >
                        <h5 className="mb-1 mb-md-2">Account No</h5>
                        <p className="">{data.pickupDetails.accountNo}</p>
                      </Col>
                      <Col
                        xs={12}
                        md={6}
                        lg={3}
                        className="mt-4 mt-md-4 mt-xxl-5"
                      >
                        <h5 className="mb-1 mb-md-2">Name</h5>
                        <p className="">{data.pickupDetails.name}</p>
                      </Col>
                      <Col
                        xs={12}
                        md={6}
                        lg={3}
                        className="mt-4 mt-md-4 mt-xxl-5"
                      >
                        <h5 className="mb-1 mb-md-2">Address Line 1</h5>
                        <p className="">{data.pickupDetails.addressLine1}</p>
                      </Col>
                      <Col
                        xs={12}
                        md={6}
                        lg={3}
                        className="mt-4 mt-md-4 mt-xxl-5"
                      >
                        <h5 className="mb-1 mb-md-2">Address Line 2</h5>
                        <p className="">{data.pickupDetails.addressLine2}</p>
                      </Col>
                      <Col
                        xs={12}
                        md={6}
                        lg={3}
                        className="mt-4 mt-md-4 mt-xxl-5"
                      >
                        <h5 className="mb-1 mb-md-2">City</h5>
                        <p className="">{data.pickupDetails.city}</p>
                      </Col>
                      <Col
                        xs={12}
                        md={6}
                        lg={3}
                        className="mt-4 mt-md-4 mt-xxl-5"
                      >
                        <h5 className="mb-1 mb-md-2">State</h5>
                        <p className="">{data.pickupDetails.state}</p>
                      </Col>
                      <Col
                        xs={12}
                        md={6}
                        lg={3}
                        className="mt-4 mt-md-4 mt-xxl-5"
                      >
                        <h5 className="mb-1 mb-md-2">Zip Code</h5>
                        <p className="">{data.pickupDetails.zipCode}</p>
                      </Col>
                      <Col
                        xs={12}
                        md={6}
                        lg={3}
                        className="mt-4 mt-md-4 mt-xxl-5"
                      >
                        <h5 className="mb-1 mb-md-2">Earliest Pickup Time</h5>
                        <p className="">{data.pickupDetails.earliestPickupTime}</p>
                      </Col>
                      <Col
                        xs={12}
                        md={6}
                        lg={3}
                        className="mt-4 mt-md-4 mt-xxl-5"
                      >
                        <h5 className="mb-1 mb-md-2">Latest Pickup Time</h5>
                        <p className="">{data.pickupDetails.latestPickupTime}</p>
                      </Col>
                      <Col xs={12} className="mt-4 mt-md-4 mt-xxl-5">
                        <h5 className="mb-1 mb-md-2">Special Instructions</h5>
                        <p className="">{data.pickupDetails.specialInstructions}</p>
                      </Col>
                    </Row>
                  </div>
                ) : "" }
              {data.dropoffDetails ? (
                <div className="detail-block bg-light position-relative p-4 p-lg-5  mt-5">
                  <Row>
                    <Col xs={12} className="mb-3">
                      <h3>Dropoff Details:</h3>
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      lg={3}
                      className="mt-4 mt-md-4 mt-xxl-5"
                    >
                      <h5 className="mb-1 mb-md-2">Contact No. of Receiver</h5>
                      <p className="">{data.dropoffDetails.contactNoReceiver}</p>
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      lg={3}
                      className="mt-4 mt-md-4 mt-xxl-5"
                    >
                      <h5 className="mb-1 mb-md-2">Country</h5>
                      <p className="">{data.dropoffDetails.country}</p>
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      lg={3}
                      className="mt-4 mt-md-4 mt-xxl-5"
                    >
                      <h5 className="mb-1 mb-md-2">Name</h5>
                      <p className="">{data.dropoffDetails.name}</p>
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      lg={3}
                      className="mt-4 mt-md-4 mt-xxl-5"
                    >
                      <h5 className="mb-1 mb-md-2">Address Line 1</h5>
                      <p className="">{data.dropoffDetails.addressLine1addressLine1}</p>
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      lg={3}
                      className="mt-4 mt-md-4 mt-xxl-5"
                    >
                      <h5 className="mb-1 mb-md-2">Address Line 2</h5>
                      <p className="">{data.dropoffDetails.addressLine2}</p>
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      lg={3}
                      className="mt-4 mt-md-4 mt-xxl-5"
                    >
                      <h5 className="mb-1 mb-md-2">City</h5>
                      <p className="">{data.dropoffDetails.city}</p>
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      lg={3}
                      className="mt-4 mt-md-4 mt-xxl-5"
                    >
                      <h5 className="mb-1 mb-md-2">State</h5>
                      <p className="">{data.dropoffDetails.state}</p>
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      lg={3}
                      className="mt-4 mt-md-4 mt-xxl-5"
                    >
                      <h5 className="mb-1 mb-md-2">Zip Code</h5>
                      <p className="">{data.dropoffDetails.zipCode}</p>
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      lg={3}
                      className="mt-4 mt-md-4 mt-xxl-5"
                    >
                      {data.status === "cancelled" ? (
                        <>
                          <h5 className="mb-1 mb-md-2">Estimated Delivery Time</h5>
                          <p className="">{data.dropoffDetails.estimatedDeliveryTime}</p>
                        </>
                      ) : (
                        <>
                        <h5 className="mb-1 mb-md-2">Delivered On</h5>
                        <p className="">{data.dropoffDetails.estimatedDeliveryTime}</p>
                        </>
                      )}
                      
                    </Col>
                    <Col xs={12} className="mt-4 mt-md-4 mt-xxl-5">
                      <h5 className="mb-1 mb-md-2">Special Instructions</h5>
                      <p className="">{data.dropoffDetails.specialInstructions}</p>
                    </Col>
                    <Col xs={12}></Col>
                  </Row>
                  {data.status === "pending" ? (
                    <Row>
                      <Col xs={12} className="mt-4 mt-lg-5">
                        <SiteButton onClick={showCancelPickup} type="button" className="site-btn me-3">Cancel Pickup?</SiteButton>
                        <SiteButton onClick={showReportPickup} type="button" className="site-btn site_border_btn">Report Pickup?</SiteButton>
                      </Col>
                    </Row>
                  ):""}
                   {/* {data.status === "completed" ? (
                    <Row>
                      <Col xs={12} className="mt-4 mt-lg-5">
                        <SiteButton onClick={showReportBooking} type="button" className="site-btn me-3">Report Booking?</SiteButton>
                      </Col>
                    </Row>
                   ): "" } */}

                   {data.status === "cancelled" ? (
                    <>
                    
                     <Row>
                      <Col xs={12} className="mt-4 mt-md-4 mt-xxl-5">
                        <h5 className="mb-1 mb-md-2">Cancellation Reason</h5>
                        <p className="">{data.pickupDetails.specialInstructions}</p>
                      </Col>
                     </Row>

                    <Row>
                      <Col xs={12} className="mt-4 mt-lg-5">
                        <SiteButton onClick={showReportBooking} type="button" className="site-btn me-3">Report Booking?</SiteButton>
                        {/* <SiteButton onClick={showReportBooking} type="button" className="site-btn me-3">Cancellation Reason</SiteButton> */}
                      </Col>
                    </Row>
                    </>
                   ): "" }

                </div>
              ) : (
                ""
              )}
              {data.status === "completed" && (
              <div className="detail-block bg-light position-relative p-4 p-lg-5  mt-5">
                  <Row>
                    <Col xs={12} className="mb-3">
                      <h3 className="mb-2">Reported Reason</h3>
                      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa vitae neque laborum porro, similique obcaecati minus ex quibusdam odio minima, nam atque quas? Ullam odit voluptas vitae incidunt, dolor dolorum!</p>
                    </Col>
                </Row>
              </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
{/* Cancle PickUP Modal Start*/}
      <CustomModal
        show={cancelPickup}
        close={() => setCancelPickup(false)}
        para="Are You Sure You Want to Cancel Pickup?"
        heading="System Message"
        action={showReasonModal}
        showYesNoButtons={true}
      />
      <CustomModal
        show={reasonModal}
        close={() => setReasonModal(false)}
        showYesNoButtons={false}
        showRejectionReason={true}
        handleReason={showCancelModal}
      />
      <CustomModal
        show={cancelModal}
        close={() => setCancelModal(false)}
        heading="System Message"
        para="Your Pickup has been Cancelled!"
        success={true}
        onClickOk={() => setCancelModal(false)}
      />
  {/* Cancle PickUP Modal End*/}

  {/* Report PickUP Modal Start */}
    <CustomModal
        show={reportPickup}
        close={() => setReportPickup(false)}
        para="Are You Sure You Want to Report Pickup?"
        heading="System Message"
        action={showReportResonModal}
        showYesNoButtons={true}
      />
    <CustomModal
        show={reportReasonModal}
        close={() => setReportPickupReason(false)}
        showYesNoButtons={false}
        showRejectionReason={true}
        handleReason={showReportSendModal}
      />
      <CustomModal
        show={sendReportModal}
        close={() => setSendReportModal(false)}
        heading="System Message"
        para="Your Report has been Submitted!"
        success={true}
        onClickOk={() => setSendReportModal(false)}
      />
    {/* Report PickUP Modal End */}

  {/* Report Booking Modal Start */}
  <CustomModal
        show={reportBooking}
        close={() => setReportBooking(false)}
        para="Are You Sure You Want to Report Booking?"
        heading="System Message"
        action={showReportBookingReson}
        showYesNoButtons={true}
      />
    <CustomModal
        show={reportBookingReson}
        close={() => setReportBookingReson(false)}
        showYesNoButtons={false}
        showRejectionReason={true}
        handleReason={showSendBookingReson}
      />
      <CustomModal
        show={sendReportBooking}
        close={() => setSendReportBooking(false)}
        heading="System Message"
        para="Your Report has been Submitted!"
        success={true}
        onClickOk={() => setSendReportBooking(false)}
      />
    {/* Report Booking Modal End */}

  </>
  );
};

export default OrderDetails;
