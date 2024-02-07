import { Col, Container, Row } from "react-bootstrap"
import { Layout } from "@components/Layout/layout"
import { useEffect, useState } from "react";
import CustomTable from "@components/CustomTable";
import UseTableControls from "@config/useTableControls";
import { Link } from "react-router-dom";
import usePageTitle from "@hooks/usePageTitle";
import LoadingSpinner from "@components/loader";
import axios from "axios";


const FeaturingLogs = () => {
  usePageTitle("Featuring Logs");
  const [featuredLogs, setFeaturedLogs] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [load, setLoad] = useState(true);

  const {
    filterSort, filterSortValue, setFilterSortValue, filterSortValues, filterSearch, filterSearchValue, setFilterSearchValue, dateFilter, filterFrom, setFilterFrom, filterTo, setFilterTo
  } = UseTableControls();

  const featuringLogsHeader = [
    {
      key: "id",
      title: "S.no",
    },
    {
      key: "FeatureAdTitle",
      title: "Feature Ad Title",
    },
    {
      key: "SubscriptionDate",
      title: "Subscription Date",
    },
    {
        key: "RequestsReceived",
        title: "Requests Received",
    },
    {
        key: "RequestStatus",
        title: "Remaining Requests",
      },
    {
      key: "Status",
      title: "Status",
    },
    {
        key: "action",
        title: "Action",
    },
  ];

  const sortingValues = [
    {
      value: 'all',
      text: 'All'
    },
    {
      value: 'status',
      text: 'Status'
    },
    {
      value: 'registered',
      text: 'Registered Date'
    },
  ];

  const loadFeaturedLogs = async () => {
    setLoad(true);
    let url = `/featured-logs?page=${currentPage}`;
    if(filters.limit)  url += `&limit=${filters.limit}`; 
    if(filters.from)   url += `&from=${filters.from}`; 
    if(filters.to)     url += `&to=${filters.to}`; 
    if(filters.search) url += `&search=${filters.search}`; 
    if(filters.status) url += `&status=${filters.status}`; 

    let data = await axios.get(url)
      .then(response => {
        // console.log(response.data.data);
        let total_records    = response.data.data.meta.total;
        let records_per_page = response.data.data.meta.per_page;
        let total_pages      = Math.ceil(total_records / records_per_page);

        setFeaturedLogs(response.data.data.data);
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
    loadFeaturedLogs();
  }, [currentPage, filters]);


  return (
    <Layout>
      <section className=" section_padding two_pices_bg position-relative">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="form_layout pb-3">
                <Row >
                  <Col xs={12} md={10} className="m-auto">
                    <Row className="my-5">
                      <Col lg={6}>
                        <div >
                          <h3 className=" text-capitalize">
                            Featuring Logs
                          </h3>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className=" text-end">
                          <Link to={"/featuring-logs/packages"} className="site-btn text-decoration-none text-center">
                            Feature Ads
                          </Link>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                    <Col xs={12}>
                    <CustomTable
                      headers={featuringLogsHeader}
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
                        featuredLogs.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.package_title}</td>
                            <td>{item.subscription_date}</td>
                            <td>{item.no_of_request}</td>
                            <td>{item.remaining_requests}</td>
                            <td className={`fw-bold ${item.status  ? "status_active" : "status_inactive"}`}>
                                {item.status ? 'Active' : 'Inactive'}</td>
                            <td>
                               <Link to={`/featuring-logs/packages`} className="tableAction fw-bold view text-decoration-underline">Renew</Link>
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

export default FeaturingLogs