const getProjetoModel = (sequelize, { DataTypes }) => {
  const Projeto = sequelize.define("projeto", {
    nome: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    descricao: { type: DataTypes.TEXT },
    link: { type: DataTypes.STRING },
  });

  Projeto.associate = (models) => {
    Projeto.belongsTo(models.Pessoa, { as: "pessoa", foreignKey: { name: "pessoaId", allowNull: false } });
  };

  return Projeto;
};

export default getProjetoModel;
