import { Request, Response } from "express";
import Knex from "knex";
import * as knexfile from "../database/knexfile";

const knex = Knex(knexfile.development);

class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex("items").select("*");

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.1.100:3333/uploads/${item.image}`,
      };
    });

    return res.json(serializedItems);
  }
}

export default ItemsController;
