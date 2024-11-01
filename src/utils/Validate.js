const phoneRegex = /^\d{10}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const checkAndValidateLoginForm = (fieldKey, fieldValue) => {
    if (fieldKey === 'phoneNumber') {
        if (fieldValue === '') return 'phoneNumber could not be empty';
        if (fieldValue !== '' && !(phoneRegex.test(fieldValue))) return 'Invalid Phone Number';
    } else if (fieldKey === 'password') {
        if (fieldValue === '') return 'password could not be empty';
        if (fieldValue !== '' && !(passwordRegex.test(fieldValue))) return 'Invalid password';
    }
    return '';
}

export const checkAndValidateRegisterForm = (fieldKey, fieldValue, dependentValue) => {
    if (fieldKey === 'firstName') {
        if (fieldValue === '') return 'firstName could not be empty';
    } else if (fieldKey === 'lastName') {
        if (fieldValue === '') return 'lastName could not be empty';
    } else if (fieldKey === 'email') {
        if (fieldValue === '') return 'email could not be empty';
        if (fieldValue !== '' && !(emailRegex.test(fieldValue))) return 'Invalid email';
    } else if (fieldKey === 'phoneNumber') {
        if (fieldValue === '') return 'phoneNumber could not be empty';
        if (fieldValue !== '' && !(phoneRegex.test(fieldValue))) return 'Invalid phoneNumber'
    } else if (fieldKey === 'password') {
        if (fieldValue === '') return 'password could not be empty';
        if (fieldValue !== '' && !(passwordRegex.test(fieldValue))) return 'Invalid Password';
    } else if (fieldKey === 'confirmPwd') {
        if (fieldValue === '') return 'confirmPassword could not be empty';
        if (dependentValue !== fieldValue) return 'Password and Confirm Password are not matching';
    }

}

