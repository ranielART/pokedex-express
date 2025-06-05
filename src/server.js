import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import pokemonRoutes from "../routes/pokemon.js";

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", pokemonRoutes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));