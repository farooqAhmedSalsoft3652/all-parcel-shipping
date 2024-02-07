import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { DashboardLayout } from "@/layout/dashboardLayout";
import LoadingSpinner from "@components/loader";
import CustomTable from "@components/CustomTable";
import usePageTitle from "@hooks/usePageTitle";
import axios from "axios";

const QueriesList = () => {
  usePageTitle("Queries List");
  const [queries, setQueries] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [load, setLoad] = useState(true);

  const loadQueries = async () => {
    setLoad(true);
    let url = `/queries?page=${currentPage}`;
    if(filters.from)   url += `&from=${filters.from}`; 
    if(filters.to)     url += `&to=${filters.to}`; 
    if(filters.search) url += `&search=${filters.search}`; 
    if(filters.status) url += `&status=${filters.status}`; 

    let data = await axios.get(url)
    .then(response => {
      let total_records    = response.data.data.meta.total;
      let records_per_page = response.data.data.meta.per_page;
      let total_pages      = Math.ceil(total_records / records_per_page);

      setQueries(response.data.data.data);
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
    loadQueries();
  }, [currentPage, filters]);

  const queriesHeader = [
    {
      key: "id",
      title: "S.no",
    },
    {
      key: "name",
      title: "NAME",
    },
    {
      key: "email",
      title: "EMAIL ADDRESS",
    },
    {
      key: "UserType",
      title: "User Type",
    },
    {
        key: "date",
        title: "Date",
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
  const statusFilter = [
    "guest",
    "mentee",
    "mentor"
  ];

  return (
    <>
      <DashboardLayout>
        <Container fluid>
          <Row className="py-3">
            <div className="dashCard">
              <Col xs={12} md={11} className="m-auto">
                <Row>
                  <Col xs={12}>
                    <div className="my-5">
                      <h3>Queries</h3>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <CustomTable
                      headers={queriesHeader}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      totalPages={totalPages}
                      totalRecords={totalRecords}
                      filters={filters}
                      setFilters={setFilters}
                      setLoad={setLoad}
                      
                      renderEntries={false}
                      filterSearch={true}
                      dateFilter={true}
                      statusFilter={statusFilter}
                      statusFilterText="Filter by User Type"
                    >
                      <tbody>
                        {load ? (
                          <tr>
                            <td colSpan="100%">
                              <LoadingSpinner />
                            </td>
                          </tr>
                        ) : (
                        queries.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            {/* <td>
                              <div className="d-flex justify-content-start">
                                <img
                                  className="ad_poster_img me-2"
                                  src={item.UserImg}
                                  alt=""
                                />
                                <p className="flex-grow-1 align-self-center text-start mb-0">
                                  {item.full_name}
                                </p>
                              </div>
                            </td> */}
                            <td>{item.full_name}</td>
                            <td>{item.email}</td>
                            <td>{item.user_type}</td>
                            <td>{item.date}</td>
                            <td>
                              <Link
                                to={`/admin/queries-list/detail/${item.id}`}
                                className="tableAction view text-decoration-underline"
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </Link>
                            </td>
                          </tr>
                        )))}
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

export default QueriesList;
