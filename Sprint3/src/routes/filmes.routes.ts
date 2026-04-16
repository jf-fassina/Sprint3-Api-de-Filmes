import { Router } from "express";

import {
    listar,
    buscarPorId,
    criar,
    atualizar,
    remover,
} from "../controllers/filmes.controller";

import { validarFilme } from "../middlewares/validarFilme";

const router = Router();

router.get("/", listar);

router.get("/:id", buscarPorId);

router.post(
    "/",
    validarFilme,
    criar
);

router.put(
    "/:id",
    validarFilme,
    atualizar
);

router.delete("/:id", remover);

export default router;

//inverter routes e controller