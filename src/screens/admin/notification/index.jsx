import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { DashboardLayout } from "@/layout/dashboardLayout";
import CustomPagination from "@components/customPagination";
import usePageTitle from "@hooks/usePageTitle";
import NotificationsCard from "../../notifications/NotificationsCard";

import { notificationData } from "@config/data";

export const AdminNotification = () => {
  usePageTitle("Notifications")
  const [notifications, setNotifications] = useState([]);
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const loadNotifications = async () => {
    let url = `notifications?page=${currentPage}`;
    if(type) url += `&type=${type}`;

    let data = await axios.get(url)
      .then(response => {
        let total_records    = response.data.data.meta.total;
        let records_per_page = response.data.data.meta.per_page;
        let total_pages      = Math.ceil(total_records / records_per_page);

        response.data.data.data.map((item) => item.read_at = item.read_at ? true : false);
        // console.log(response.data.data.data);

        // setNotifications(response.data.data.data);
        setNotifications(notificationData);
        setCurrentPage(response.data.data.meta.current_page);
        setTotalRecords(total_records);
        setTotalPages(total_pages);
      })
      .catch(err => console.error(err.response.data.message));
  }

  useEffect(() => {
    loadNotifications();
  }, [type, currentPage]);
    
  return (
    <DashboardLayout>
      <Container fluid>
        <div className="dashCard mb-4 py-5">
          <div className="bg-white rounded-10 shadow-sm p-5 p-lg-5 p-xxl-5">
            <div className="mainTitle mb-0 mb-5 d-block d-lg-flex justify-content-between">
                <h2 className="text-black fw-medium">Notification</h2> 
                <div className="d-flex align-self-center">
                  <label className='align-self-center me-3' htmlFor="">Showing:</label>
                  <select
                    className="mainInput notify_input"
                    name="notifications"
                    id="notifications"
                    onChange={e => setType(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                  </select>
                </div> 
            </div>
            <div className="noti_boxm">
            <ul className="noti_box mb-3">
              {notifications.length === 0 ? (
                <h3 className="text-center text-muted">No notification found!</h3>
              ) : (
              notifications.map((item, index) => {
                return (
                  <li key={index}>
                    <NotificationsCard data={item} />
                  </li>
                );
              }))}
            </ul>
          </div>
          <Row className="justify-content-between">
            <Col xs={12}>
              <CustomPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                totalRecords={totalRecords}
              />
            </Col>
          </Row>

          </div>
          
        </div>

     
      </Container>
    </DashboardLayout>
  );
};

export default AdminNotification;
