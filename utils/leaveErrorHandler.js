// handle errors
const handleErrors = (err) => {
  let errors = {};

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "Invalid Email or Password";
  }

  // duplicate email error
  if (err.code === 11000) {
    if (err.keyPattern.dateBooked)
      errors.dateBooked = "That date is already taken";
    return errors;
  }

  // validation errors
  if (err.message.includes("validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports = handleErrors;
