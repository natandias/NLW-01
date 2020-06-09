import express from "express";
import cors from "cors";
import routes from "./routes";
import { errors } from "celebrate";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(3333, () => {
  console.log("Running on port 3333");
});

// AULA 1 ------------------------------------------------------
// Rota: Endereço da requisição
// Recurso: Qual entidade estamos acessando

// Tipos de requisições
// GET: Buscar informações
// POST: Criar novas informações
// PUT: Atualizar uma informação existente
// DELETE: Remover uma informação

// Req Param: parametros que vem na rota apos o : (users/:id)
// Query Param: parametros opcionais para filtros, paginacao
// Req Body: parametros passados fora da rota (dentro req)

/*
const users = ["Diego", "Cleiton", "Robson", "Daniel"];

app.get("/users", (req, res) => {
  console.log("Get on /users");

  const search = String(req.query.search);
  const filteredUsers = search ? users.filter(user =>
    user.includes(search)) : users;
  
  return res.json(filteredUsers);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  return res.json(users[Number(id)]);
});

app.post("/users", (req, res) => {
  console.log("Post on /users");
  const { name, email } = req.body;
  const user = {
    name,
    email,
  };

  return res.json(user);
});
*/
