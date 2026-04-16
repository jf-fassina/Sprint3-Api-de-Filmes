import express from "express";

import filmesRoutes from "./routes/filmes.routes";
import reviewsRoutes from "./routes/reviews.routes";

const app = express();

app.use(express.json());

app.use("/filmes", filmesRoutes);

app.use("/", reviewsRoutes);

app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});