import './index.css';

const LoadingSpinner = () => {
  return (
    <div className='text-center my-5'>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* bootstrap spinner */}
      {/* <div className='spinner-border text-primary' style={{width: '3rem', height: '3rem'}} role='status'></div> */}
    </div>
  )
}

export default LoadingSpinner