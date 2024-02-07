import {CustomInput} from "@components/CustomInput";
import { Col } from "react-bootstrap";

export default function EducationDetail(props) {
    return (
        <>
            <Col md={6} xs={12}>
                <CustomInput
                    label="Institution Name"
                    type="text"
                    id={`institute_name_${props.value.id}`}
                    name="institute_name"
                    value={props?.value.institute_name}
                    onChange={e => props.setData(e, props.value.id, props.setEducation)}
                    required
                    placeholder="Enter Institution Name"
                    labelClass="mainLabel bold"
                    inputClass="mainInput"
                    inputError={props?.errors[`education.${props?.index}.institute_name`]}
                />
            </Col>
            <Col md={6} xs={12}>
                <CustomInput
                    label="Degree Title"
                    type="text"
                    id={`degree_title_${props.value.id}`}
                    name="degree_title"
                    value={props?.value.degree_title}
                    onChange={e => props.setData(e, props.value.id, props.setEducation)}
                    required
                    placeholder="Enter Degree Title"
                    labelClass="mainLabel bold"
                    inputClass="mainInput"
                    inputError={props?.errors[`education.${props?.index}.degree_title`]}
                />
            </Col>
            <Col md={6} xs={12}>
                <CustomInput
                    label="From"
                    type="date"
                    id={`education_from_${props.value.id}`}
                    name="education_from"
                    value={props?.value?.education_from}
                    onChange={e => {
                        props.setData(e, props.value.id, props.setEducation)
                        document.getElementById(`education_to_${props.value.id}`).setAttribute('min', e.target.value);
                    }}
                    required
                    labelClass="mainLabel bold"
                    inputClass="mainInput"
                    inputError={props?.errors[`education.${props?.index}.education_from`]}
                />
            </Col>
            <Col md={6} xs={12}>
                <CustomInput
                    label="To"
                    type="date"
                    id={`education_to_${props.value.id}`}
                    name="education_to"
                    value={props?.value?.education_to}
                    onChange={e => {
                        props.setData(e, props.value.id, props.setEducation)
                        document.getElementById(`education_from_${props.value.id}`).setAttribute('max', e.target.value);
                    }}
                    required
                    labelClass="mainLabel bold"
                    inputClass="mainInput"
                    inputError={props?.errors[`education.${props?.index}.education_to`]}
                />
            </Col>
        </>
    )
}
