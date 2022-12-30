import express from "express";
import { client } from "../index.js";

const router = express.Router();

// router.get("/movies", function (request, response) {
//     response.send(movies);
// });

// router.get("/movies", async function (request, response) {
//     //db.movies.find({})
//     // cursor - pagination .. Cursor -> Array | toArray()
//     const movies = await client.db("b40wd").collection("movies").find({}).toArray();
//     console.log(movies)
//     response.send(movies);
// });

router.get("/:id", async function (request, response) {

    const { id } = request.params;
    // console.log(request.params, id);
    // db.movie.findOne({id:"100"}); regular db command
    const movie = await client.db("b40wd").collection("movies").findOne({ id: id })

    movie ? response.send(movie) : response.status(404)
        .send({ message: "movie not found" });
});



// await client.db("b40wd").collection("movies").insertMany(data);

router.post("/", async function (request, response) {
    const data = request.body;
    console.log(data);
    // db.movies.insertMany(data)
    const result = await client.db("b40wd").collection("movies").insertMany(data);
    response.send(result);
});


//delete
router.delete("/:id", async function (request, response) {

    const { id } = request.params;
    // console.log(request.params, id);
    // db.movie.deleteOne({id:"100"}); regular db command
    const result = await client.db("b40wd").collection("movies").deleteOne({ id: id })
    // console.log((typeof result.deletedCount));
    // result ? response.send(result) : response.status(404)
    //     .send({ message: "movie not found" });

    result.deletedCount > 0 ? response.send({ mesage: "movie deleted successfully" }) : response.status(404)
        .send({ message: "movie not found" });
});

//update

router.put("/:id", async function (request, response) {

    const { id } = request.params;
    const data = request.body;
    // console.log(data);

    // db.movie.updateOne({id:"100"},{$set:{rating:9}}); regular db command
    const result = await client.db("b40wd").collection("movies").updateOne({ id: id }, { $set: data });
    response.send(result);
});


//query filter
router.get("/", async function (request, response) {

    if (request.query.rating) {
        console.log(request.query);
        request.query.rating = +request.query.rating;
    }
    console.log(request.query);
    const movies = await client.db("b40wd").collection("movies").find(request.query).toArray();
    // console.log(movies)
    response.send(movies);
});

export default router;