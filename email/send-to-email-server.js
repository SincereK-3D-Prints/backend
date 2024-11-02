'use strict';

const sendToEmailServer = async (email, displayName, code) => {
  const url = 'http://mail.sincerek3dprints.shop';

  // Data to be sent in the request body as JSON
  const data = { email, displayName, code };

  // Configuring the fetch options for the POST request
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  // Making the POST request using fetch
  return fetch(url, requestOptions)
    .then(response => {
      // Check if the response is successful (status code 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parsing the response body as JSON
    });
};

module.exports = {
  sendToEmailServer
};
