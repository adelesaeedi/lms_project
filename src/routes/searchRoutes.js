import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/search", async (req, res) => {
  const { query, source } = req.body;

  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }

  try {
    let response;

    switch (source) {
      case "youtube":
        response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: "snippet",
              q: query,
              key: process.env.YOUTUBE_API_KEY,
            },
          }
        );
        break;

     
      case "ai":
        response = await axios.post(
          "https://api.gemini.com/v1/query",
          {
            prompt: query,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
            },
          }
        );
        break;

      default:
        return res.status(400).json({ message: "Invalid source" });
    }

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Search service error", error: err.message });
  }
});

export default router;
