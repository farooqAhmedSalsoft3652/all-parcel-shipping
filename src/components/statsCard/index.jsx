import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const StatsCard = ({stats, index, item}) => {
  return (
    <>
      <div className="statsCard px-xl-3 px-0">
        <div className="statsContent">
          <div className="statsImg">
            <img src={stats[index].image} alt="Card Icon" />
          </div>
          <div className="statsData">
           <div className=" d-flex align-items-center justify-content-between">
           <p className="statsNumber fw-bold">{item.current_month}</p>
            <div className="statsChange">
            <p className="fw-bold">
                {item.diff > 0 ? (
                <FontAwesomeIcon
                    icon={faArrowCircleUp}
                    className="me-2 greenColor arrow-icon"
                />
                ) : (
                <FontAwesomeIcon
                    icon={faArrowCircleDown}
                    className="me-2 redColor"
                />
                )}
                {Math.abs(item.diff.toFixed(2))}%
              </p>
           </div>
        
           </div>
            <p className="statsText p-0 m-0">{stats[index].text}</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default StatsCard;
