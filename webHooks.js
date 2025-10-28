import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import CreateMessage from "./contoller/messages.js";
dotenv.config();

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "light-token";
let messages = []; // temporary in-memory storage
const ACCESS_TOKEN =
  "EAALpAnFTtT0BPrrhf0caduNlzTodp2nqxDsayNkuSoeJdrgOZC3a8c4O4ngL6NMho6NNlNssAZCvvzFlCn2jvMxfwWdtly0JcxNflWP7P8YZA8oynZABwRWMesvdkaeAMzJTzV0xoPSzp4FwiOQRvS4M3yiTB1HBBhZBYuWedEz5ROE0YU1H91dfEAe3eLgXo3gZDZD";
const PHONE_NUMBER_ID = "788688991002351"; // replace with your number ID

// ✅ Verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified!");
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// ✅ Receiving messages
app.post("/webhook", async (req, res) => {
  try {
    const changes = req.body.entry?.[0]?.changes?.[0];
    const value = changes?.value;
    const message = value?.messages?.[0];
    const status = value?.statuses?.[0];

    if (status) {
      console.log(`📩 Message status: ${status.status} for ID ${status.id}`);
    }

    if (message) {
      const from = message.from;
      const msgBody = message.text?.body?.toLowerCase();

      console.log(`💬 From: ${from}, Message: ${msgBody}`);
      messages.push({ from, msgBody, time: new Date() });

      if (msgBody === "hello") {
        await SendMessage(from, "Hello, Light 👋");
      } else if (msgBody === "list") {
        await SendList(from);
      } else if (msgBody === "thank you") {
        await SendMessage(from, "You are welcome");
      } else {
        await SendMessage(from, `You said: ${msgBody}`);
      }
    }
    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Error handling webhook:", error);
    res.sendStatus(500);
  }
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

// ✅ Send Text Message
app.get("/api/v1/messages", (req, res) => {
  res.json(messages);
});

async function SendMessage(to, body) {
  try {
    await axios.post(
      `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body },
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "❌ Error sending message:",
      error.response?.data || error.message
    );
  }
}

// ✅ Send List Message
async function SendList(to) {
  try {
    await axios.post(
      `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: {
          type: "list",
          body: { text: "Choose an option 👇" },
          action: {
            button: "View options",
            sections: [
              {
                title: "Menu",
                rows: [
                  { id: "1", title: "Option 1", description: "Description 1" },
                  { id: "2", title: "Option 2", description: "Description 2" },
                ],
              },
            ],
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "❌ Error sending list:",
      error.response?.data || error.message
    );
  }
}

const port = 2003;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
