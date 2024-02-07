import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { DashboardLayout } from "@/layout/dashboardLayout";
import CustomPagination from "@components/customPagination";
import usePageTitle from "@hooks/usePageTitle";
import NotificationsCard from "../../notifications/NotificationsCard";

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

        setNotifications(response.data.data.data);
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
          <Row className="py-3">
            <Col xs={12}>
              <h3 className="mainTitle">Notification</h3>
              <div className="py-4">
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
            </Col>
          </Row>
          <div className="noti_boxm">
            <ul className="noti_box">
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

     
      </Container>
    </DashboardLayout>
  );
};

export default AdminNotification;
