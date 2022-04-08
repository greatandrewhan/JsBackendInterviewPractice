const router = require("express").Router();
const controller = require("./sciences.controller");

// some helper middleware
const bodyHasNameProperty = (req, res, next) => {
  const { name } = req.body;

  if (name) {
    return next();
  }
  next({
    status: 400,
    message: "A 'name' property is required",
  });
};

const scienceExists = (req, res, next) => {
  const { scienceId } = req.params;
  const knex = req.app.get("db");
  knex
    .table("sciences")
    .where({ id: scienceId })
    .first()
    .then((science) => {
      if (science) {
        return next();
      }
      next({
        status: 404,
        message: `Science id not found: ${scienceId}`,
      });
    });
};

// some routes
router.route("/").get((req, res) => {
  const knex = req.app.get("db");
  return knex
    .from("sciences")
    .then((sciences) => (sciences ? res.json(sciences) : res.sendStatus(404)))
    .catch((err) => res.sendStatus(500));
});

router
  .route("/:scienceId")
  .patch(scienceExists, bodyHasNameProperty, (req, res) => {
    const { scienceId } = req.params;
    const knex = req.app.get("db");
    const { name } = req.body;

    knex
      .table("sciences")
      .update({ name }, ["id", "name", "description"])
      .where({ id: scienceId })
      .then((data) => res.json(data))
      .catch((err) => res.sendStatus(500));
  });

router.route("/:scienceId/scientists").get(scienceExists, (req, res) => {
  const { scienceId } = req.params;
  const knex = req.app.get("db");

  return knex
    .from("scientists")
    .where({ science: scienceId })
    .then((scientists) =>
      scientists ? res.json(scientists) : res.sendStatus(404)
    )
    .catch((err) => res.sendStatus(500));
});

module.exports = router;
