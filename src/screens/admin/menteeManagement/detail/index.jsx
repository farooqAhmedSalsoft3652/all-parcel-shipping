import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { DashboardLayout } from "@/layout/dashboardLayout";
import { SERVER_URL } from "@config/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import usePageTitle from "@hooks/usePageTitle";
import UseTableControls from "@config/useTableControls";
import CustomTable from "@components/CustomTable";
import BackButton from "@components/backButton";
import axios from "axios";
import LoadingSpinner from "@components/loader/index";

const MenteeDetail = () => {
  usePageTitle("Mentee Detail");
  const mentorshipHeader = [
    {
      key: "id",
      title: "S.no",
    },    
    {
      key: "name",
      title: "Mentor Name",
    },
    {
      key: "RequestID",
      title: "Request ID",
    },
    {
      key: "RequestDate",
      title: "Request Date",
    },
    {
      key: "RequestAmount",
      title: "Request Amount",
    },
    {
      key: "RequestStatus",
      title: "Request Status",
    },
    {
      key: "actions",
      title: "Actions",
    },
  ];
  const sortingValues = [
    {
      value: "all",
      text: "All",
    },
    {
      value: "status",
      text: "Status",
    },
    {
      value: "registered",
      text: "Registered Date",
    },
  ];
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
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  const [menteeDetail, setMenteeDetail] = useState({});
  const [load, setLoad] = useState(true);

  const loadMenteeDetail = async () => {
    let data = await axios.get(`mentee-management/${id}`)
      .then(response => {
        setMenteeDetail(response.data.data);
        setMentorshipRequests(response.data.data.mentorship_reqs);
        setLoad(false);
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad(false);
      });
  }

  useEffect(() => {
   loadMenteeDetail();
  }, [id]);

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
          <Row>
            <div
              className="dashCard position-relative"
              style={{ minHeight: "auto" }}
            >
              <Col xs={12} md={11} className="m-auto">
                <Row className="my-5">
                  <Col lg={6} xs={12}>
                    <div>
                      <h3>
                        <BackButton />
                        Mentee Profile
                      </h3>
                    </div>
                  </Col>
                  {!load && (
                    <Col lg={6} xs={12}>
                      <div
                        className={`statusMain position ${
                          menteeDetail.status === "active"
                            ? "green-bg"
                            : "red-bg"
                        }`}
                      >
                        <span className="fw-bold">Status:</span>
                        <span
                          className={`statusBadge ps-3 text-capitalize ${menteeDetail.status}`}
                        >
                          {menteeDetail.status}
                        </span>
                      </div>
                    </Col>
                  )}
                </Row>
                <Row className="pb-5">
                  {load ? (
                    <LoadingSpinner />
                  ) : (
                    <Col xs={12}>
                      <div className="d-xl-flex">
                        <div
                          className="flex-shrink-0"
                          style={{ width: "200px", height: "200px" }}
                        >
                          <img
                            className="img-fluid profile-img"
                            src={SERVER_URL + menteeDetail.avatar}
                            alt="mentee-profile-image"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                        <div className="flex-grow-1 ms-xl-4 mt-4 mt-xl-0">
                          <Row className="">
                            <Col lg={4} xs={12}>
                              <div>
                                <label className="xl-grey-color p-xs profile_label">
                                  User Name
                                </label>
                                <p className="fw-bold mt-1 label-text">
                                  {menteeDetail.full_name}
                                </p>
                              </div>
                            </Col>
                            <Col lg={4} xs={12}>
                              <div>
                                <label className="xl-grey-color p-xs profile_label">
                                  Email Address
                                </label>
                                <p className="fw-bold mt-1 label-text">
                                  {menteeDetail.email}
                                </p>
                              </div>
                            </Col>
                            <Col lg={4} xs={12}>
                              <div>
                                <label className="xl-grey-color p-xs profile_label">
                                  Phone Number
                                </label>
                                <p className="fw-bold mt-1 label-text">
                                  {menteeDetail.phone_number}
                                </p>
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div>
                                <label className="xl-grey-color p-xs profile_label">
                                  Area Of Interest
                                </label>
                                <p className="fw-bold mt-1 label-text">
                                  {menteeDetail.interests?.length > 0 ? (
                                    menteeDetail.interests.map((item, index) =>
                                      index + 1 ===
                                      menteeDetail.interests.length ? (
                                        <>{item.interests}</>
                                      ) : (
                                        <>{item.interests}, </>
                                      )
                                    )
                                  ) : (
                                    <>none</>
                                  )}
                                </p>
                              </div>
                              <div>
                                <label className="xl-grey-color p-xs profile_label">
                                  About Yourself
                                </label>
                                <p className="fw-bold mt-1 label-text">
                                  {menteeDetail.about_yourself}
                                </p>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
              </Col>
            </div>
          </Row>
          {!load && (
            <Row className="py-3">
              <div className="dashCard">
                <Col xs={12} md={11} className="m-auto">
                  <Row>
                    <Col xs={12}>
                      <div className="my-5">
                        <h3>Mentorship Request</h3>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <CustomTable
                        headers={mentorshipHeader}
                        // filterSort={true}
                        // filterSortValue={filterSortValue}
                        // setFilterSortValue={setFilterSortValue}
                        // filterSortValues={sortingValues}
                        // filterSearch={true}
                        // filterSearchValue={filterSearchValue}
                        // setFilterSearchValue={setFilterSearchValue}

                        renderEntries={false}
                        paginateRecords={false}
                        dateFilter={true}
                        // filterFrom={filterFrom}
                        // setFilterFrom={setFilterFrom}
                        // filterTo={filterTo}
                        // setFilterTo={setFilterTo}
                      >
                        <tbody>
                          {mentorshipRequests
                            .toReversed()
                            .map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <div className="d-flex justify-content-start">
                                    <img
                                      className="ad_poster_img me-2"
                                      src={SERVER_URL + item.mentor_avatar}
                                      alt={true.toString()}
                                    />
                                    <p className="flex-grow-1 align-self-center text-start mb-0">
                                      {item.mentor_name}
                                    </p>
                                  </div>
                                </td>
                                <td>#{item.id}</td>
                                <td>{item.request_date}</td>
                                <td>${item.request_amount}</td>
                                <td
                                  className={`status-cell text-capitalize ${getStatusColorClass(
                                    item.request_status
                                  )}`}
                                >
                                  {item.request_status}
                                </td>
                                <td>
                                  <Link
                                    to={`/admin/mentorship-request/details/${item.id}`}
                                    className="tableAction view text-decoration-underline"
                                  >
                                    <FontAwesomeIcon icon={faEye} />
                                  </Link>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </CustomTable>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Row>
          )}
        </Container>
      </DashboardLayout>
    </>
  );
};

export default MenteeDetail;
