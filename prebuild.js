const fs = require('fs');
const path = require('path');

// Define the paths to the environment files
const envPath = path.join(__dirname, './environments/environment.ts');

// Get secrets from environment variables
const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;

const envContent = `
export const environment = {
  API_KEY: '${apiKey}',
  API_URL: '${apiUrl}',
};
`;

// Write to the environment files
fs.writeFileSync(envPath, envContent);

console.log('Environment files created successfully.');
