const fetch = require('node-fetch');
const base64 = require('base64topdf');
const fs = require('fs');
const axios = require('axios');

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
          'Content-Type': 'application/json',
        };

        let date_time = new Date();

        let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

        let date = ("0" + date_time.getDate()).slice(-2);
        
        const data = { SaleID: event.queryStringParameters.SaleID, LocationID: event.queryStringParameters.LocationID, CompanyID: event.queryStringParameters.CompanyID, ToDate: date_time.getFullYear() + '-' + month + '-' + date, ReportType: 'Knock Wise', PartyID: event.queryStringParameters.PartyID};

        console.log(JSON.stringify(data));

        var base64Str;

        const result = await fetch('http://135.181.143.213:8097/ClientTransaction/PrintClientTransactionForWeb', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/octet-stream'
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              return response.status.toString()
          }
          console.log("oay opay");
          //console.log(response);
          return response.arrayBuffer()
          })
          .then((data) => {
            base64Str = Buffer.from(data).toString('base64');
                    //base64.base64Decode(base64Str, "fsd.pdf");
              console.log("hello there");

              
          })
          .catch((error) => {
            // Handle any errors
            console.error(error);
          });
        
        
          //const contents = fs.readFileSync('fsd.pdf', {encoding: 'base64'});
       

        
          // Return a success response
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({base64Str: base64Str}),
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