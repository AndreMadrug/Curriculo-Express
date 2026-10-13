import Sequelize from "sequelize";
import pg from "pg";

import getPessoaModel from "./pessoa.js";
import getFormacaoModel from "./formacao.js";
import getExperienciaModel from "./experiencia.js";
import getProjetoModel from "./projeto.js";
import getHabilidadeModel from "./habilidade.js";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
});

const models = {
  Pessoa: getPessoaModel(sequelize, Sequelize),
  Formacao: getFormacaoModel(sequelize, Sequelize),
  Experiencia: getExperienciaModel(sequelize, Sequelize),
  Projeto: getProjetoModel(sequelize, Sequelize),
  Habilidade: getHabilidadeModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
