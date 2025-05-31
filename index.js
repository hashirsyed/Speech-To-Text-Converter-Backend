import express from "express";
import { config } from "dotenv";
config(); // Load .env
import cors from "cors";
import { AssemblyAI } from "assemblyai";

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));
const client = new AssemblyAI({
    apiKey : process.env.ASSEMBLYAI_STT_API_KEY
})
app.post("/transcribe", async (req, res) => {
    const { audioURL } = req.body;
    try {
      const transcript = await client.transcripts.create({
        audio_url: audioURL
      })
      
      return res.json({ response: transcript.text|| "No response from model." });
  
    } catch (error) {
      console.error("AssemblyAI API error:", error);
      res.status(500).json({ error: "AssemblyAI API error" });
    }
  });
  
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
