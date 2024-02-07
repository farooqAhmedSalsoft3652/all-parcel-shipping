import './index.css'
import { useEffect, useState } from 'react'
import { Layout } from '@components/Layout/layout'
import { Col, Container, Row } from 'react-bootstrap'
import NotificationsCard from './NotificationsCard'
import CustomPagination from '@components/customPagination'
import usePageTitle from '@hooks/usePageTitle'
import axios from 'axios'

const Notifications = () => {
  usePageTitle("Notification");
  const [type, setType] = useState("");
  const [notifications, setNotifications] = useState([]);
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
    <Layout>
      <div className="notification-section section_padding two_pices_bg position-relative">
        <Container>
            <Row>
              <Col xs={12}>
                <div className="form_layout">
                  <Row>
                    <Col lg={10} className="offset-lg-1">
                        <Row className="py-4">
                          <Col xs={12}>
                              <h3 className='headingMina'>Notifications</h3>
                              <div className="py-4">
                                <select className='mainInput notify_input' name="notifications" id="notifications"
                                  onChange={e => setType(e.target.value)}>
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
                    </Col>
                  </Row>
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
              </Col>
            </Row>
        </Container>
      </div>
 
    </Layout>
  )
}

export default Notifications;
