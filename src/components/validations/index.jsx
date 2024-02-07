import * as Yup from "yup";

export const contactValidations = Yup.object({
    full_name: Yup.string().min(3).max(20).matches(/^[A-Za-z\s]+$/, 'Only alphabetic characters allowed').required("Required").label("Name"),
    email:     Yup.string().email().required("Required").label("Email"),
    subject:   Yup.string().min(10).required("Required").label("Subject"),
    message:   Yup.string().min(10).max(500).required("Required").label("Message"),
});

export const mentorshipValidations = Yup.object({
    goals:        Yup.string().min(10).max(100).required("Required").label("Goals"),
    expectations: Yup.string().min(10).max(500).required("Required").label("Expectations"),
});

export const changePasswordValidate = Yup.object({
    old_password:     Yup.string().min(8).required("Required").label("Old Password"),
    new_password:     Yup.string().min(8).max(30).required("Required").label("New Password"),
    confirm_password: Yup.string().required("Required").oneOf([Yup.ref('new_password'), null], "Passwords must match.").label("Confirm Password"),
});

export const codeValidate = Yup.object({
    code: Yup.string().min(6).required("Required").label("Code"),
});

export const passwordValidate = Yup.object({
    password:         Yup.string().min(8).max(30).required("Required").label("New Password"),
    confirm_password: Yup.string().required("Required").oneOf([Yup.ref('password'), null], "Passwords must match.").label("Confirm Password"),
});

export const chargesValidate = Yup.object({
    is_online_active: Yup.boolean(),
    is_onsite_active: Yup.boolean().required("Required"),
    online_charges: Yup.number().when('is_online_active', {
        is: (value) => value === true, 
        then: () => Yup.number().min(1).max(200).required("Required").label("Online Charges"),
        otherwise: () => Yup.number().label("Online Charges")
    }),
    onsite_charges: Yup.number().when('is_onsite_active', {
        is: (value) => value === true, 
        then: () => Yup.number().min(1).max(200).required("Required").label("Onsite Charges"),
        otherwise: () => Yup.number().label("Onsite Charges")
    })
});

// ========== ADMIN VALIDATIONS ==========

export const addInterestValidate = Yup.object({
    name: Yup.string().matches(/^[A-Za-z\s]+$/, 'Only alphabetic characters allowed').required("Required").label("Interest name"),
    status: Yup.string().required("Required")
});

export const editInterestValidate = Yup.object({
    name: Yup.string().matches(/^[A-Za-z\s]+$/, 'Only alphabetic characters allowed').required("Required").label("Interest name")
});

export const adsValidate = Yup.object({
    package_title: Yup.string().matches(/^[A-Za-z\s]+$/, 'Only alphabetic characters allowed').required("Required").label("Package title"),
    amount: Yup.number().min(1).required("Required").label("Amount"),
    no_of_request: Yup.number().min(1).required("Required").label("No of Requests"),
    details: Yup.string().min(10).required("Required").label("Details")
});