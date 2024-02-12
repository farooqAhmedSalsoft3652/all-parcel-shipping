import './index.css'
import { useEffect, useState } from 'react'
import { Layout } from '@components/Layout/layout'
import { Col, Container, Row } from 'react-bootstrap'
import NotificationsCard from './NotificationsCard'
import CustomPagination from '@components/customPagination'
import usePageTitle from '@hooks/usePageTitle'
import axios from 'axios'

import { notificationData } from "@config/data";


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

  console.log("Data", notificationData);
  return (
    <Layout>
      <main className="notification-section align-bottom page-content bg-white position-relative">
        <Container>
          <Row>
            <Col xs={12} className='d-block d-lg-flex justify-content-between'>
              <div className="title">
                <h2 className="text-primary mb-2 fw-medium">Notification</h2>
              </div>
              <div className="d-flex align-self-center">
                <label className='align-self-center me-3' htmlFor="">Showing:</label>
                <select className='mainInput notify_input' name="notifications" id="notifications"
                  onChange={e => setType(e.target.value)}>
                    <option value="">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                  </select>
              </div>
            </Col>
          </Row>
            <Row>
              <Col xs={12} className='mt-5'>
                
                  <Row>
                    <Col lg={12} className="">
                        <div className="noti_boxm">   
                          <ul className="noti_box">
                          {/* {notifications.length === 0 ? (
                            <h3 className="text-center text-muted">No notification found!</h3>
                          ) : (
                            notificationData.map((item, index) => {
                            return (
                              <li key={index}>
                                <NotificationsCard data={item} />
                              </li>
                            );
                          }))}  */}
                          {notificationData.map((item, index) => {
                            return (
                              <li key={index}> 
                                <NotificationsCard data={item} />
                              </li>
                            )
                          })}
                          </ul>
                        </div>
                    </Col>
                  </Row>
                
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
      </main>
 
    </Layout>
  )
}

export default Notifications;
