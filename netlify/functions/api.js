exports.handler = async (event, context) => {
    if (event.httpMethod === 'GET') {
      try {
        // Process the GET request as needed
        //const data = require('./db.json');
        

        const data = {
            test: 'sadas',
            best: 'sadasd'
        }

        // Add CORS headers
        const headers = {
          'Access-Control-Allow-Origin': 'https://parklane-city.com', // Replace * with the appropriate domain
          'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Return the data as the response
        return {
          statusCode: 200,
          headers,
          body: data,
        };
      } catch (error) {
        // Return an error response if there was an issue processing the request
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to process GET request' }),
        };
      }
    }
  };