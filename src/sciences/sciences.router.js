const router = require("express").Router();
const controller = require("./sciences.controller");

// some routes
router.route("/").get(controller.read);

router.route("/:scienceId").patch(controller.patch);

router.route("/:scienceId/scientists").get(controller.scientistRead);

router.router("/sciences").create(controller.post);

router.router("/sciences/:scienceId").get(controller.getScience);

module.exports = router;
