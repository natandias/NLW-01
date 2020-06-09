import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable("point_items", (table) => {
        table.increments("id").primary();
        table.integer("point_id").notNullable;
        table.integer("item_id").notNullable;

        table.foreign("point_id").references("points.id");
        table.foreign("item_id").references("items.id");
      });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable("point_items");
}

