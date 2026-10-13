const getPessoaModel = (sequelize, { DataTypes }) => {
  const Pessoa = sequelize.define("pessoa", {
    nome: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true, isEmail: true },
    },
    telefone: { type: DataTypes.STRING },
    cidade: { type: DataTypes.STRING },
    resumo: { type: DataTypes.TEXT },
  });

  Pessoa.associate = (models) => {
    Pessoa.hasMany(models.Formacao, { as: "formacoes", foreignKey: { name: "pessoaId", allowNull: false }, onDelete: "CASCADE" });
    Pessoa.hasMany(models.Experiencia, { as: "experiencias", foreignKey: { name: "pessoaId", allowNull: false }, onDelete: "CASCADE" });
    Pessoa.hasMany(models.Projeto, { as: "projetos", foreignKey: { name: "pessoaId", allowNull: false }, onDelete: "CASCADE" });
    Pessoa.belongsToMany(models.Habilidade, {
      as: "habilidades",
      through: "pessoa_habilidades",
      foreignKey: "pessoaId",
      otherKey: "habilidadeId",
    });
  };

  return Pessoa;
};

export default getPessoaModel;
