const express = require("express");
const ctrl = require("../../controllers/messagesControllers");

const router = express.Router();

const { isValidId, autenticate } = require("../../middlewares");
// const { schemas } = require("../../models/user");

router.get("/", autenticate, ctrl.getAllMessages);
router.get("/:id", autenticate, isValidId, ctrl.getById);

module.exports = router;
