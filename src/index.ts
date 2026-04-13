import express from "express";
import tarefasRoutes from "./routes/tarefas.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

// Registra as rotas com prefixo /tarefas
app.use("/tarefas", tarefasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});