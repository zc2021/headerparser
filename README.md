# [Request Header Parser Microservice](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/request-header-parser-microservice)

API serving request headers back as strings in JSON object; `whoami` endpoint and front end based on freeCodeCamp.org Backend API test suite/boilerplate code.

## Design
The main application server is located in `server.js`, which `require`s HTTP API endpoints in `/route/endpoints.js` as `appRouter`.

`server.js` uses Node.js module `cluster` for simple concurrency support, as recommended in Heroku deployment best practices. This allows the application to process multiple requests simulatenously.
On application startup, the main process creates a worker pool with `cluster.fork()` until the number of forked processes reaches the `WEB_CONCURRENCY` limit. Should a worker process die, its identifier is logged and another worker is forked.

Each worker process instantiates its own `express()` application as `app`, and all workers listen on the same port. All workers `app.use(...)` the same middleware chain:
Middleware | Function
-|-
`appRouter` | path router, see below
`static` | serve static assets from `/public` (used for stylesheet)
`cors` | cross-origin resource sharing support
`helmet` | basic security

Worker maximum (`WEB_CONCURRENCY`) and listening port (`PORT`) are configurable through environment variables. `dotenv` is required in development for `.env` support. `development` is defined in the application as any non-production environment.

`endpoints` exports a router with the below endpoints, using Express' `req` object data to retrieve request headers.

Endpoint | Response
-|-
`/api/all` | `{ name : value }` for all request headers
`api/:headername` | `{ name : value }` if header set<br>`{ error: message }` response on failure
`api/whoami` | `{ ipaddress : value, language : accept-language, software : user-agent }`

Note that `app.get('/', ...)` is called to serve the browser interface directly from the worker process in `server.js` (`'/'` is not a path in `appRouter`). 

Relevant header values are temporarily stored in local constants per route and request. The body object is generated from stored values and sent with status code to the client via Express' native status and JSON handlers (`res.status(stat).json(body)`).

All request-specific objects used by the router are scoped to the route callback function, and should be fully dereferenced/ready for collection once the response has been served.

## Stack
Layer | Technology
-|-
Front End | HTML / CSS (project boilerplate)
Application Framework | Express
Server | Node.js
Database | N/A (none)
