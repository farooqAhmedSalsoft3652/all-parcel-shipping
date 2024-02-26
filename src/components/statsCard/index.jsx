import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faArrowCircleUp, faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const StatsCard = ({stats, index, item}) => {
  return (
    <>
      <div className="statsCard">
        <div className="statsContent d-block d-xl-flex">
          <div className="text-center text-sm-start d-sm-flex flex-grow-1">
            <div className="statsImg me-2 me-xxl-4 flex-shrink-0">
              <img src={stats[index]?.image} alt="Card Icon" />
            </div>
            <div className="statsData flex-grow-1">
              <div className=" d-flex align-items-center justify-content-center justify-content-sm-start">
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
          </div>
          <div className="flex-shrink-0 mt-3 mt-xl-0">
            <div className="graph-icon flex-shrink-0 text-center text-sm-start ">
              <img src={stats[index]?.graphIcon} alt="Card Icon" />
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default StatsCard;
