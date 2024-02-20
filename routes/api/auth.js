const express = require("express");
const { validateBody, autenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/authControllers");

const router = express.Router();

router.post("/register", validateBody(schemas.registrationSchema), ctrl.register);
router.get("/verify/:verificationCode", ctrl.verifyEmail);
router.post("/verify", validateBody(schemas.verifySchema), ctrl.resentVerifyEmail);
router.post(
  "/verify/changePassword",
  validateBody(schemas.verifySchema),
  ctrl.changePasswordRequest
);
router.post(
  "/verify/changePassword/:changePasswordCode",
  validateBody(schemas.passwordChangingSchema),
  ctrl.passwordChanging
);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", autenticate, ctrl.current);
router.post("/logout", autenticate, ctrl.logout);
router.patch("/avatars", autenticate, upload.single("avatar"), ctrl.updtAvatar);
router.put(
  "/subscription",
  validateBody(schemas.changeSubscriptionSchema),
  ctrl.changeSubscription
);

module.exports = router;
