const knex = require("../database/knex");
const AppError = require("../utils/appError");
const DiskStorage = require("../providers/diskStorage");

class DishController {

  async create(request, response) {
    const { name, description, category, price, ingredient } = request.body;
    const image = request.file.filename;
    const user_id = request.user.id;

    const existingDish = await knex("dish").where("name", name).first();

    if (existingDish) {
      throw new AppError("Prato já cadastrado. Escolha outro nome.");
    }

    const diskStorage = new DiskStorage();
    const filename = await diskStorage.saveFile(image);

    const ingredientsArray = JSON.parse(ingredient || '[]');

    const [dish_id] = await knex("dish").insert({
      name,
      price,
      user_id,
      category,
      description,
      image: filename,
    });

    const ingredientsInsert = ingredientsArray.map((name) => {
      return {
        name,
        dish_id,
        user_id,
      };
    });

    await knex("ingredient").insert(ingredientsInsert);

    return response.json();
  }

  async update(request, response) {
    const { name, description, category, price, ingredient } = request.body;
    const user_id = request.user.id;
    const { id } = request.params;

    const dishUpdate = {
      name: name ?? dish.name,
      description: description ?? dishes.description,
      category: category ?? dishes.category,
      price: price ?? dishes.price,
      updated_at: knex.fn.now(),
      created_at: user_id
    };

    if (ingredient) {
      await knex("ingredient").where({ dish_id: id }).delete();

      const ingredientsInsert = ingredient.map(name => {
        return {
          name,
          dish_id: id,
          user_id
        };
      });

      await knex("ingredient").insert(ingredientsInsert);
    }

    await knex("dish").where({ id }).update(dishUpdate);

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dishes = await knex("dish").where({ id }).first();
    const ingredients = await knex("ingredient").where({ dish_id: id }).orderBy("name");

    return response.json({
      ...dishes, ingredients
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("dish").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { search } = request.query;

    let dish;

    if (search) {
      const keywords = search.split(" ").map((keyword) => `%${keyword}%`);

      dish = await knex("dish")
        .select([
          "dish.id",
          "dish.name",
          "dish.description",
          "dish.category",
          "dish.price",
          "dish.image",
        ])
        .leftJoin("ingredient", "dish.id", "ingredient.dish_id")
        .where((check) => {
          check.where((check2) => {
            keywords.forEach((keyword) => {
              check2.orWhere("dish.name", "like", keyword);
              check2.orWhere("dish.description", "like", keyword);
            });
          });
          keywords.forEach((keyword) => {
            check.orWhere("ingredient.name", "like", keyword);
          });
        })
        .groupBy("dish.id")
        .orderBy("dish.name");
    } else {
      dish = await knex("dish")
        .select([
          "dish.id",
          "dish.name",
          "dish.description",
          "dish.category",
          "dish.price",
          "dish.image",
        ])
        .orderBy("dish.name");
    }

    const ingredient = await knex("ingredient");
    const dishWithIngredient = dish.map((dishes) => {
      const dishIngredients = ingredient.filter((ingredients) => ingredients.dish_id === dishes.id);

      return {
        ...dishes,
        ingredient: dishIngredients,
      };
    });

    return response.json(dishWithIngredient);
  }
}

module.exports = DishController;