import { Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './style.css';
import { CheckImg, QuestionImg } from '../../assets/images';
import SiteButton from '../Button/button';
import {CustomInput} from '../CustomInput/index'


const CustomModal = (props) => {

  const showAdditionalContent = props.showAdditionalContent;
  const showRejectionReason = props.showRejectionReason
  return ( 
    <Modal show={props?.show} centered onHide={props?.close}>
      <button className='closeButton' onClick={props?.close}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <Modal.Body className='text-center'>
        <div className={`${showAdditionalContent || showRejectionReason ?  "" : "py-4"}`}>
        {showAdditionalContent || showRejectionReason ? null  : (
            <>
              {props?.success ? (
                <img src={CheckImg} alt="checkmark" className='modalImage'/>
              ) : (
                <img src={QuestionImg} alt="questionIcon" className='modalImage'/>
              )}
              <h4 className="modalHeading fw-bold primary_color ">{props?.heading}</h4> 
              <p className="grey-text modalPara pb-1 p-md ">{props.para}</p>
            </>
          )}

            {props?.success ? 
              <SiteButton onClick={props.onClickOk} clickFunction={props?.close} className='site-btn'>
                {props?.buttonText ? props?.buttonText : 'Ok'}
              </SiteButton> 
              :
              <>
                {props.showYesNoButtons && (
                  <>
                    <SiteButton onClick={props?.action} className='site-btn site_border_btn me-3'>Yes</SiteButton> 
                    <SiteButton onClick={props?.close} className='site-btn ' btnClass='btn-greenbor'>No</SiteButton>
                  </>
                )}
                {props.showLoginButton && (
                  <SiteButton onClick={props?.handleLogin} className='site-btn' >Login</SiteButton> 
                )}
                {props.showSignUpButton && (
                    <SiteButton onClick={props?.handleSignUp} className='site-btn site_border_btn ms-3'>Sign Up</SiteButton>
                )}
                   {showAdditionalContent && (
                    <Form onSubmit={props.handleSubmit}>
                      <div className='text-start req-input'>
                        <CustomInput 
                          label="Goal" 
                          labelClass="mainLabel bold" 
                          type="text" 
                          id="goals" 
                          placeholder="Enter Goal" 
                          inputClass="mainInput"
                          // required 
                          // onChange={e => props.setFormData(prev => ({...prev, goals: e.target.value}))}
                          value={props.values.goals}
                          onChange={props?.handleChange}
                          onBlur={props?.handleBlur}
                          errors={props.errors.goals}
                          touched={props.touched.goals}
                        />

                        <label htmlFor="expectation" className='mainLabel bold'>
                          Expectation<span className='text-danger'>*</span>
                        </label>
                        <textarea 
                          id="expectations" 
                          cols="10" 
                          rows="5" 
                          className='mainInput' 
                          placeholder='Enter Expectation'
                          // onChange={e => props.setFormData(prev => ({...prev, expectations: e.target.value}))}
                          value={props.values.expectations}
                          onChange={props?.handleChange}
                          onBlur={props?.handleBlur}
                        />
                        {props.errors.expectations && props.touched.expectations ? (
                          <small className='text-danger ms-2'>{props.errors.expectations}</small>
                        ) : null}
                        <div className="text-center py-2">
                          <SiteButton className="site-btn" type="submit" load={props.load}>Next</SiteButton>
                        </div>
                      </div>
                    </Form>
                   )}
                   {showRejectionReason && (
                      <div className=' req-model p-4 text-start'>
                        {props?.Reasonheading && (
                          <h4 className="modalHeading fw-bold primary_color text-center mb-5">{props?.Reasonheading}</h4>
                        )  }
                        <h4 className='fw-semibold test-start mb-2'>What was the issue?</h4>
                        <Form.Check
                          label="Late"
                          name="group1"
                          type="radio"
                          id={`inline-radio-1`}
                        />
                        <Form.Check
                          label="Other(Please Specify)"
                          name="group1"
                          type="radio"
                          id={`inline-radio-2`}
                        />

                        {/* <label htmlFor="" className='mainLabel bold d-flex'>Rejection Reason<span className='text-danger'>*</span></label> */}
                        <textarea name="reason" id="reason" cols="10" rows="5" className='mainInput mt-3' placeholder='Enter Cancelation Reason' onChange={e => props.setFormData(prev => ({...prev, reason: e.target.value}))} required />
                        <div className="text-start py-2">
                          <SiteButton className="site-btn" onClick={props.handleReason}>Submit</SiteButton>
                        </div>
                      </div>
                   )}
              </>
            }
        </div>
        {props.children}
      </Modal.Body>
    </Modal>
  )
}

export default CustomModal;