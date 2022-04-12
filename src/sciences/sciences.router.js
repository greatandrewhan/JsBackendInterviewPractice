const router = require("express").Router();
const controller = require("./sciences.controller");

// some routes
router.route("/").get(controller.read);

router.route("/:scienceId").update(controller.patch);

router.route("/:scienceId/scientists").get(controller.scientistRead);

router.router("/sciences").post(controller.create);

router.router("/sciences/:scienceId").get(controller.getScience);

module.exports = router;
