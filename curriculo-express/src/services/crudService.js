// Serviço genérico de CRUD para qualquer model do Sequelize
export const crudService = (Model) => ({
  findAll: (options = {}) => Model.findAll({ order: [["id", "ASC"]], ...options }),
  findById: (id, options = {}) => Model.findByPk(id, options),
  create: (data) => Model.create(data),
  update: async (id, data) => {
    const item = await Model.findByPk(id);
    if (!item) return null;
    return item.update(data);
  },
  remove: (id) => Model.destroy({ where: { id } }),
});
