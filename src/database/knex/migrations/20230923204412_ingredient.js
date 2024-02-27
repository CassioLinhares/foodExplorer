exports.up = knex => knex.schema.createTable("ingredient", table => {
    table.increments('id').primary();
    table.integer('dish_id').references('id').inTable('dish').onDelete('CASCADE');
    table.integer('user_id').references('id').inTable('users');
    table.text('name').notNullable();
});

exports.down = knex => knex.schema.dropTable("ingredient");
