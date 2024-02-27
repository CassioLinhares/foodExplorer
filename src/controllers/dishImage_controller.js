const knex = require("../database/knex");
const AppError = require("../utils/appError");
const DiskStorage = require("../providers/diskStorage");

class DishImageController {
    async update(request, response) {
        const { id } = request.params;
        const imageFilename = request.file?.filename;

        const dishImg = await knex("dish").where({ id: id }).first();

        const diskStorage = new DiskStorage();

        if (!dishImg) {
            throw new AppError("Dish not found", 400);
        }

        if (dishImg.image) {
            await diskStorage.deleteFile(dishImg.image);
        }

        const filename = await diskStorage.saveFile(imageFilename);

        dishImg.image = filename;

        await knex("dish").update({ image: dishImg.image }).where({ id });

        return response.json(dishImg);
    }
}

module.exports = DishImageController;
