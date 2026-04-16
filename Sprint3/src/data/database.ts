export type Filme = {
    id: number;
    titulo: string;
    descricao: string;
    diretor: string;
    ano: number;
    genero: string;
};

export type Review = {
    id: number;
    filmeId: number;
    comentario: string;
    nota: number;
};

/* FILMES */

export let filmes: Filme[] = [];

/* REVIEWS */

export let reviews: Review[] = [];