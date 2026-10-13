# Currículo Express

API REST (Express + Sequelize + PostgreSQL/Neon) para um app de currículo.

## Rodar local
1. `npm install`
2. Copie `.env.sample` para `.env` e preencha `DATABASE_URL` (Neon)
3. Primeira execução: `ERASE_DATABASE_ON_SYNC=true` (cria as tabelas e cadastra 2 currículos). Depois volte para `false`.
4. `npm run dev`

## Rotas
CRUD: `/pessoas`, `/formacoes`, `/experiencias`, `/projetos`, `/habilidades`
Relacionamentos:
- `GET /pessoas/:id/curriculo`
- `GET|POST /pessoas/:id/formacoes | experiencias | projetos`
- `GET /pessoas/:id/habilidades`
- `POST|DELETE /pessoas/:id/habilidades/:habilidadeId`
