const knex = require("../database/knex");
const AppError = require("../utils/appError");
const { hash, compare } = require("bcryptjs");

class userController{
    
    async create(request, response){
        const {name, email, password} = request.body;
        const checkedUserExists = await knex("users").select("*").where("email", email);

        if(checkedUserExists.length > 0){
            throw new AppError('E-mail is in use!');
        }
        if(!name || !password){
            throw new AppError('Please, name and password fields are mandatory');
        }

        const hashedPassword = await hash(password, 8);

        await knex("users").insert({name, email, password:hashedPassword});

        return response.status(201).json();
    }

    async update(request, response){
        const { name, email, password, oldPassword } = request.body;
        const user_id = request.user.id;

        const user = await knex("users").where("id", user_id).first();

        if (!user || user.length === 0) {
            throw new AppError("This user does not exist!");
        }

        const userWithUpdateEmail = await knex("users").where("email", email).first();

        if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
            throw new AppError("Email is in use!");
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if (password && !oldPassword) {
            throw new AppError("Please, to update current password you need to inform the old password.");
        }

        if (password && oldPassword) {
            const checkOldPassword = await compare(oldPassword, user.password);
            if (!checkOldPassword) {
                throw new AppError("Your old password does not match!");
            }
            user.password = await hash(password, 8);
        }

        await knex("users")
        .update({name: user.name, email: user.email, password: user.password})
        .where("id", user_id);
        
        return response.json();
    }

    async delete(request, response){
        const user_id = request.user.id;  
        
        await knex("users").where("id", user_id).delete();

        return response.json();
    }
    
}

module.exports = userController;