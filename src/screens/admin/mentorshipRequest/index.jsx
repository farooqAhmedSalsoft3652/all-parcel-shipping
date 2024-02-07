import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { DashboardLayout } from "@/layout/dashboardLayout";
import { SERVER_URL, mentorshipStatusFilter } from "@config/data";
import usePageTitle from "@hooks/usePageTitle";
import UseTableControls from "@config/useTableControls";
import CustomTable from "@components/CustomTable";
import LoadingSpinner from "@components/loader";
import axios from "axios";


const MentorshipRequest = () => {
  usePageTitle("Mentorship Requests");

  const mentorshipHeader = [
    {
      key: "id",
      title: "S.no",
    },
    {
      key: "RequestID",
      title: "Request ID",
    },
    {
      key: "menteeName",
      title: "Mentee Name",
    },
    {
      key: "mentorName",
      title: "Mentor Name",
    },
    {
      key: "RequestDate",
      title: "Request Date",
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

  const [mentorshipReqData, setMentorshipReqData] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [load, setLoad] = useState(true);

  const loadMentorshipRequest = async () => {
    setLoad(true);
    let url = `/mentorship-management?page=${currentPage}`;
    if(filters.from)   url += `&from=${filters.from}`; 
    if(filters.to)     url += `&to=${filters.to}`; 
    if(filters.search) url += `&search_in_user=${filters.search}`; 
    if(filters.status) url += `&status=${filters.status}`; 

    let data = await axios.get(url)
      .then(response => {
        let total_records    = response.data.data.meta.total;
        let records_per_page = response.data.data.meta.per_page;
        let total_pages      = Math.ceil(total_records / records_per_page);

        setMentorshipReqData(response.data.data.data);
        setCurrentPage(response.data.data.meta.current_page);
        setTotalRecords(total_records);
        setTotalPages(total_pages);
        setLoad(false);
      })
      .catch(err => {
        console.error(err.response.data.message);
        setLoad(false);
      });
  }

  useEffect(() => {
    loadMentorshipRequest();
  }, [currentPage, filters]);

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
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      totalPages={totalPages}
                      totalRecords={totalRecords}
                      filters={filters}
                      setFilters={setFilters}
                      setLoad={setLoad}
                      statusFilter={mentorshipStatusFilter}
                      // filterSort={true}
                      renderEntries={false}
                      // filterSortValue={filterSortValue}
                      // setFilterSortValue={setFilterSortValue}
                      // filterSortValues={sortingValues}
                      filterSearch={true}
                      // filterSearchValue={filterSearchValue}
                      // setFilterSearchValue={setFilterSearchValue}
                      dateFilter={true}
                      // filterFrom={filterFrom}
                      // setFilterFrom={setFilterFrom}
                      // filterTo={filterTo}
                      // setFilterTo={setFilterTo}
                    >
                      <tbody>
                        {load ? (
                          <tr>
                            <td colSpan="100%">
                              <LoadingSpinner />
                            </td>
                          </tr>
                        ) : (
                          mentorshipReqData.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>#{item.id}</td>
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
                              <td>{item.request_date}</td>
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
                          ))
                        )}
                      </tbody>
                    </CustomTable>
                  </Col>
                </Row>
              </Col>
            </div>
          </Row>
        </Container>
      </DashboardLayout>
    </>
  );
};

export default MentorshipRequest;
