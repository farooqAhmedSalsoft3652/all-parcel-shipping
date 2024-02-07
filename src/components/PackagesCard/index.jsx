import './index.css'

const PakagesCard = (props) => {
  return (
    <div className="package-card-wrapper mt-3 mt-xl-0">
      <div className={`packages_card Our_team_box position-relative ${props?.classSelected}`}>
          <div className="price_request text-center">
              <h3 className="card_title">{props.data.package_title}</h3>
              <p className="section_title fw-bold primary_color">${props.data.amount}</p>
              <p className="p-lg secondary-color">{props.data.no_of_request} Requests</p>
          </div>
          <p className='text-center'>{props.data.details}</p>
          {/* <ul class="m-0 p-0">
            <li class="my-3 list-unstyled l-grey-color">{list1}</li>
            <li class="my-3 list-unstyled l-grey-color">{list2}</li>
            <li class="my-3 list-unstyled l-grey-color">{list3}</li>
          </ul> */}
      </div>
    </div>
  )
}

export default PakagesCard