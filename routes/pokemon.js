import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.API_URL;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}`);
    res.render("pages/home", { pokemonList: response.data.results });
  } catch (error) {
    res.status(500).send("Error fetching Pokémon data");
  }
});

router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.redirect("/");

    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    res.render("pages/details", { pokemon: response.data });
  } catch (error) {
    res.status(404).render("pages/notfound");
  }
}); 

router.get("/pokemon/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    res.render("pages/details", { pokemon: response.data });
  } catch (error) {
    res.status(404).render("pages/notfound");
  }
});



export default router;
