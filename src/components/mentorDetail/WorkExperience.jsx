import {CustomInput} from "@components/CustomInput";
import { Col } from "react-bootstrap";

export default function WorkExperience(props) {
  return (
    <>
    <Col md={6} xs={12}>
        <CustomInput
            label="Organization Name"
            type="text"
            id={`organization_name_${props.value.id}`}
            name="organization_name"
            value={props.value.organization_name}
            onChange={e => props.setData(e, props.value.id, props.setWorkExperience)}
            required
            placeholder="Enter Organization Name"
            labelClass="mainLabel bold"
            inputClass="mainInput"
            inputError={props?.errors[`work_experience.${props?.index}.organization_name`]}
        />
    </Col>
    <Col md={6} xs={12}>
        <CustomInput
            label="Designation"
            type="text"
            id={`designation_${props.value.id}`}
            name="designation"
            value={props.value.designation}
            onChange={e => props.setData(e, props.value.id, props.setWorkExperience)}
            required
            placeholder="Enter Designation*"
            labelClass="mainLabel bold"
            inputClass="mainInput"
            inputError={props?.errors[`work_experience.${props?.index}.designation`]}
        />
    </Col>
    <Col md={6} xs={12}>
        <CustomInput
            label="From"
            type="date"
            id={`work_from_${props.value.id}`}
            name="work_from"
            value={props.value.work_from}
            onChange={(e) => {
                props.setData(e, props.value.id, props.setWorkExperience)
                document.getElementById(`work_to_${props.value.id}`).setAttribute('min', e.target.value);
            }}
            required
            labelClass="mainLabel bold"
            inputClass="mainInput"
            inputError={props?.errors[`work_experience.${props?.index}.work_from`]}
        />
    </Col>
    <Col md={6} xs={12}>
        <CustomInput
            label="To"
            type="date"
            id={`work_to_${props.value.id}`}
            name="work_to"
            value={props.value.work_to}
            onChange={(e) => {
                props.setData(e, props.value.id, props.setWorkExperience)
                document.getElementById(`work_from_${props.value.id}`).setAttribute('max', e.target.value);
            }}
            required
            labelClass="mainLabel bold"
            inputClass="mainInput"
            inputError={props?.errors[`work_experience.${props?.index}.work_to`]}
        />
    </Col>
    </>
  )
}
