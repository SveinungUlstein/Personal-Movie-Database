const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";


app.get("/api/movies", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
            params: { 
                api_key: process.env.TMDB_API_KEY,
                language: "en-US",
                page: 1 },
        });

        res.json(response.data.results);
        } catch (error) {
            console.error("Axios Error:", error.response ? error.response.data : error.message);
            res.status(500).json({error: "failed to fetch data"});
    }
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));