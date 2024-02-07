import { useState } from "react";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { SERVER_URL } from "@config/data";
import {CustomInput} from "@components/CustomInput";

export default function UpdateCertification(props) {
    const [certificateImage, setCertificateImage] = useState(null);

    const handleCertificateImage = (e) => {
        const image = e.target.files[0];
        if(image){
            setCertificateImage(URL.createObjectURL(image))
            props.setData(e, props.value.id, props.setCertification);
        }
    }

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
            <input
                type="file"
                id={`certificate_picture_${props.value.id}`}
                name="certificate_picture2"
                accept="image/*"
                className="d-none"
                onChange={handleCertificateImage}
            />
        </div>
        {props.errors[`certification.${props?.index}.certificate_picture2`] ? (
            <small className='text-danger ms-2'>{props.errors[`certification.${props?.index}.certificate_picture2`][0]}</small>
        ) : null}
    </Col>
    <Col md={6} xs={12}>
        {(certificateImage || props.value?.certificate_picture) && (
        <div style={{width:"300px", height:"120px"}}>
            <img
                src={certificateImage ?? (SERVER_URL + props.value.certificate_picture)}
                className="img-fluid img-thumbnail"
                alt="certificate"
                style={{width:"100%", height:"100%", objectFit: "contain"}}
            />
        </div>
        )}
    </Col>
    </>
  )
}
