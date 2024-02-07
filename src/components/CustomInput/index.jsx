import { useState } from 'react'
import "./style.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap';

export const CustomInput = (props) => {

  const [typePass, setTypePass] = useState(true)

  const togglePassType = () => {
    setTypePass(!typePass)
  }

  return (
    <>
      <div className="inputWrapper">
        {props?.label && (
          <label htmlFor={props?.id} className={props?.labelClass}>
            {props?.label}
            {props?.required ? <span className="text-danger">*</span> : ""}
          </label>
        )}
        {props?.type === "textarea" ? (
          <textarea
            type={props?.type}
            placeholder={props?.placeholder}
            onChange={props?.onChange}
            onBlur={props?.onBlur}
            required={props?.required}
            id={props?.id}
            name={props?.name}
            className={`${props?.inputClass} passInput`}
            rows={props?.rows}

          />
        ) : props?.type === "password" ? (
          <div className="passwordWrapper">
            <input
              type={typePass ? "password" : "text"}
              placeholder={props?.placeholder}
              onChange={props?.onChange}
              onBlur={props?.onBlur}
              required={props?.required}
              id={props?.id}
              name={props?.name}
              className={`${props?.inputClass} passInput`}
            />
            <button
              type="button"
              className="eyeButton"
              onClick={togglePassType}
            >
              <FontAwesomeIcon icon={typePass ? faEyeSlash : faEye} />
            </button>
          </div>
        ) : props?.inputUnit ? (
          <div className="position-relative has-input-unit">
            <input
              type={props?.type}
              placeholder={props?.placeholder}
              required={props?.required}
              id={props?.id}
              name={props?.name}
              className={props?.inputClass}
              onChange={props?.onChange}
              onBlur={props?.onBlur}
              value={props?.value}
            />
            <span className="input-unit">{props.inputUnit}</span>
          </div>
        ) : props?.location ? (
          <div className="position-relative has-input-unit">
            <input
              type={props?.type}
              placeholder={props?.placeholder}
              required={props?.required}
              id={props?.id}
              name={props?.name}
              className={props?.inputClass}
              onChange={props?.onChange}
              onBlur={props?.onBlur}
              value={props?.value}
            />
            <button className="location-btn" type="button">
              <FontAwesomeIcon icon={faLocationDot} />
            </button>
          </div>
        ) : (
          <input
            type={props?.type}
            placeholder={props?.placeholder}
            required={props?.required}
            id={props?.id}
            name={props?.name}
            className={props?.inputClass}
            onChange={props?.onChange}
            onBlur={props?.onBlur}
            value={props?.value}
          />
        )}

        {props?.errors && props?.touched ? (
          <small className="text-danger ms-2">{props?.errors}</small>
        ) : null}
        {props?.inputError ? (
          <small className="text-danger ms-2">{props?.inputError[0]}</small>
        ) : null}
      </div>
    </>
  );
}
// export default CustomInput;



/*** Select DropDown  With Object Fields ****/

export const DropDown = ({
  options,
  id,
  label,
  required = false, // set default value for required
  onChange,
  value,
  name,
  labelClass,
}) => {
  const renderLabel = () => {
    if (!label) return null; // return null if labelText is falsy

    return (
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
    );
  };

  return (
    <>
      {renderLabel()}
      <div className="select-wrapper d-block mt-1 mt-sm-0">
        <Form.Select
          aria-label="Default select example"
          value={value}
          onChange={onChange}
          name={name}
        >
          {options.map((opt, index) => (
            <option key={index} id={id} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Form.Select>
      </div>
    </>
  );
};

