import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { MentorManagementData, MentorshipReqData, SERVER_URL } from "../../../../config/data";
import { DashboardLayout } from "@/layout/dashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import usePageTitle from "@hooks/usePageTitle";
import UseTableControls from "@config/useTableControls";
import CustomTable from "@components/CustomTable";
import BackButton from "@components/backButton";
import axios from "axios";
import LoadingSpinner from "@components/loader";

const AdminMentorDetail = () => {
  usePageTitle("Mentor Detail");

  const mentordetailHeader = [
    {
      key: "id",
      title: "S.no",
    },
    {
      key: "name",
      title: "MENTEE Name",
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
      key: "Status",
      title: "Status",
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
  const [mentorDetail, setMentorDetail] = useState({});
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  const [load, setLoad] = useState(true);

  const loadMentorDetail = async () => {
    let data = await axios.get(`mentor-management/${id}`)
      .then(response => {
        setMentorDetail(response.data.data);
        setMentorshipRequests(response.data.data.mentorship_reqs);
        setLoad(false);
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad(false);
      });
  }

  useEffect(() => {
    loadMentorDetail();
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
        <section className="admin-profile">
          <Container fluid>
            <Row>
              <div className="dashCard py-3 position-relative">
                <Col xs={12}>
                  <Row className="py-5">
                    <Col lg={5} xs={12} className="ps-5">
                      <h3>
                        <BackButton />
                        Mentor Profile
                      </h3>
                    </Col>
                    <Col lg={6} xs={12}>
                      {!load && (
                        <div
                          className={`statusMain position ${
                            mentorDetail.status ? "green-bg " : "red-bg"
                          }`}
                        >
                          <span className="fw-bold">Status:</span>
                          <span
                            className={`statusBadge ps-3 ${
                              mentorDetail.status ? "active" : "inactive"
                            }`}
                          >
                            {mentorDetail.status ? "Active" : "Inactive"}
                          </span>
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    {load ? (
                      <LoadingSpinner />
                    ) : (
                      <Col xs={12}>
                        <Row>
                          <Col xs={12}>
                            <div className="sec_title d-block text-center">
                              <div className="mb-2">
                                <div className="attached">
                                  <img
                                    src={SERVER_URL + mentorDetail.avatar}
                                    className="img-fluid ml-0 profile_img"
                                    alt={true.toString()}
                                  />
                                </div>
                              </div>
                              <p className="p-lg primary_color fw-bold mb-0">
                                {mentorDetail.full_name}
                              </p>
                              <p className="xl-grey-color p-xs profile_label mb-0">
                                {mentorDetail.email}
                              </p>
                              <p className="xl-grey-color p-xs profile_label">
                                {mentorDetail.phone_number}
                              </p>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={11} className="m-auto">
                            <div className="ps-4 ms-1">
                              <Row>
                                <div className="detail_title">
                                  <p className="p-lg primary_color fw-bold mb-0">
                                    Personal Details
                                  </p>
                                </div>
                                <Col xs={10} className="p-0 ">
                                  <div className="my-4">
                                    <label className="xl-grey-color p-xs profile_label">
                                      Area Of Interest
                                    </label>
                                    <p className="fw-bold mt-3 label-text">
                                      {mentorDetail.interests?.length > 0 ? (
                                        mentorDetail.interests.map(
                                          (item, index) =>
                                            index + 1 ===
                                            mentorDetail.interests.length ? (
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
                                  <div className="my-4">
                                    <label className="xl-grey-color p-xs profile_label">
                                      About Yourself
                                    </label>
                                    <p className="fw-bold mt-3 label-text">
                                      {mentorDetail.about_yourself}
                                    </p>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <div className="detail_title">
                                  <p className="p-lg primary_color fw-bold mb-0">
                                    Educational Detail
                                  </p>
                                </div>
                                <Col xs={10} className="p-0">
                                  {mentorDetail.education?.map(
                                    (item, index) => (
                                      <Row key={index}>
                                        <Col lg={4} xs={6}>
                                          <div className="my-4">
                                            <label className="xl-grey-color p-xs profile_label">
                                              Institute Name
                                            </label>
                                            <p className="fw-bold mt-3 label-text">
                                              {item.institute_name}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col lg={4} xs={6}>
                                          <div className="my-4">
                                            <label className="xl-grey-color p-xs profile_label">
                                              Degree Title
                                            </label>
                                            <p className="fw-bold mt-3 label-text">
                                              {item.degree_title}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col lg={4} xs={6}>
                                          <div className="my-4">
                                            <label className="xl-grey-color p-xs profile_label">
                                              Year
                                            </label>
                                            <p className="fw-bold mt-3 label-text">
                                              {item.from.short_date} -{" "}
                                              {item.to.short_date}
                                            </p>
                                          </div>
                                        </Col>
                                      </Row>
                                    )
                                  )}
                                </Col>
                              </Row>
                              <Row>
                                <div className="detail_title">
                                  <p className="p-lg primary_color fw-bold mb-0">
                                    Work Experience
                                  </p>
                                </div>
                                <Col xs={10} className="p-0">
                                  {mentorDetail.work_experiences?.map(
                                    (item, index) => (
                                      <Row key={index}>
                                        <Col lg={4} xs={6}>
                                          <div className="my-4">
                                            <label className="xl-grey-color p-xs profile_label">
                                              Organization Name
                                            </label>
                                            <p className="fw-bold mt-3 label-text">
                                              {item.organization_name}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col lg={4} xs={6}>
                                          <div className="my-4">
                                            <label className="xl-grey-color p-xs profile_label">
                                              Designation
                                            </label>
                                            <p className="fw-bold mt-3 label-text">
                                              {item.designation}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col lg={4} xs={6}>
                                          <div className="my-4">
                                            <label className="xl-grey-color p-xs profile_label">
                                              Year
                                            </label>
                                            <p className="fw-bold mt-3 label-text">
                                              {item.from.short_date} -{" "}
                                              {item.to.short_date}
                                            </p>
                                          </div>
                                        </Col>
                                      </Row>
                                    )
                                  )}
                                </Col>
                              </Row>
                              <Row>
                                <div className="detail_title">
                                  <p className="p-lg primary_color fw-bold mb-0">
                                    Certification Detail
                                  </p>
                                </div>
                                <Col xs={10} className="p-0">
                                  {mentorDetail.certifications?.map(
                                    (item, index) => (
                                      <Row key={index}>
                                        <Col lg={4} xs={6}>
                                          <div className="my-4">
                                            <label className="xl-grey-color p-xs profile_label">
                                              Institute Name
                                            </label>
                                            <p className="fw-bold mt-3 label-text">
                                              {item.institute_name}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col lg={4} xs={6}>
                                          <div className="my-4">
                                            <label className="xl-grey-color p-xs profile_label">
                                              Certificate Title
                                            </label>
                                            <p className="fw-bold mt-3 label-text">
                                              {item.certificate_title}
                                            </p>
                                          </div>
                                        </Col>
                                        <Col lg={4} xs={6}>
                                          <div className="my-4">
                                            <label className="xl-grey-color p-xs profile_label">
                                              Certificate Picture
                                            </label>
                                            <div className="my-3">
                                              <img
                                                src={
                                                  SERVER_URL +
                                                  item.certificate_picture
                                                }
                                                className="img-fluid img-thumbnail"
                                                alt="certificate"
                                                width={100}
                                              />
                                            </div>
                                          </div>
                                        </Col>
                                      </Row>
                                    )
                                  )}
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
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
                          headers={mentordetailHeader}
                          // filterSort={true}
                          // filterSortValue={filterSortValue}
                          // setFilterSortValue={setFilterSortValue}
                          // filterSortValues={sortingValues}
                          filterSearch={true}
                          // filterSearchValue={filterSearchValue}
                          // setFilterSearchValue={setFilterSearchValue}
                          renderEntries={false}
                          dateFilter={true}
                          // filterFrom={filterFrom}
                          // setFilterFrom={setFilterFrom}
                          // filterTo={filterTo}
                          // setFilterTo={setFilterTo}
                        >
                          <tbody>
                            {mentorshipRequests.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <div className="d-flex justify-content-start">
                                    <img
                                      className="ad_poster_img me-2"
                                      src={SERVER_URL + item.mentee_avatar}
                                      alt={true.toString()}
                                    />
                                    <p className="flex-grow-1 align-self-center text-start mb-0">
                                      {item.mentee_name}
                                    </p>
                                  </div>
                                </td>
                                <td>#{item.id}</td>
                                <td>{item.request_date}</td>
                                <td>${item.request_amount}</td>
                                <td
                                  className={`status-cell ${getStatusColorClass(
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
        </section>
      </DashboardLayout>
    </>
  );
};

export default AdminMentorDetail;
