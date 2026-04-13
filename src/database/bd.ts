import Database from "better-sqlite3";
import path from "path";

// O arquivo banco.db vai ser criado na raiz do projeto
const dbPath = path.resolve(__dirname, "../../banco.db");

const db = new Database(dbPath);

// Garante que as tabelas existam ao iniciar o servidor
db.exec(`
  CREATE TABLE IF NOT EXISTS tarefas (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo    TEXT    NOT NULL,
    concluida INTEGER NOT NULL DEFAULT 0
  )
`);

export default db;