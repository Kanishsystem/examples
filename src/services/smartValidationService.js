const valid_empty_number = (value, msg) => {
    if (!value && value !== 0) {
        return msg;
    }
    return "";
}
const valid_empty_string = (value, msg) => {
    if (!value && value.trim().length > 0) {
        return msg;
    }
    return "";
}

const valid_pattern = (value, msg, pattern) => {
    if (value !== null && value !== undefined) {
        const normalizedValue = typeof value === 'string' ? value.trim() : value;
        const patterntest = new RegExp(pattern);
        if (!patterntest.test(normalizedValue)) {
            return msg;
        }
    }
    return "";
}
const validateEmail = (value, msg, emailPattern) => {
    if (value !== null && value !== undefined) {
        const normalizedEmail = typeof value === 'string' ? value.trim() : value;
        const patternTest = new RegExp(emailPattern);
        if (!patternTest.test(normalizedEmail)) {
            return msg;
        }
    }
    return "";
};
const validatePassword = (value, msg, minLength) => {
    if (value !== null && value !== undefined) {
        const password = typeof value === 'string' ? value.trim() : value;

        // Check if the password meets the minimum length requirement
        if (password.length < minLength) {
            return msg;
        }


    }
    return "";
};

const validateMin = (value, min, msg) => {
    min = 3;
    if (value < min) {
        return msg;
    }
    return "";
}

const validateMax = (value, max, msg) => {
    if (value > max) {
        return msg;
    }
    return "";
}

const validateInput = (value, validations) => {
    let msg = "";
    for (const validation of validations) {
        // console.log("validation type " , validation.type)
        switch (validation.type) {
            case 'required':
                console.log("Entered in empty string", value)
                msg = valid_empty_string(value, validation.msg);
                break;
            case 'requiredNumber':
                msg = valid_empty_number(value, validation.msg);
                break;
            case 'pattern':
                msg = valid_pattern(value, validation.msg, validation.pattern);
                break;
            case 'email':
                msg = validateEmail(value, validation.msg, validation.emailPattern);
                break;
            case 'min':
                msg = validateMin(value, validation.min, validation.msg);
                break;
            case 'max':
                msg = validateMax(value, validation.max, validation.msg);
                break;
            case 'password':
                msg = validatePassword(value, validation.minLength, validation.msg);
                break;
            // Add more validation types as needed
            default:
                break;
        }
    }
    console.log("value ", value, " msg ", msg);
    return msg; // No validation errors
}

export {
    validateInput
}