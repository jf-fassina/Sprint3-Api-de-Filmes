import { Router } from "express";

import {
    criarReview,
    listarReviewsDoFilme,
    atualizarReview,
    removerReview,
} from "../controllers/reviews.controller";

import { validarReview } from "../middlewares/validarReview";

const router = Router();

router.post(
    "/filmes/:id/reviews",
    validarReview,
    criarReview
);

router.get(
    "/filmes/:id/reviews",
    listarReviewsDoFilme
);

router.put(
    "/reviews/:id",
    validarReview,
    atualizarReview
);

router.delete(
    "/reviews/:id",
    removerReview
);

export default router;