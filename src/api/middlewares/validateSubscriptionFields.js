const isValidFields = (email, city, frequency) => {
  if (!email || !city || !frequency) {
    return { valid: false, message: 'Missing required fields' };
  }
  return { valid: true };
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = { isValidFields, isValidEmail };
