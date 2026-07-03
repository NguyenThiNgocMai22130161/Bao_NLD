// Validation utility functions

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateUsername = (username: string): boolean => {
  return username.trim().length >= 3 && username.trim().length <= 50;
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

// Error message helpers
export const getEmailError = (email: string): string | undefined => {
  if (!validateRequired(email)) {
    return "Email không được để trống";
  }
  if (!validateEmail(email)) {
    return "Email không hợp lệ";
  }
  return undefined;
};

export const getPasswordError = (password: string): string | undefined => {
  if (!validateRequired(password)) {
    return "Mật khẩu không được để trống";
  }
  if (!validatePassword(password)) {
    return "Mật khẩu phải có ít nhất 6 ký tự";
  }
  return undefined;
};

export const getUsernameError = (username: string): string | undefined => {
  if (!validateRequired(username)) {
    return "Tên đăng nhập không được để trống";
  }
  if (!validateUsername(username)) {
    return "Tên đăng nhập phải từ 3 đến 50 ký tự";
  }
  return undefined;
};

export const getConfirmPasswordError = (
  password: string,
  confirmPassword: string
): string | undefined => {
  if (!validateRequired(confirmPassword)) {
    return "Vui lòng xác nhận mật khẩu";
  }
  if (password !== confirmPassword) {
    return "Mật khẩu xác nhận không khớp";
  }
  return undefined;
};
