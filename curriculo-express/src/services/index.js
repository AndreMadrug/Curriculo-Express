import models from "../models/index.js";
import { crudService } from "./crudService.js";

export const pessoaService = crudService(models.Pessoa);
export const formacaoService = crudService(models.Formacao);
export const experienciaService = crudService(models.Experiencia);
export const projetoService = crudService(models.Projeto);
export const habilidadeService = crudService(models.Habilidade);
