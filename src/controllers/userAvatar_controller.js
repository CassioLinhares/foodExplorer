const knex = require("../database/knex");
const AppError = require("../utils/appError");
const DiskStorage = require("../providers/diskStorage");

class UserAvatarController {
    async update(request, response) {
        const user_id = request.user.id;
        const avatarFileName = request.file.filename;

        const user = await knex("users").where({ id: user_id }).first();

        const diskStorage = new DiskStorage();

        if (!user) {
            throw new AppError("Unauthenticated user", 401);
        }

        if (user.avatar) {
            await diskStorage.deleteFile(user.avatar);
        }

        user.avatar = await diskStorage.saveFile(avatarFileName);
        await knex("users").update(user).where("id", user_id);
        return response.json(user);
    }
}

module.exports = UserAvatarController;