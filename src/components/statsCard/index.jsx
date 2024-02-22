import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faArrowCircleUp, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const StatsCard = ({stats, index, item}) => {
  return (
    <>
      <div className="statsCard">
        <div className="statsContent">
          <div className="statsImg me-4">
            <img src={stats[index]?.image} alt="Card Icon" />
          </div>
          <div className="statsData">
           <div className=" d-flex align-items-center justify-content-start">
            <p className="statsNumber fw-bold">{stats[index]?.current_month}</p>
            <div className="statsChange">
              <p className="fw-bold">
                {item.diff > 0 ? (
                <FontAwesomeIcon
                    icon={faArrowUp}
                    className="me-2 arrow-icon"
                />
                ) : (
                <FontAwesomeIcon
                    icon={faArrowDown}
                    className="me-2 redColor"
                />
                )}
                {/* {Math.abs(item.diff.toFixed(2))}% */}
              </p>
           </div>
        
           </div>
            <p className="statsText p-0 m-0">{stats[index]?.text}</p>
          </div>
          <div className="graph-icon">
            <img src={stats[index]?.graphIcon} alt="Card Icon" />
          </div>
        </div>

      </div>
    </>
  );
};

export default StatsCard;
