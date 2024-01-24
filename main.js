const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

app.use(cors());

const players = [
  {
    id: 1,
    name: "Foppa",
    jersey: 123,
    team: "Colorado",
    position: "Forward",
  },
];

app.get("/", (req, res) => {
  res.send("Här är ett api som funkar");
});

app.get("/players", (req, res) => {
  res.json(players);
});
