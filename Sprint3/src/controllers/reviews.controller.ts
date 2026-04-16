import { Request, Response } from "express";
import {
    reviews,
} from "../data/database";

export const criarReview = (
    req: Request,
    res: Response
) => {
    const filmeId = Number(req.params.id);

    const { comentario, nota } = req.body;

    const novaReview = {
        id: reviews.length+1,
        filmeId,
        comentario,
        nota,
    };

    reviews.push(novaReview);

    res.status(201).json(novaReview);
};

export const listarReviewsDoFilme = (
    req: Request,
    res: Response
) => {
    const filmeId = Number(req.params.id);

    const resultado = reviews.filter(
        (r) => r.filmeId === filmeId
    );

    res.json(resultado);
};

export const atualizarReview = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);

    const review = reviews.find(
        (r) => r.id === id
    );

    if (!review) {
        return res.status(404).json({
            erro: "Review não encontrada",
        });
    }

    const { comentario, nota } = req.body;

    review.comentario = comentario;
    review.nota = nota;

    res.json(review);
};

export const removerReview = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);

    const index = reviews.findIndex(
        (r) => r.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            erro: "Review não encontrada",
        });
    }

    reviews.splice(index, 1);

    res.json({
        mensagem: "Review removida",
    });
};