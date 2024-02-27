const { Router } = require("express");
const routes = Router();

const usersRouter = require("./users.router");
const dishRouter = require("./dish.router");
const ingredientRouter = require("./ingredient.router");
const sessionsRouter = require("./sessions.router");

routes.use("/users", usersRouter);
routes.use("/dish", dishRouter);
routes.use("/ingredient", ingredientRouter);
routes.use("/sessions", sessionsRouter);

module.exports = routes;