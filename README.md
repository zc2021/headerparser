# [Request Header Parser Microservice](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/request-header-parser-microservice)

API serving request headers back as strings in JSON object; `whoami` endpoint and front end based on freeCodeCamp.org Backend API test suite/boilerplate code.

## Design
The main application server is located in `server.js`, which `require`s HTTP API endpoints in `/route/endpoints.js` as `appRouter`.

`server` is responsible for basic security (`helmet`) and implements `cluster` for simple concurrency support in Heroku deployment. 

`endpoints` exports the below endpoints, using Express' `req` object data to retrieve request headers.

Endpoint | Response
-|-
`/api/all` | `name : value` for all request headers
`api/:headername` | `name : value` if header set[*]
`api/whoami` | `{ ipaddress : value, language : accept-language, software : user-agent }`

[*] `error: message` response on failure
## Stack
Layer | Technology
-|-
Front End | HTML / CSS
Application Framework | Express
Server | Node.js
Database | N/A (none)
