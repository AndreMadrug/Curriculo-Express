// Cadastra dois currículos de exemplo (troque pelos dados reais, se quiser)
export const createCurriculos = async (models) => {
  const nomesHabilidades = [
    ["JavaScript", "Avançado"],
    ["Node.js", "Intermediário"],
    ["SQL", "Intermediário"],
    ["Git", "Intermediário"],
    ["Figma", "Avançado"],
    ["Comunicação", "Avançado"],
  ];
  const hab = {};
  for (const [nome, nivel] of nomesHabilidades) {
    hab[nome] = await models.Habilidade.create({ nome, nivel });
  }

  const ana = await models.Pessoa.create({
    nome: "Ana Beatriz Souza",
    email: "ana.souza@email.com",
    telefone: "(81) 99999-0001",
    cidade: "Recife - PE",
    resumo: "Desenvolvedora back-end com foco em APIs REST e bancos relacionais.",
  });
  await models.Formacao.bulkCreate([
    { pessoaId: ana.id, instituicao: "UNICAP", curso: "Ciência da Computação", nivel: "Graduação", dataInicio: "2023-02-01" },
    { pessoaId: ana.id, instituicao: "Escola Técnica Estadual", curso: "Técnico em Informática", nivel: "Ensino Técnico", dataInicio: "2020-02-01", dataFim: "2022-12-15" },
  ]);
  await models.Experiencia.bulkCreate([
    { pessoaId: ana.id, empresa: "Tech Recife", cargo: "Estagiária de Desenvolvimento", descricao: "Desenvolvimento de APIs em Node.js e consultas SQL.", dataInicio: "2025-03-01" },
    { pessoaId: ana.id, empresa: "Startup Local", cargo: "Desenvolvedora Júnior (freelancer)", descricao: "Sites e integrações para pequenos clientes.", dataInicio: "2024-01-01", dataFim: "2025-02-28" },
  ]);
  await models.Projeto.bulkCreate([
    { pessoaId: ana.id, nome: "API de Currículo", descricao: "API REST com Express e PostgreSQL.", link: "https://github.com/exemplo/curriculo-express" },
    { pessoaId: ana.id, nome: "Jogo de Dados", descricao: "Jogo em Next.js para 2 jogadores.", link: "https://github.com/exemplo/jogo-dados" },
  ]);
  await ana.addHabilidades([hab["JavaScript"], hab["Node.js"], hab["SQL"], hab["Git"]]);

  const carlos = await models.Pessoa.create({
    nome: "Carlos Eduardo Lima",
    email: "carlos.lima@email.com",
    telefone: "(81) 99999-0002",
    cidade: "Olinda - PE",
    resumo: "Designer de produto digital com experiência em prototipação e pesquisa com usuários.",
  });
  await models.Formacao.bulkCreate([
    { pessoaId: carlos.id, instituicao: "UFPE", curso: "Design", nivel: "Graduação", dataInicio: "2019-02-01", dataFim: "2023-12-20" },
  ]);
  await models.Experiencia.bulkCreate([
    { pessoaId: carlos.id, empresa: "Agência Criativa", cargo: "Designer de Produto", descricao: "Design de interfaces para apps mobile e web.", dataInicio: "2024-02-01" },
    { pessoaId: carlos.id, empresa: "Estúdio Pixel", cargo: "Estagiário de Design", descricao: "Identidade visual e protótipos no Figma.", dataInicio: "2022-06-01", dataFim: "2023-12-31" },
  ]);
  await models.Projeto.bulkCreate([
    { pessoaId: carlos.id, nome: "Redesign de App de Delivery", descricao: "Estudo de caso de UX/UI.", link: "https://behance.net/exemplo" },
  ]);
  await carlos.addHabilidades([hab["Figma"], hab["Comunicação"], hab["Git"]]);
};

