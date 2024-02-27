exports.up = knex => knex.schema.createTable("dish", table => {
    table.increments("id").primary();
    table.text("name").notNullable();
    table.text("description").notNullable();
    table.text("image").nullable();
    table.text("category").notNullable();
    table.decimal("price", 10, 2).notNullable();
    table.integer("user_id").references("id").inTable("users");//.OnDelete("CASCADE")
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTable("dish");
