import { Request, Response } from "express";
import db from "../database/bd";

// Tipo que representa uma linha da tabela
interface Tarefa {
  id: number;
  titulo: string;
  concluida: number; // 0 ou 1 (SQLite não tem boolean)
}

// GET /tarefas
export function listar(req: Request, res: Response): void {
  const tarefas = db.prepare("SELECT * FROM tarefas").all();
  res.json(tarefas);
}

// GET /tarefas/:id
export function buscarPorId(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const tarefa = db.prepare("SELECT * FROM tarefas WHERE id = ?").get(id) as Tarefa | undefined;

  if (!tarefa) {
    res.status(404).json({ erro: "Tarefa não encontrada" });
    return;
  }

  res.json(tarefa);
}

// POST /tarefas
export function criar(req: Request, res: Response): void {
  const { titulo } = req.body;

  if (!titulo) {
    res.status(400).json({ erro: "Campo 'titulo' é obrigatório" });
    return;
  }

  const resultado = db
    .prepare("INSERT INTO tarefas (titulo) VALUES (?)")
    .run(titulo);

  // resultado.lastInsertRowid é o ID gerado automaticamente
  const nova = db
    .prepare("SELECT * FROM tarefas WHERE id = ?")
    .get(resultado.lastInsertRowid) as Tarefa;

  res.status(201).json(nova);
}

// PUT /tarefas/:id
export function atualizar(req: Request, res: Response): void {
  const id = Number(req.params.id);

  const tarefa = db
    .prepare("SELECT * FROM tarefas WHERE id = ?")
    .get(id) as Tarefa | undefined;

  if (!tarefa) {
    res.status(404).json({ erro: "Tarefa não encontrada" });
    return;
  }

  const { titulo, concluida } = req.body;

  // Usa o valor novo se vier no body, senão mantém o atual
  const novoTitulo    = titulo    !== undefined ? titulo    : tarefa.titulo;
  const novaConcluida = concluida !== undefined ? (concluida ? 1 : 0) : tarefa.concluida;

  db.prepare("UPDATE tarefas SET titulo = ?, concluida = ? WHERE id = ?")
    .run(novoTitulo, novaConcluida, id);

  const atualizada = db
    .prepare("SELECT * FROM tarefas WHERE id = ?")
    .get(id) as Tarefa;

  res.json(atualizada);
}

// DELETE /tarefas/:id
export function remover(req: Request, res: Response): void {
  const id = Number(req.params.id);

  const tarefa = db
    .prepare("SELECT * FROM tarefas WHERE id = ?")
    .get(id) as Tarefa | undefined;

  if (!tarefa) {
    res.status(404).json({ erro: "Tarefa não encontrada" });
    return;
  }

  db.prepare("DELETE FROM tarefas WHERE id = ?").run(id);
  res.status(204).send();
}