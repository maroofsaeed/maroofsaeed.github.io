exports.handler = async (event, context) => {
    if (event.httpMethod === 'GET') {
      try {
        // Process the GET request as needed
        //const data = require('./db.json');
        
        var products = [{"name":"Pizza","price":"10","quantity":"7"}, {"name":"Cerveja","price":"12","quantity":"5"}, {"name":"Hamburguer","price":"10","quantity":"2"}, {"name":"Fraldas","price":"6","quantity":"2"}];
        console.log(products);
        var b = JSON.parse(JSON.stringify(products));
        console.log(b);

        // Add CORS headers
        const headers = {
          'Access-Control-Allow-Origin': '*', // Replace * with the appropriate domain
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json',
        };

        // Return the data as the response
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(b),
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