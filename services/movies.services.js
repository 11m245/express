import { client } from "../index.js";

export async function getMovies(request) {
    return await client.db("b40wd").collection("movies").find(request.query).toArray();
}
export async function updateMovieById(id, data) {
    return await client.db("b40wd").collection("movies").updateOne({ id: id }, { $set: data });
}
export async function deleteMovieById(id) {
    return await client.db("b40wd").collection("movies").deleteOne({ id: id });
}
export async function insertMovies(data) {
    return await client.db("b40wd").collection("movies").insertMany(data);
}
export async function getMovieById(id) {
    return await client.db("b40wd").collection("movies").findOne({ id: id });
}
