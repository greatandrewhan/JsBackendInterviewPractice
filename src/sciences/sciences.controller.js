// some helper middleware
function bodyHasNameProperty(req, res, next) {
  const { name } = req.body;

  if (name) {
    return next();
  }
  next({
    status: 400,
    message: "A 'name' property is required",
  });
}

function bodyHasDescriptionProperty(req, res, next) {
  const { description } = req.body;

  if (description) {
    return next();
  }
  next({
    status: 400,
    message: "A 'description' property is required",
  });
}

async function scienceExists(req, res, next) {
  const { scienceId } = req.params;
  const knex = await req.app.get("db");

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
}

async function read(req, res) {
  const knex = await req.app.get("db");
  return knex
    .from("sciences")
    .then((sciences) => (sciences ? res.json(sciences) : res.sendStatus(404)))
    .catch((err) => res.sendStatus(500));
}

async function patch(req, res) {
  const { scienceId } = req.params;
  const knex = await req.app.get("db");
  const { name } = req.body;

  knex
    .table("sciences")
    .update({ name }, ["id", "name", "description"])
    .where({ id: scienceId })
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
}

async function scientistRead(req, res) {
  const { scienceId } = req.params;
  const knex = await req.app.get("db");

  return knex
    .from("scientists")
    .where({ science: scienceId })
    .then((scientists) =>
      scientists ? res.json(scientists) : res.sendStatus(404)
    )
    .catch((err) => res.sendStatus(500));
}


function create(req, res, next) {
  const {name, description} = req.params;
  const knex = await req.app.get("db");

  return knex
    .table("sciences")
    .insert({ name, description}, ["id", "name", "description"])
    .then((data) => res.status(201).json(data))
    .catch((err) => res.sendStatus(500))
}

function getScience(req, res, next) {
  const { scienceId } = req.params;
  const knex = await req.app.get("db");

  return knex
    .table("sciences")
    .where({ id: scienceId })
    .then((science) =>
    science ? res.json(science) : res.sendStatus(404)
    )
    .catch((err) => res.sendStatus(500));
    
}


module.exports = {
  read: read,
  update: [scienceExists, bodyHasNameProperty, patch],
  scientistRead: [scienceExists, scientistRead],
  create: [bodyHasNameProperty, bodyHasDescriptionProperty, create],
  getScience: [getScience]
};
