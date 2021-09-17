// Problem: We need a simple way to look at a user's Treehouse badge count, JavaScript points and profile URL

// Solution: Use Node.js to connect to Treehouse's API to get user profile information to print out

// Require https module

const https = require('https');

// Require http module for status codes
const http =require('http');

// Print Error Messages

function printError(error) {
  console.error(error.message);
}

// Function to print message to console

function printMessage(username, badgeCount, points, profile_url) {
  const message = `${username} has ${badgeCount} total badges and ${points} points in JavaScript. Checkout their Treehouse profile here: ${profile_url}`;
  console.log(message);
}

function getProfile(username) {
  try {
    // Connect to the API URL (https://teamtreehouse.com/${username}.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      if (response.statusCode === 200) {
        let body = "";
        // Read the data
        response.on('data', data => {
          body += data.toString();
        });
        response.on('end', () => {
          try {
            // Parse the data
            const profile = JSON.parse(body); 
            // Print the data
            printMessage(username, profile.badges.length, profile.points.JavaScript, profile.profile_url);
          } catch (error) {
            printError(error);
          }
        });
      } else {
          const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
          const statusCodeError = new Error(message);
          printError(statusCodeError);
      }
    });

    request.on('error', printError);
  } catch (error) {
    printError(error);
  }
}

// Take in any number of usernames
const users = process.argv.slice(2);
users.forEach(getProfile);