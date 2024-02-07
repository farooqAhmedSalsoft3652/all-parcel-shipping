import { Col, Pagination, Row } from "react-bootstrap";
import "./index.css";

const CustomPagination = (props) => {
  let active = props.currentPage;
  let items = [];
  for (let number = 1; number <= props.totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={e => props.setCurrentPage(number)}>
        {number}
      </Pagination.Item>
    );
  }

  const handleChangePage = (active) => {
    props.setCurrentPage(active);
  }

  return (
    <>
      <div className="customPagination">
        <Row className="row align-items-baseline">
          <Col lg={6}>
            <p className="paginationText">Showing  {props.currentPage} - {props.totalPages} Of {props.totalRecords} Entries</p>
          </Col>
          <Col lg={6}>
            <div className="d-flex justify-content-end">
              <Pagination>
                {props.currentPage > 1 && (
                  <Pagination.Prev prev>
                    <span className=" d-sm-inline-block" onClick={() => handleChangePage(props.currentPage - 1)}>Previous</span>
                  </Pagination.Prev>
                )}
                {items}
                {props.currentPage < props.totalPages && (
                  <Pagination.Next next>
                    <span className=" d-sm-inline-block" onClick={() => handleChangePage(props.currentPage + 1)}>Next</span>
                  </Pagination.Next>
                )}
              </Pagination>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CustomPagination;