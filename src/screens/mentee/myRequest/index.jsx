import { Col, Container, Row } from "react-bootstrap"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@components/Layout/layout";
import { SERVER_URL, mentorshipStatusFilter } from "@config/data";
import CustomTable from "@components/CustomTable";
import usePageTitle from "@hooks/usePageTitle";
import UseTableControls from "@config/useTableControls";
import LoadingSpinner from "@components/loader";
import axios from "axios";

const MyRequest = () => {
  usePageTitle("My Requests");

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
    setFilterTo
  } = UseTableControls();

  const requestHeader = [
    // {
    //   key: "id",
    //   title: "S.no",
    // },
    {
      key: "name",
      title: "Mentor Name",
    },
    // {
    //   key: "RequestID",
    //   title: "Request ID",
    // },
    // {
    //   key: "RequestAmount",
    //   title: "Request Amount",
    // },
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

  const [mentorshipReqData, setMentorshipReqData] = useState([])
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [load, setLoad] = useState(true);

  const loadMentorshipRequests = async () => {
    setLoad(true);
    let url = `/my-requests?page=${currentPage}`;
    if(filters.limit)  url += `&limit=${filters.limit}`; 
    if(filters.from)   url += `&from=${filters.from}`; 
    if(filters.to)     url += `&to=${filters.to}`; 
    if(filters.search) url += `&search_user=${filters.search}`; 
    if(filters.status) url += `&status=${filters.status}`; 

    let data = await axios.get(url)
      .then(response => {
        // console.log(response.data.data);
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
        console.error(err.response.data);
        setLoad(false);
      });
  }

  useEffect(() => {
    loadMentorshipRequests();
  }, [currentPage, filters]);

  return (
    <Layout>
      <section className=" section_padding two_pices_bg position-relative">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="form_layout pb-3">
                <Row>
                  <Col xs={12} md={10} className="m-auto">
                    <Row>
                      <Col xs={12}>
                        <div className="my-5">
                          <h3 className=" text-capitalize">
                            My Requests
                          </h3>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <CustomTable
                          headers={requestHeader}
                          statusFilter={mentorshipStatusFilter}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          totalPages={totalPages}
                          totalRecords={totalRecords}
                          filters={filters}
                          setFilters={setFilters}
                          setLoad={setLoad}

                          // filterSort={true}
                          // filterSortValue={filterSortValue}
                          // setFilterSortValue={setFilterSortValue}
                          // filterSortValues={sortingValues}

                          // filterSearch={true}
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
                            mentorshipReqData?.map((item, index) => (
                              <tr key={index}>
                                {/* <td>{index + 1}</td> */}
                                <td>
                                  <div className="d-flex justify-content-start">
                                    <img className="ad_poster_img me-2" src={SERVER_URL + item.avatar} alt={true.toString()} />
                                    <p className="flex-grow-1 align-self-center text-start mb-0">{item.mentor_name}</p>
                                  </div>
                                </td>
                                {/* <td>#{item.id}</td> */}
                                {/* <td>${item.request_amount}</td> */}
                                <td>{item.request_date}</td>
                                <td className="text-capitalize">
                                  {item.status}
                                </td>
                                <td>
                                  <Link to={`/my-request/details/${item.id}`} className="tableAction view text-decoration-underline">View</Link>
                                </td>
                              </tr>
                            )))}
                          </tbody>
                        </CustomTable>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  )
}

export default MyRequest