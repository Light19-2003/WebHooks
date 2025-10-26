import expres from "express";

import axios from "axios";

const webhook_token = "light-token";

const app = expres();

app.use(expres.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/webHook", (req, res) => {
  // console.log(req.query);

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === webhook_token) {
    res.statusCode(200).send(challenge);
  } else {
    res.statusCode(400);
  }
});

const port = 2003;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
