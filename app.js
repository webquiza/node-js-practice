// Problem: We need a simple way to look at a user's Treehouse badge count, JavaScript points and profile URL

// Solution: Use Node.js to connect to Treehouse's API to get user profile information to print out

const profile = require('./profile.js');

// Take in any number of usernames
const users = process.argv.slice(2);
users.forEach(profile.get);