import { AppError } from "../utils/index.js";

// Middleware global de erro (4 parâmetros), no mesmo formato do projeto do professor
export const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Algo deu errado no servidor";

  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 409;
    const field = err.errors?.[0]?.path;
    message = field
      ? `Já existe um registro com este valor de ${field}`
      : "Registro duplicado";
  } else if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  } else if (err.name === "SequelizeForeignKeyConstraintError") {
    statusCode = 400;
    message = "Referência inválida: a pessoa informada (pessoaId) não existe";
  } else if (err.name === "SequelizeDatabaseError") {
    statusCode = 400;
    message = "Valor inválido enviado ao banco de dados";
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    // erro inesperado: loga no servidor, nunca expõe ao cliente
    console.error("ERRO NÃO TRATADO:", err);
  }

  const response = {
    status: String(statusCode).startsWith("4") ? "fail" : "error",
    message,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};
