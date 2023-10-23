const fetch = require('node-fetch');
exports.handler = async (event, context) => {
    if (event.httpMethod === 'GET') {
      try {
        // Process the GET request as needed
        //const data = require('./db.json');

        console.log(event.queryStringParameters.cellnumber);
        
        // Add CORS headers
        const headers = {
          'Access-Control-Allow-Origin': 'https://parklane-city.com', // Replace * with the appropriate domain
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/pdf',
        };

        
        const data = { SaleID: event.queryStringParameters.SaleID, LocationID: event.queryStringParameters.LocationID, CompanyID: event.queryStringParameters.CompanyID, ToDate: '', ReportType: 'Knock Wise', PartyID: event.queryStringParameters.PartyID};

        const result = fetch('http://135.181.143.213:8097/ClientTransaction/PrintClientTransactionForWeb', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the response data
            console.log(data);
          })
          .catch((error) => {
            // Handle any errors
            console.error(error);
          });
        
        
        
        //console.log(result.Status);

        
          // Return a success response
          return {
            statusCode: 200,
            headers,
            body: result,
          };
        

       
      } catch (error) {
        // Return an error response if there was an issue processing the request
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to process GET request' }),
        };
      }
    }

    if(event.httpMethod === 'POST'){
      try {
        // Parse the incoming JSON payload from the request body
        const requestBody = JSON.parse(event.body);

        console.log(requestBody.cellNumber);

        // Add CORS headers
        const headers = {
          'Access-Control-Allow-Origin': 'https://parklane-city.com', // Replace * with the appropriate domain
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json; charset=utf-8',
        };
  
        const result = await fetch('http://135.181.143.213:8097/ClientTransaction/IsUserAuthenticated?MobileNo=' + requestBody.cellNumber + '&AccessCode=' + requestBody.accessCode).then((res) => res.json());
        
        console.log(result.Status);

        if(result.Status){
          const result = await fetch('http://135.181.143.213:8097/ClientTransaction/GetSalesFromContactNo?MobileNo=' + requestBody.cellNumber).then((res) => res.json());
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result),
          };

        } else {
          // Return a success response
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ error: 'Invalid auth Not Verified.' }),
          };
        }
        
        
  
        
      } catch (error) {
        // Return an error response if there was an issue processing the request
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Failed to process POST request' }),
        };
      }
    }
  };