import { pessoaController as c } from "../controllers/index.js";
import { crudRouter } from "./crudRouter.js";

const router = crudRouter(c);

router.get("/:id/curriculo", c.getCurriculo);

router.get("/:id/formacoes", c.formacoes.list);
router.post("/:id/formacoes", c.formacoes.create);
router.get("/:id/experiencias", c.experiencias.list);
router.post("/:id/experiencias", c.experiencias.create);
router.get("/:id/projetos", c.projetos.list);
router.post("/:id/projetos", c.projetos.create);

router.get("/:id/habilidades", c.listarHabilidades);
router.post("/:id/habilidades/:habilidadeId", c.vincularHabilidade);
router.delete("/:id/habilidades/:habilidadeId", c.desvincularHabilidade);

export const pessoaRouter = router;
