import { Request, Response, NextFunction } from "express";

export const validarReview = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { comentario, nota } = req.body;

    if (!comentario) {
        return res.status(400).json({
            erro: "comentario é obrigatório",
        });
    }

    if (nota === undefined) {
        return res.status(400).json({
            erro: "nota é obrigatória",
        });
    }

    if (nota < 0 || nota > 5) {
        return res.status(400).json({
            erro: "nota deve ser entre 0 e 5",
        });
    }

    next();
};