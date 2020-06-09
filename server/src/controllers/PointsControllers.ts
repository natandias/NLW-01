import { Request, Response } from "express";
import Knex from "knex";
import * as knexfile from "../database/knexfile";

const knex = Knex(knexfile.development);

class PointsController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .where("city", String(city))
      .andWhere("uf", String(uf))
      .whereIn("point_items.item_id", parsedItems)
      .distinct()
      .select("points.*");

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `http://192.168.1.100:3333/uploads/${point.image}`,
      };
    });

    /* const itemsFromPoint = [];
    let count = 0;
    for (let point of points) {
      let items = await knex("point_items")
        .where("point_items.point_id", point.id)
        .select("point_items.item_id");
      itemsFromPoint[count] = items;
      count += 1;
    }

    let ponto = [];
    for (let i = 0; i < points.length; i++) {
      let pointItem = [];
      for (let k of itemsFromPoint[i]) {
        pointItem.push(k.item_id);
      }
      ponto[i] = Object.assign(points[i], { items: [...pointItem] });
    } */
    //console.log(itemsFromPoint)
    return res.json(serializedPoints);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return res.status(400).json({ message: "Point not found" });
    }

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.1.100:3333/uploads/${point.image}`,
    };

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.id", "items.title");
    return res.json({ point: serializedPoint, items });
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    if (
      !name ||
      name === "" ||
      !email ||
      email == "" ||
      !whatsapp ||
      whatsapp === "" ||
      !latitude ||
      latitude === "" ||
      !longitude ||
      longitude === "" ||
      !city ||
      city === "" ||
      !uf ||
      uf === "" ||
      !items ||
      items === []
    ) {
      return res.status(400).json({
        message: `Falha na inserção na tabela point_items,\
 verifique se os items informados são válidos`,
      });
    }

    const trx = await knex.transaction();

    try {
      const point = {
        image: req.file.filename,
        name,
        email,
        whatsapp,
        latitude: Number(latitude),
        longitude: Number(longitude),
        city,
        uf,
      };

      const insertedIds = await trx("points").insert(point);
      const point_id = insertedIds[0];

      const pointItems = items
        .split(",")
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
          return {
            item_id,
            point_id,
          };
        });

      await trx("point_items").insert(pointItems);

      await trx.commit();

      return res.json({ id: point_id, ...point });
    } catch (error) {
      await trx.rollback();

      return res.status(400).json({
        message:
          "Falha na inserção na tabela point_items \
          verifique se os items informados são válidos",
      });
    }
  }
}

export default PointsController;
