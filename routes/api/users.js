const express = require("express");
const ctrl = require("../../controllers/usersControllers");

const router = express.Router();

const { isValidId, autenticate } = require("../../middlewares");
// const { schemas } = require("../../models/user");

router.get("/", autenticate, ctrl.getAllUsers);
router.get("/:id", autenticate, isValidId, ctrl.getById);

module.exports = router;
