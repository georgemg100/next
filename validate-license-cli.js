const axios = require('axios');

/**
 * Validate license key using the validate-license API endpoint
 * @param {string} licenseKey - The license key to validate
 */
async function validateLicense(licenseKey) {
  try {
    const response = await axios.post('http://localhost:3000/api/validate-license', { licenseKey });
    const { valid, active } = response.data;
    console.log(JSON.stringify(response.data))
    console.log('License Validation Result:');
    console.log('------------------------');
    console.log();
    console.log();
    console.log();
  } catch (error) {
    console.error('Error validating license:', error.message);
    if (error.response) {
      console.error('Server response:', error.response.data);
    }
  }
}

// Get license key from command-line argument
const licenseKey = process.argv[2];

if (!licenseKey) {
  console.error('Please provide a license key as a command-line argument');
  process.exit(1);
}

validateLicense(licenseKey);
