const getHabilidadeModel = (sequelize, { DataTypes }) => {
  const Habilidade = sequelize.define("habilidade", {
    nome: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { notEmpty: true } },
    nivel: { type: DataTypes.STRING },
  });

  Habilidade.associate = (models) => {
    Habilidade.belongsToMany(models.Pessoa, {
      as: "pessoas",
      through: "pessoa_habilidades",
      foreignKey: "habilidadeId",
      otherKey: "pessoaId",
    });
  };

  return Habilidade;
};

export default getHabilidadeModel;
