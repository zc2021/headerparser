# [Request Header Parser Microservice](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/request-header-parser-microservice)

API serving request headers back as strings in JSON object; `whoami` endpoint and front end based on freeCodeCamp.org Backend API test suite/boilerplate code.

Endpoint | Response
-|-
`/api/all` | `name : value` for all request headers
`api/:headername` | `name : value` if header set[*]
`api/whoami` | `{ ipaddress : value, language : accept-language, software : user-agent }`

[*] `error: message` response on failure

## REST

Constraint | Application
-|- 
Client-Server Architecture | Web service provides HTML page for browser-based interaction; client requests header values via HTTP GET, Node.js server responds with JSON object containing requested data.
Statelessness | All served information is retrieved from a client request via the Express framework's `req` object, which wraps a Node.js `http.IncomingMessage`.
Cacheability | There is no server-side caching currently implemented; JSON responses are easily cached client-side.
Layerability | 

## Stack
Layer | Technology
-|-
Front End | HTML / CSS
Application Framework | Express
Server | Node.js
Database | N/A (none)
