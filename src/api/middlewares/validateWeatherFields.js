const {validateCity} = require("./cityValidator");
const validateWeatherFields = async (city) => {
  if (!city) {
    return { valid: false, message: 'City parameter is required' };
  }

  const isCityCorrect = await validateCity(city);
  if (!isCityCorrect) {
    return { valid: false, message: 'The city was not found. Check the title' };
  }

  return { valid: true };
};

module.exports = { validateWeatherFields };