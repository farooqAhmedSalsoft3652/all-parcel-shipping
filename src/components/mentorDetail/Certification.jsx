import {CustomInput} from "@components/CustomInput";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Certification(props) {
    const [profileName, setProfileName] = useState("");

  return (
    <>
    <Col md={6} xs={12}>
        <CustomInput
            label="Institution Name"
            type="text"
            id={`cert_institute_name_${props.value.id}`}
            name="institute_name"
            value={props.value.institute_name}
            onChange={e => props.setData(e, props.value.id, props.setCertification)}
            required
            placeholder="Enter Institution Name"
            labelClass="mainLabel bold"
            inputClass="mainInput"
            inputError={props?.errors[`certification.${props?.index}.institute_name`]}
        />
    </Col>
    <Col md={6} xs={12}>
        <CustomInput
            label="Certificate Title"
            type="text"
            id={`certificate_title_${props.value.id}`}
            name="certificate_title"
            value={props.value.certificate_title}
            onChange={e => props.setData(e, props.value.id, props.setCertification)}
            required
            placeholder="Enter Certificate Title"
            labelClass="mainLabel bold"
            inputClass="mainInput"
            inputError={props?.errors[`certification.${props?.index}.certificate_title`]}
        />
    </Col>
    <Col md={6} xs={12}>
        <div className="fileuploder d-flex justify-content-between align-items-center">
            <label htmlFor={`certificate_picture_${props.value.id}`}>
                <FontAwesomeIcon
                    icon={faArrowUpFromBracket}
                    className="me-2"
                />
                Upload Certificate Picture*
            </label>
            <small className="text-secondary">{profileName}</small>
            <input
                type="file"
                id={`certificate_picture_${props.value.id}`}
                name="certificate_picture"
                accept="image/*"
                className="d-none"
                onChange={e => {
                    props.setData(e, props.value.id, props.setCertification);
                    setProfileName(e.target.files[0].name)
                }}
            />
        </div>
        {props.errors[`certification.${props?.index}.certificate_picture`] ? (
            <small className='text-danger ms-2'>{props.errors[`certification.${props?.index}.certificate_picture`][0]}</small>
        ) : null}
    </Col>
    </>
  )
}
