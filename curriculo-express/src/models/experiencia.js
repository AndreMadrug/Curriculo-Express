const getExperienciaModel = (sequelize, { DataTypes }) => {
  const Experiencia = sequelize.define("experiencia", {
    empresa: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    cargo: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    descricao: { type: DataTypes.TEXT },
    dataInicio: { type: DataTypes.DATEONLY },
    dataFim: { type: DataTypes.DATEONLY },
  });

  Experiencia.associate = (models) => {
    Experiencia.belongsTo(models.Pessoa, { as: "pessoa", foreignKey: { name: "pessoaId", allowNull: false } });
  };

  return Experiencia;
};

export default getExperienciaModel;
