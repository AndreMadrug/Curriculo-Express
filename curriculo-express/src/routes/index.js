import {
  formacaoController,
  experienciaController,
  projetoController,
  habilidadeController,
} from "../controllers/index.js";
import { crudRouter } from "./crudRouter.js";

export { pessoaRouter } from "./pessoa.js";
export const formacaoRouter = crudRouter(formacaoController);
export const experienciaRouter = crudRouter(experienciaController);
export const projetoRouter = crudRouter(projetoController);
export const habilidadeRouter = crudRouter(habilidadeController);
