import { Request, Response, NextFunction } from "express";

export const validarFilme = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        titulo,
        descricao,
        diretor,
        ano,
        genero,
    } = req.body;

    if (!titulo) {
        return res.status(400).json({
            erro: "titulo é obrigatório",
        });
    }

    if (!descricao) {
        return res.status(400).json({
            erro: "descricao é obrigatória",
        });
    }

    if (!diretor) {
        return res.status(400).json({
            erro: "diretor é obrigatório",
        });
    }

    if (!ano) {
        return res.status(400).json({
            erro: "ano é obrigatório",
        });
    }

    if (!genero) {
        return res.status(400).json({
            erro: "genero é obrigatório",
        });
    }

    next();
};