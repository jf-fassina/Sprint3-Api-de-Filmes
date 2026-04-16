import { Request, Response } from "express";
import {
    filmes,
} from "../data/database";

export const listar = (req: Request, res: Response) => {
    res.json(filmes);
};

export const buscarPorId = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            erro: "ID inválido",
        });
    }

    const filme = filmes.find(
        (f) => f.id === id
    );

    if (!filme) {
        return res.status(404).json({
            erro: "Filme não encontrado",
        });
    }

    res.json(filme);
};

export const criar = (req: Request, res: Response) => {
    const {
        titulo,
        descricao,
        diretor,
        ano,
        genero,
    } = req.body;

    if (
        !titulo ||
        !descricao ||
        !diretor ||
        !ano ||
        !genero
    ) {
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios",
        });
    }

    const novoFilme = {
        id: filmes.length + 1,
        titulo,
        descricao,
        diretor,
        ano,
        genero,
    };

    filmes.push(novoFilme);

    res.status(201).json(novoFilme);
};

export const atualizar = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            erro: "ID inválido",
        });
    }

    const filme = filmes.find(
        (f) => f.id === id
    );

    if (!filme) {
        return res.status(404).json({
            erro: "Filme não encontrado",
        });
    }

    const {
        titulo,
        descricao,
        diretor,
        ano,
        genero,
    } = req.body;

    if (
        !titulo ||
        !descricao ||
        !diretor ||
        !ano ||
        !genero
    ) {
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios",
        });
    }

    filme.titulo = titulo;
    filme.descricao = descricao;
    filme.diretor = diretor;
    filme.ano = ano;
    filme.genero = genero;

    res.json(filme);
};

export const remover = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            erro: "ID inválido",
        });
    }

    const index = filmes.findIndex(
        (f) => f.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            erro: "Filme não encontrado",
        });
    }

    filmes.splice(index, 1);

    res.json({
        mensagem: "Filme removido",
    });
};