import '.././../notifications/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import SiteButton from '@components/Button/button'
import moment from 'moment'
import axios from 'axios'


const NotificationsCard = (props) => {
    const handleRead = async (e, id) => {
        let btn = e.target;
        let data = await axios.get(`/mark-as-read/${id}`)
        .then(() => {
            let item = document.getElementById(`notification_${id}`);
            item.classList.remove('markRead');
            item.classList.add('markUnread');
            btn.classList.add("d-none");
        })
        .catch(err => console.error(err.response.data.message));
    }

    return (
        <div className={`${props.data?.read_at ? 'markUnread' : 'markRead'} flex-sm-row flex-column d-flex align-items-sm-center align-items-end justify-content-between`} id={`notification_${props.data.id}`}>
            <div className="d-flex align-items-center">
            <div className="bellbg ">
                <FontAwesomeIcon className='bell_icon' icon={faBell}/>
              </div>
                <div className="noti_boxl me-4">
                    {/* <img src={props.image} alt='' /> */}
                </div>
                <div className="noti_boxr ">
                    <p className='d-grey-color first'>{props.data.data.content}</p>
                    <p className='second'>
                        <span className='pe-2'>
                            {moment(props.data.created_at, "DD-MM-YYYY hh:mm:ss").format("DD-MM-YYYY")}
                        </span> | 
                        <span className='ps-2'> 
                            {moment(props.data.created_at, "DD-MM-YYYY hh:mm:ss").format("hh:mm A")}
                        </span>
                    </p>
                </div>
            </div>
            <div className="noti_boxe">
                {!props.data?.read_at && (
                <SiteButton 
                    // className={`notification_btn ${read ? 'unread_btn' : 'read_btn'} `} 
                    className={`notification_btn read_btn`} 
                    onClick={(e) => handleRead(e, props.data?.id)}
                >
                    Mark as Read
                </SiteButton>
                )}
            </div>
        </div>

    )

}

export default NotificationsCard;
