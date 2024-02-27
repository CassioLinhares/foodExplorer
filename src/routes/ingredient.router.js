const Router = require("express");
const ingredientRouter = Router();

const IngredientControllers = require("../controllers/Ingredient_controllers");
const ingredientControllers = new IngredientControllers();

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

ingredientRouter.use(ensureAuthenticated)

ingredientRouter.get("/", ingredientControllers.index);
ingredientRouter.delete("/:id", ingredientControllers.delete);

module.exports = ingredientRouter;