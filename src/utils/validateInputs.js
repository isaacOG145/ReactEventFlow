
export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

export const validatePhone = (phone) => {
    const regex = /^\+?[\d\s-]{10}$/;
    return regex.test(phone);
};

export const validateMaxLength = (value, maxLength) => {
    return value.length <= maxLength;
};

export const validateRequired = (value) => {
    return value.trim() !== '';
};


export const validateRequiredField = (value, maxLength) => {
    if (!validateRequired(value)) {
        return { isValid: false, message: "Este campo es obligatorio" };
    }
    if (!validateMaxLength(value, maxLength)) {
        return { isValid: false, message: `Máximo ${maxLength} caracteres` };
    }
    return { isValid: true, message: "" };
};

export const validatePassword = (password) => {
    return password.length >= 8;
  };