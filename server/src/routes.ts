import express from "express";
import path from "path";
import PointsController from "./controllers/PointsControllers";
import ItemsController from "./controllers/itemsControllers";
import multer from "multer";
import multerConfig from "./config/multer";
import { celebrate, Joi } from "celebrate";

const pointsController = new PointsController();
const itemsController = new ItemsController();

const routes = express.Router();
const upload = multer(multerConfig);

// Raiz
routes.get("/", (req, res) => {
  return res.json({
    msg: "Página Inicial",
  });
});

// Rota estática para disponibilizar imagens
routes.use(
  "/uploads",
  express.static(path.resolve(__dirname, "..", "uploads"))
);

routes.get("/items", itemsController.index);

routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

routes.post(
  "/points",
  upload.single("image"),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),
  pointsController.create
);

// Padrões para funções de controllers
// index: listagem
// show: exibir unico registro
// create
// update
// delete ou destroy

export default routes;
