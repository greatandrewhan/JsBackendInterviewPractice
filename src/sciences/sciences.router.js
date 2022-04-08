const router = require("express").Router();
const controller = require("./sciences.controller");

// some routes
router.route("/").get(controller.read);

router.route("/:scienceId").patch(controller.patch);

router.route("/:scienceId/scientists").get(controller.scientistRead);

module.exports = router;
