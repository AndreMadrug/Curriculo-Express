const getFormacaoModel = (sequelize, { DataTypes }) => {
  const Formacao = sequelize.define("formacao", {
    instituicao: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    curso: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    nivel: { type: DataTypes.STRING },
    dataInicio: { type: DataTypes.DATEONLY },
    dataFim: { type: DataTypes.DATEONLY },
  });

  Formacao.associate = (models) => {
    Formacao.belongsTo(models.Pessoa, { as: "pessoa", foreignKey: { name: "pessoaId", allowNull: false } });
  };

  return Formacao;
};

export default getFormacaoModel;
