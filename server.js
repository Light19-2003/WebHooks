import express from "express";
import dotenv from "dotenv";
import CreateMessage from "./contoller/messages.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ WhatsApp API server is running!");
});

app.post("/api/v1/send-message", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send("Name is missing");
  }

  try {
    const response = await CreateMessage(name); // your function that sends WhatsApp message
    res.json(response); // send the API response back to client
  } catch (error) {
    console.error("❌ Error sending message:", error);
    res.status(500).json({ error: "Error sending message" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
