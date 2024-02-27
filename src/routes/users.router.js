const Router = require("express");
const multer = require("multer");
const uploadConfig = require("../config/upload");

const UserController = require("../controllers/users_controllers");
const UserAvatarController = require("../controllers/userAvatar_controller");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const userRouter = Router();
const upload = multer(uploadConfig.MULTER); //middleware of multer

const userController = new UserController();
const userAvatarController = new UserAvatarController();

userRouter.post("/", userController.create);
userRouter.put("/", ensureAuthenticated, userController.update);
userRouter.delete("/", ensureAuthenticated, userController.delete);
userRouter.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = userRouter;