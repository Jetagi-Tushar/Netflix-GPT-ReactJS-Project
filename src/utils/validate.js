export const checkValidData = (email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Minimum eight characters, at least one letter and one number
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);

  if (!isEmailValid) {
    return "Invalid email format.";
  }
  if (!isPasswordValid) {
    return "Password is not valid";
  }
  return null;
};
