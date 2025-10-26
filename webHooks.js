import express from "express";
import axios from "axios";
import dotenv from "dotenv";
const VERIFY_TOKEN = "light-token";

dotenv.config();
const app = express();

app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ✅ Webhook verification (GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified!");
    return res.status(200).send(challenge);
  } else {
    console.log("❌ Verification failed.");
    return res.sendStatus(403);
  }
});

// ✅ Webhook receiving (POST)
app.post("/webhook", (req, res) => {
  const { entry } = req.body;

  if (!entry || entry.length === 0) {
    return res.status(400).send("invalid request");
  }

  const changes = [0].changes;

  if (!changes || changes.length === 0) {
    return res.status(400).send("Invaild request");
  }

  const status = changes[0].value.statuses
    ? changes[0].value.statuses[0]
    : null;

  const Meassge = changes[0].value.messages
    ? changes[0].value.messages[0]
    : null;


    if(status){
console.log(` meassge status: ${status.id}
   status : ${status.status}  
  
  `);

    }

    if(Meassge){
console.log(Meassge)
    }

  console.log("📩 Received webhook event:");
  // console.log(JSON.stringify(req.body, null, 2));

  res.status(200).send("webhook received");
});

async function SendMeasage(to, body) {
  await axios({
    url: "https://graph.facebook.com/v22.0/788688991002351/messages",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`, // Use correct variable name
    },

    data: JSON.stringify({
      messaging_product: "whatsapp",
      to: to, // no "whatsapp:" prefix needed
      type: "text",
      text: {
        body: body,
      },
    }),
  });
}

const port = 2003;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  SendMeasage("917409814407", "Hello, light");
});
