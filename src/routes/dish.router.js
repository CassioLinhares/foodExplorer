const Router = require("express");
const multer = require("multer");
const uploadConfig = require("../config/upload");

const DishController = require("../controllers/dish_controllers");
const DishImageController = require("../controllers/dishImage_controller");

const dishController = new DishController();
const dishImageController = new DishImageController();

const dishRouter = Router();
const upload = multer(uploadConfig.MULTER);

const ensureAuthenticated = require("../middleware/ensureAuthenticated");
dishRouter.use(ensureAuthenticated);

dishRouter.get("/", dishController.index);
dishRouter.get("/:id", dishController.show);
dishRouter.post("/", upload.single("image"), dishController.create);
dishRouter.put("/:id", dishController.update);
dishRouter.delete("/:id", dishController.delete);
dishRouter.patch("/:id/image", upload.single("image"), dishImageController.update);

module.exports = dishRouter;