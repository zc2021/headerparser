# [Request Header Parser Microservice](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/request-header-parser-microservice)

API serving request headers back as strings in JSON object; `whoami` endpoint and front end based on freeCodeCamp.org Backend API test suite/boilerplate code.

## Design
The main application server is located in `server.js`, which `require`s HTTP API endpoints in `/route/endpoints.js` as `appRouter`.

`server` is responsible for basic security (`helmet`) and implements `cluster` for simple concurrency support in Heroku deployment. 

`endpoints` exports the below endpoints, using Express' `req` object data to retrieve request headers.

Endpoint | Response
-|-
`/api/all` | `{ name : value }` for all request headers
`api/:headername` | `{ name : value }` if header set<br>`{ error: message }` response on failure
`api/whoami` | `{ ipaddress : value, language : accept-language, software : user-agent }`

Relevant header values are temporarily stored in local constants per route and request. The body object is generated from stored values and sent with status code to the client via Express' native status and JSON handlers (`res.status(stat).json(body)`).

All request-specific objects used by the router are scoped to the route callback function, and should be fully dereferenced/ready for collection once the response has been served.

## Stack
Layer | Technology
-|-
Front End | HTML / CSS (project boilerplate)
Application Framework | Express
Server | Node.js
Database | N/A (none)
