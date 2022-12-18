const express = require("express"); // Import express

const userController = require("./controllers/userController.js"); // Import the user controller functions
const lockController = require("./controllers/lockController.js"); // Import the lock controller functions
const luController = require("./controllers/LUController.js"); // Import the lock user relationship controller functions
const webSocketController = require("./controllers/webSocketController"); // Import the webSocket controller

// Utilize express router
const router = express.Router();

// Import authentication middleware for JWT decoding
const auth = require("./middlewares/auth.js");

// Create a route for registering users
router.post("/users/register", userController.register);

// Create a route for logging in users
router.post("/users/login", userController.login);

// Get Dashboard
router.get("/dashboard", auth.verify, userController.dashboard);

// Get all Locks
router.get("/getLockUsers", auth.verify, userController.getAllUsersFromLock);

// Create a route for creating locks
router.post("/locks/create", auth.verify, lockController.createLock);

// Update the lock name
router.post("/locks/update", auth.verify, luController.changeLockName);

// Remove Lock and dependencies
router.post("locks/remove", auth.verify, luController.removeLock);

// Open or close Lock
router.post(
	"/locks/lockControl",
	auth.verify,
	lockController.lockControl,
	webSocketController.handleAskLockTo
);

// Create a route to correlate users and locks
router.post(
	"/usersLocks/updateLock",
	auth.verify,
	luController.addToLockHistory
);

// Create a route to correlate users and locks
router.post(
	"/usersLocks/removeLock",
	auth.verify,
	luController.removeFromLockHistory
);

module.exports = router;
