import { AppError } from "../utils/index.js";

// Controller genérico: GET (todos / por id), POST, PUT e DELETE
export const crudController = (service, nome) => ({
  getAll: async (req, res) => {
    return res.status(200).send(await service.findAll());
  },

  getById: async (req, res) => {
    const item = await service.findById(req.params.id);
    if (!item) throw new AppError(`${nome} não encontrado(a)`, 404);
    return res.status(200).send(item);
  },

  create: async (req, res) => {
    const { id, ...data } = req.body ?? {};
    return res.status(201).send(await service.create(data));
  },

  update: async (req, res) => {
    const { id, ...data } = req.body ?? {};
    const item = await service.update(req.params.id, data);
    if (!item) throw new AppError(`${nome} não encontrado(a)`, 404);
    return res.status(200).send(item);
  },

  remove: async (req, res) => {
    const removidos = await service.remove(req.params.id);
    if (!removidos) throw new AppError(`${nome} não encontrado(a)`, 404);
    return res.status(204).send();
  },
});
