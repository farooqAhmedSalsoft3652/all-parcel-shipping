import { useEffect, useState } from "react";
import { Col, Container, Nav, Navbar, Row, Offcanvas, Dropdown } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logo, userAvatar } from "../../assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faSearch, faBell, faUser, faSignOut } from "@fortawesome/free-solid-svg-icons";
// import { faBell } from '@fortawesome/free-regular-svg-icons';
import { SERVER_URL } from "../../config/data";
import CustomModal from "../../components/customModal/index";
import SiteButton from "../Button/button";
import useAuth from "../../Hooks/useAuth";
import { roles } from '../../config/data';
import axios from "axios";
import moment from "moment";
import { decode } from "base-64";

export const SiteHeader = () => {
  const { role, clearRole } = useAuth();
  const navigate = useNavigate();

  const [showOffCanvasMenu, setShowOffCanvasMenu] = useState(false);
  const [notificationState, setNotificationState] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showYesButton, setShowYesButton] = useState(true);
  const [showNoButton, setShowNoButton] = useState(true);
  const [checkAuth, setCheckAuth] = useState(false);
  const [user, setUser] = useState({});


  const loadNotifications = async () => {
    let data = await axios.get('/notifications?type=unread')
      .then(response => {
        setNotificationState(response.data.data.data);
      })
      .catch(err => console.error(err.response.data));
  }

  useEffect(() => {
    if ((role && role?.role == roles.mentor)) {
      setCheckAuth(true);

      let user = JSON.parse(decode(localStorage.getItem('user')));
      setUser(user);
      loadNotifications();
    }
  }, [role]);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleLogout = async () => {
    let logout = await axios.post('/logout')
      .then(res => {
        // console.log(res.data);
        clearRole();
        localStorage.clear();
        delete axios.defaults.headers.common["Authorization"];
        setShowModal(false);
        navigate("/login");
      })
      .catch(err => {
        console.error(err.response.data);
      })
  };

  const toggleOffCanvasMenu = () => {
    setShowOffCanvasMenu(!showOffCanvasMenu);
  };

 let location = useLocation();
 console.log("Location",role);


  return (
    <>
      <header
        className={`header ${
          location.pathname == "/" ? "header--transparent-bg" : ""
        }`}
      >
        <Container>
          <Navbar.Brand className="">
            <Link to="/" className="header__logo">
              <img src={logo} className="img-fluid site-logo" alt="Logo" />
            </Link>
          </Navbar.Brand>
          <Navbar expand="lg" className="header__nav">
            <SiteButton
              className="transparent-btn p-xl d-lg-none menu-toggle order-1"
              onClick={toggleOffCanvasMenu}
            >
              <FontAwesomeIcon icon={faBars} />
            </SiteButton>

            <Navbar.Collapse>
              {role.role === roles.mentor ? (
                <Nav as="ul" className="mx-auto align-items-lg-center align-items-start position-relative headerNav d-lg-flex">
                  <Nav.Item as="li">
                    <NavLink
                      // exact
                      activeclassname="active"
                      className=""
                      to="/"
                    >
                      Home
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink
                      activeclassname="active"
                      className=""
                      to="/ship-my-parcel"
                    >
                      Ship A Package
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink activeclassname="active" className="" to="/tracking">
                      Tracking
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink activeclassname="active" className="" to="/order-logs">
                    Order Logs
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink
                      activeclassname="active"
                      className=""
                      to="/contact-us"
                    >
                      Contact Admin
                    </NavLink>
                  </Nav.Item>
                </Nav>
              ) : (
                <Nav
                  as="ul"
                  className="mx-auto align-items-lg-center align-items-start position-relative headerNav d-lg-flex"
                >
                  <Nav.Item as="li">
                    <NavLink
                      // exact
                      activeclassname="active"
                      className=""
                      to="/"
                    >
                      Home
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink
                      activeclassname="active"
                      className=""
                      to="/ship-my-parcel"
                    >
                      Ship A Package
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink
                      activeclassname="active"
                      className=""
                      to="/tracking"
                    >
                      Tracking
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink
                      activeclassname="active"
                      className=""
                      to="/contact-us"
                    >
                      Contact Admin
                    </NavLink>
                  </Nav.Item>
                </Nav>
              )}
            </Navbar.Collapse>
            
            {checkAuth === false ? (
                <Nav
                  as="ul"
                  className="login-nav mx-auto align-items-lg-center align-items-start position-relative headerNav d-md-flex flex-row me-3 me-lg-0"
                >
                  <Nav.Item as="li">
                    <NavLink
                      activeclassname="active"
                      className="header__login"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink
                      activeclassname="active"
                      className="header__signup"
                      to="/signup"
                    >
                      Sign up
                    </NavLink>
                  </Nav.Item>
                </Nav>
              ) : (
                <Nav className="align-items-lg-center ms-3 flex-row">
                  <Dropdown className="notiDropdown me-4 ">
                    <Dropdown.Toggle
                      variant="transparent pb-0"
                      className="notButton notifi-btn px-1"
                    >
                      <FontAwesomeIcon className="bellIcon" icon={faBell} />
                      {/* <span className="badge">9+</span> */}
                      {notificationState.length > 0 && (
                        <span className="position-absolute top-0 start-90 translate-middle p-1 border border-light rounded-circle">2</span>
                      )}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="notiMenu" align="end">
                      <div className="d-flex justify-content-between align-items-baseline pt-3 singleNoti notify-border">
                        <h6 className="fw-bold ps-2">Notifications</h6>
                        {notificationState.length > 0 && (
                          <p className="notify-bg">
                            {notificationState.length} New
                          </p>
                        )}
                      </div>
                      <div className="notificationsBody">
                        {notificationState.length > 0 ? (
                          notificationState.slice(0, 5).map((item) => (
                            <>
                              <div key={item.id} className={`${item.data?.read ? 'markUnread' : 'markRead'}`}>
                                <Dropdown.Item
                                  className="drop_icon"
                                  key={item.id}
                                  as={Link}
                                  to="/notifications"
                                >
                                  <div className="d-flex">
                                    <div className="mediaLeft">
                                      <FontAwesomeIcon
                                        className="bell-icon"
                                        icon={faBell}
                                      />
                                    </div>
                                    <div className="mediaRight">
                                      <h6 className="mb-1">Lorem ipsum dolor sit</h6>
                                      <p className="notificationText mb-0">
                                        {item.data.content}
                                      </p>
                                      <div className="meta d-md-flex align-items-baseline justify-content-between">
                                        <p className="mb-0">
                                          {moment(
                                            item.created_at,
                                            "DD-MM-YYYY hh:mm:ss"
                                          ).fromNow()}
                                        </p>
                                        <button className="btn-read">Mark as Read</button>
                                      </div>
                                    </div>
                                  </div>
                                </Dropdown.Item>
                              </div>
                            </>
                          ))
                        ) : (
                          <>
                            <div className="text-center my-3 text-muted">
                              No new notification!
                            </div>
                          </>
                        )}
                      </div>
                      <div className="notiFooter">
                        <Link to={"/notifications"}>View All</Link>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown className="userDropdown">
                    <Dropdown.Toggle
                      variant="transparent"
                      className="notButton toggleButton px-1"
                    >
                      <FontAwesomeIcon
                          className="primary_color"
                          icon={faUser}
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="userMenu" align="end">
                    <Link className="userMenuItem" to={"/profile"}>
                        <div className="userImage online_show">
                          {/* <img
                            src={SERVER_URL + user?.avatar}
                            alt={true.toString()}
                            className="img-fluid rounded-circle"
                            /> */}
                          <img
                            src={userAvatar}
                            alt={true.toString()}
                            className="img-fluid rounded-circle"
                            />
                          <span className="ms-0 d-block mt-3">{`${user.first_name} ${user.last_name}`}</span>
                        </div>
                      </Link>
                      <Link className="userMenuItem" to={"/profile"}>My Profile</Link>
                      <Link
                        className="userMenuItem"
                        onClick={() => handleClick()}
                      >Logout</Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              )}
          </Navbar>
        </Container>




        {/* Offcanvas component */}
        <Offcanvas
          show={showOffCanvasMenu}
          onHide={toggleOffCanvasMenu}
          className="off-convas-header"
        >
          <Offcanvas.Header closeButton className="position-relative ">
            <Offcanvas.Title>
              <h2>Menu</h2>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="mob-menu">
            {role.role === roles.mentor ? (
              <Nav className="flex-column">
                <Nav.Item as="li">
                    <NavLink
                      // exact
                      activeclassname="active"
                      className=""
                      to="/"
                    >
                      Home
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink
                      activeclassname="active"
                      className=""
                      to="/ship-my-parcel"
                    >
                      Ship A Package
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink activeclassname="active" className="" to="/tracking">
                      Tracking
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink activeclassname="active" className="" to="/order-logs">
                    Order Logs
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink
                      activeclassname="active"
                      className=""
                      to="/contact-us"
                    >
                      Contact Admin
                    </NavLink>
                  </Nav.Item>
              </Nav>
            ) : (
              <Nav className="flex-column">
                <Nav.Item as="li">
                    <NavLink
                      // exact
                      activeclassname="active"
                      className=""
                      to="/"
                    >
                      Home
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink
                      activeclassname="active"
                      className=""
                      to="/ship-my-parcel"
                    >
                      Ship A Package
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink
                      activeclassname="active"
                      className=""
                      to="/tracking"
                    >
                      Tracking
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink
                      activeclassname="active"
                      className=""
                      to="/contact-us"
                    >
                      Contact Admin
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink
                      activeclassname="active"
                      className=""
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <NavLink
                      activeclassname="active"
                      className=""
                      to="/signup"
                    >
                      Signup
                    </NavLink>
                  </Nav.Item>
              </Nav>
            )}
           
          </Offcanvas.Body>
        </Offcanvas>

        <CustomModal
          showYesNoButtons={showYesButton || showNoButton}
          show={showModal}
          close={() => setShowModal(false)}
          action={handleLogout}
          heading="System Message"
          para="Are you sure you want to logout?"
        />
      </header>
      {/* Offcanvas component */}
    </>
  );
};
