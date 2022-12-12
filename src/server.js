const express = require("express");
const cors = require("cors");
const http = require("http");
const ws = require("ws");
const routes = require("./routes");
const bodyParser = require("body-parser"); //BodyParser for JWT Authentication

const app = express();

// Use the CORS middleware to allow requests from any origin
app.use(cors());

// Use the express.json middleware to parse JSON in the request body
app.use(express.json());

// Use the user router to handle routes starting with '/users'
app.use(routes);

// Use the body parser json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create the HTTP server using the Express app
const server = http.createServer(app);

// Create a WebSocket server on the HTTP server
const wss = new ws.Server({ server });

// When a client connects, log a message
wss.on("connection", (ws) => {
	console.log("Client connected");
});

// Start the server on port 3000
server.listen(3000, () => {
	console.log("Server is listening on port 3000");
});
