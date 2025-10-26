import expres from "express";

import axios from "axios";

const app = expres();

app.use(expres.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/webHook", (req, res) => {
  console.log(req.query);
});

const port = 2003;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
