import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { sequelize } from "./models/index.js";
import {
  pessoaRouter,
  formacaoRouter,
  experienciaRouter,
  projetoRouter,
  habilidadeRouter,
} from "./routes/index.js";
import { logger, errorHandler } from "./middlewares/index.js";
import { createCurriculos, AppError } from "./utils/index.js";

const app = express();

app.set("trust proxy", true);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// rotas
app.get("/", (req, res) => {
  return res.status(200).send("API de Currículo executando...");
});
app.use("/pessoas", pessoaRouter);
app.use("/formacoes", formacaoRouter);
app.use("/experiencias", experienciaRouter);
app.use("/projetos", projetoRouter);
app.use("/habilidades", habilidadeRouter);

app.use((req, res, next) => next(new AppError(`Rota ${req.originalUrl} não encontrada`, 404)));
app.use(errorHandler);

const port = process.env.PORT || 3000;

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    await createCurriculos(models);
  }
  app.listen(port, () => console.log(`API ouvindo na porta ${port}!`));
});


