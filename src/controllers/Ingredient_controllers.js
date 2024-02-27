const knex = require("../database/knex");

class IngredientControllers{
    async index(request, response){
        const id = request.user.id;

        const ingredients = await knex("ingredient")
        return response.json(ingredients);
    }

    async delete(request, response){
        const { id } = request.params;

        await knex("ingredient").where({id}).delete();

        return response.json();
    }
}

module.exports = IngredientControllers;
