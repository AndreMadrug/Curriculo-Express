import {
  formacaoService,
  experienciaService,
  projetoService,
  habilidadeService,
} from "../services/index.js";
import { crudController } from "./crudController.js";

export { pessoaController } from "./pessoaController.js";
export const formacaoController = crudController(formacaoService, "Formação");
export const experienciaController = crudController(experienciaService, "Experiência");
export const projetoController = crudController(projetoService, "Projeto");
export const habilidadeController = crudController(habilidadeService, "Habilidade");
