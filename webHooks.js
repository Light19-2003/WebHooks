import expres from "express";

import axios from "axios";

const VERIFY_TOKEN = "light-token";

const app = expres();

app.use(expres.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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

app.post("/webhook", (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));

  res.status(200).send("webhook received");
});

const port = 2003;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
