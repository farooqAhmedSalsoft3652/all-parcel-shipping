import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { DashboardLayout } from "@/layout/dashboardLayout";
import usePageTitle from "@hooks/usePageTitle";
import UseTableControls from "@config/useTableControls";
import BackButton from "@components/backButton";
import SiteButton from "@components/Button/button";
import axios from "axios";
import LoadingSpinner from "@components/loader";
import {LogsObjectData} from "@config/data";

const OrdersLogsDetail = () => {

  usePageTitle("Order Details");


  const {
    filterSort,
    filterSortValue,
    setFilterSortValue,
    filterSortValues,
    filterSearch,
    filterSearchValue,
    setFilterSearchValue,
    dateFilter,
    filterFrom,
    setFilterFrom,
    filterTo,
    setFilterTo,
  } = UseTableControls();

  const { id } = useParams();
  const [detailData, setDetailData] = useState({});

  const [load, setLoad] = useState(false);

  // const loadMentorDetail = async () => {
  //   let data = await axios.get(`mentor-management/${id}`)
  //     .then(response => {
  //       setMentorDetail(response.data.data);
  //       setMentorshipRequests(response.data.data.mentorship_reqs);
  //       setLoad(false);
  //     })
  //     .catch(err => {
  //       console.error(err.response.data.message);
  //       setLoad(false);
  //     });
  // }

  // useEffect(() => {
  //   loadMentorDetail();
  // }, [id]);

  useEffect(() => {
    const filteredData = LogsObjectData.find((item) => id == item.id);
    console.log(filteredData, "text");
    if (filteredData) {
      setDetailData(filteredData);
    }
  }, []);


  function getStatusColorClass(status) {
    switch (status) {
      case "accepted":
      case "contacted":
      case "request accepted":
        return "status_active";
      case "requested":
      case "pending":
        return "status-yellow";
      case "rejected":
      case "request rejected":
        return "red-color";
      default:
        return "";
    }
  }

  return (
    <>
    <DashboardLayout>
        <Container fluid>
          <div className="dashCard ">
            <div className="bg-white rounded-10 shadow-sm p-5 p-lg-5 p-xxl-5">
              <div class="mainTitle mb-0 mb-4 mb-lg-5">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <BackButton />
                    <h2 className="text-black fw-medium">Order Details</h2>
                  </div>
                    <div className="repo-status fw-bold align-self-center">Status: <span>{detailData.status}</span></div>
                </div>
              </div>
              <Row>
                <Col xl={11}>
                  <div className="detail-block">
                      <Row>
                        <Col xs={12} md={6} xl={4} className="mb-4 mb-md-4 mb-xxl-5">
                          <h5 className="fw-medium mb-1 mb-md-2">Name</h5>
                          <p className="">
                            {detailData.name}
                          </p>
                        </Col>
                        <Col xs={12} md={6} xl={4} className="mb-4 mb-md-4 mb-xxl-5">
                          <h5 className="fw-medium mb-1 mb-md-2">Phone No:</h5>
                          <p className="">
                            {detailData.lastName}
                          </p>
                        </Col>
                        <Col xs={12} md={6} xl={4} className="mb-4 mb-md-4 mb-xxl-5">
                          <h5 className="fw-medium mb-1 mb-md-2">Email Address</h5>
                          <p className="">
                            {detailData.email}
                          </p>
                        </Col>
                      </Row>
                  </div>
                </Col>
              </Row>

            </div>
            <div className="bg-white rounded-10 shadow-sm p-5 p-lg-5 p-xxl-5 detail-block mt-5">
              <Row>
                <Col xs={12} className="mb-lg-3 mb-xl-0 d-lg-flex justify-content-between">
                  <h4 className="fw-bold text-black mb-0">Report Order Details:</h4>
                  <div className="repo-status fw-bold align-self-center">Status: <span>{detailData.status}</span></div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-1 mb-md-2">Tracking No:</h5>
                  <p className="">
                    {detailData.trackingNo}
                  </p>
                </Col>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-1 mb-md-2">Order No:</h5>
                  <p className="">
                    {detailData.orderNo}
                  </p>
                </Col>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-1 mb-md-2">Shipping Carrier:</h5>
                  <p className="">
                    {detailData.shippingCarrier}
                  </p>
                </Col>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-1 mb-md-2">Total Price:</h5>
                  <p className="">
                    {detailData.totalPrice}
                  </p>
                </Col>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-1 mb-md-2">No. of Parcels:</h5>
                  <p className="">
                    {detailData.noParcels}
                  </p>
                </Col>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-1 mb-md-2">Pick Up Generated:</h5>
                  <p className="">
                    {detailData.pickUpGenerated}
                  </p>
                </Col>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-1 mb-md-2">Estimated Delivery Date:</h5>
                  <p className="">
                    {detailData.estimatedDeliveryDate}
                  </p>
                </Col>
              </Row>
            </div>
            {detailData.pickupDetails && (
              <div className="bg-white rounded-10 shadow-sm p-5 p-lg-5 p-xxl-5 detail-block mt-5">
              <Row>
                <Col xs={12} className="mb-lg-3 mb-xl-0">
                  <h4 className="fw-bold text-black">Pickup Details:</h4>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-0 mb-md-1">User Contact No:</h5>
                  <p className="">{detailData.pickupDetails.yourContactNo}</p>
                </Col>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-0 mb-md-1">Account No:</h5>
                  <p className="">
                    {detailData.pickupDetails.accountNo}
                  </p>
                </Col>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-0 mb-md-1">Name:</h5>
                  <p className="">
                    {detailData.pickupDetails.name}
                  </p>
                </Col>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-0 mb-md-1">Address Line 1:</h5>
                  <p className="">
                    {detailData.pickupDetails.addressLine1}
                  </p>
                </Col>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-0 mb-md-1">Address Line 2:</h5>
                  <p className="">
                    {detailData.pickupDetails.addressLine2}
                  </p>
                </Col>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-0 mb-md-1">City:</h5>
                  <p className="">
                    {detailData.pickupDetails.city}
                  </p>
                </Col>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-0 mb-md-1">State:</h5>
                  <p className="">
                    {detailData.pickupDetails.state}
                  </p>
                </Col>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-0 mb-md-1">Zip Code:</h5>
                  <p className="">
                    {detailData.pickupDetails.zipCode}
                  </p>
                </Col>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-0 mb-md-1">Estimated Pickup Time:</h5>
                  <p className="">
                    {detailData.pickupDetails.earliestPickupTime}
                  </p>
                </Col>
                <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-0 mb-md-1">Maximum Pickup Time:</h5>
                  <p className="">
                    {detailData.pickupDetails.latestPickupTime}
                  </p>
                </Col>
                </Row>
                <Row>
                <Col xs={12} lg={10} xl={8} xxl={6} className="my-4 my-md-4 my-xxl-5">
                  <h5 className="fw-medium mb-0 mb-md-1">Special Instructions:</h5>
                  <p className="">
                    {detailData.pickupDetails.specialInstructions}
                  </p>
                </Col>
              </Row>
            </div>
            ) }
            {detailData.dropoffDetails && (
              <div className="bg-white rounded-10 shadow-sm p-5 p-lg-5 p-xxl-5 detail-block mt-5">
                <Row>
                  <Col xs={12} className="mb-lg-3 mb-xl-0">
                    <h4 className="fw-bold text-black">Dropoff Details:</h4>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                    <h5 className="fw-medium mb-0 mb-md-1">Contact No. of Receiver:</h5>
                    <p className="">
                      {detailData.dropoffDetails.contactNoReceiver}
                    </p>
                  </Col>
                  <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                    <h5 className="fw-medium mb-0 mb-md-1">Country:</h5>
                    <p className="">
                      {detailData.dropoffDetails.country}
                    </p>
                  </Col>
                  <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                    <h5 className="fw-medium mb-0 mb-md-1">Name:</h5>
                    <p className="">
                      {detailData.dropoffDetails.name}
                    </p>
                  </Col>
                  <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                    <h5 className="fw-medium mb-0 mb-md-1">Address Line 1:</h5>
                    <p className="">
                      {detailData.dropoffDetails.addressLine1}
                    </p>
                  </Col>
                  <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                    <h5 className="fw-medium mb-0 mb-md-1">Address Line 2:</h5>
                    <p className="">
                      {detailData.dropoffDetails.addressLine2}
                    </p>
                  </Col>
                  <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                    <h5 className="fw-medium mb-0 mb-md-1">City:</h5>
                    <p className="">
                      {detailData.dropoffDetails.city}
                    </p>
                  </Col>
                  <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                    <h5 className="fw-medium mb-0 mb-md-1">State:</h5>
                    <p className="">
                      {detailData.dropoffDetails.state}
                    </p>
                  </Col>
                  <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="my-4 my-md-4 my-xxl-5">
                    <h5 className="fw-medium mb-0 mb-md-1">Zip Code:</h5>
                    <p className="">
                      {detailData.dropoffDetails.zipCode}
                    </p>
                  </Col>
                  </Row>
                  <Row>
                  <Col xs={12} md={6} lg={6} xl={6} xxl={6} className="my-4 my-md-4 my-xxl-5">
                    <h5 className="fw-medium mb-0 mb-md-1">Estimated Delivery Time:</h5>
                    <p className="">
                      {detailData.dropoffDetails.estimatedDeliveryTime}
                    </p>
                  </Col>
                  </Row>
                  <Row>
                  <Col xs={12} lg={10} xl={8} xxl={6} className="my-4 my-md-4 my-xxl-5">
                    <h5 className="fw-medium mb-0 mb-md-1">Special Instructions:</h5>
                    <p className="">
                      {detailData.dropoffDetails.specialInstructions}
                    </p>
                  </Col>
                  </Row>
                  <Row>
                  <Col xs={12} lg={10} xl={8} xxl={6} className="my-4 my-md-4 my-xxl-5">
                    <h5 className="fw-medium mb-0 mb-md-1">Reason of Cancellation</h5>
                    <p className="">
                      {detailData.dropoffDetails.reasonCancellation}
                    </p>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </Container>
      </DashboardLayout>
    </>
  );
};

export default OrdersLogsDetail;
