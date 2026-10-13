import models from "../models/index.js";
import {
  pessoaService,
  formacaoService,
  experienciaService,
  projetoService,
  habilidadeService,
} from "../services/index.js";
import { AppError } from "../utils/index.js";
import { crudController } from "./crudController.js";

const base = crudController(pessoaService, "Pessoa");

// Retorna a pessoa ou lança 404
const buscarPessoa = async (id) => {
  const pessoa = await pessoaService.findById(id);
  if (!pessoa) throw new AppError("Pessoa não encontrada", 404);
  return pessoa;
};

// Currículo completo de uma pessoa
const getCurriculo = async (req, res) => {
  const pessoa = await models.Pessoa.findByPk(req.params.id, {
    include: [
      { model: models.Formacao, as: "formacoes" },
      { model: models.Experiencia, as: "experiencias" },
      { model: models.Projeto, as: "projetos" },
      { model: models.Habilidade, as: "habilidades", through: { attributes: [] } },
    ],
    order: [
      [{ model: models.Formacao, as: "formacoes" }, "dataInicio", "DESC"],
      [{ model: models.Experiencia, as: "experiencias" }, "dataInicio", "DESC"],
    ],
  });
  if (!pessoa) throw new AppError("Pessoa não encontrada", 404);
  return res.status(200).send(pessoa);
};

// Relacionamento 1:N (formações, experiências, projetos de uma pessoa)
const filhas = (service) => ({
  list: async (req, res) => {
    await buscarPessoa(req.params.id);
    return res.status(200).send(await service.findAll({ where: { pessoaId: req.params.id } }));
  },
  create: async (req, res) => {
    await buscarPessoa(req.params.id);
    const { id, ...data } = req.body ?? {};
    return res.status(201).send(await service.create({ ...data, pessoaId: req.params.id }));
  },
});

// Relacionamento N:N (habilidades de uma pessoa)
const listarHabilidades = async (req, res) => {
  const pessoa = await buscarPessoa(req.params.id);
  return res.status(200).send(await pessoa.getHabilidades({ joinTableAttributes: [] }));
};

const vincularHabilidade = async (req, res) => {
  const pessoa = await buscarPessoa(req.params.id);
  const habilidade = await habilidadeService.findById(req.params.habilidadeId);
  if (!habilidade) throw new AppError("Habilidade não encontrada", 404);
  await pessoa.addHabilidade(habilidade);
  return res
    .status(201)
    .send({ mensagem: "Habilidade vinculada", pessoaId: pessoa.id, habilidadeId: habilidade.id });
};

const desvincularHabilidade = async (req, res) => {
  const pessoa = await buscarPessoa(req.params.id);
  await pessoa.removeHabilidade(req.params.habilidadeId);
  return res.status(204).send();
};

export const pessoaController = {
  ...base,
  getCurriculo,
  formacoes: filhas(formacaoService),
  experiencias: filhas(experienciaService),
  projetos: filhas(projetoService),
  listarHabilidades,
  vincularHabilidade,
  desvincularHabilidade,
};
