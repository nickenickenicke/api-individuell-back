const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const players = [
  {
    id: 1,
    name: "Peter Forsberg",
    jersey: 111,
    team: "Colorado",
    position: "Forward",
  },
  {
    id: 2,
    name: "Nicklas Lidström",
    jersey: 666,
    team: "Detroit Red Wings",
    position: "Forward",
  },
  {
    id: 3,
    name: "Mats Sundin",
    jersey: 999,
    team: "Toronto Maple Leafs",
    position: "Forward",
  },
  {
    id: 4,
    name: "Börje Salming",
    jersey: 123,
    team: "Toronto Maple Leafs",
    position: "Forward",
  },
  {
    id: 5,
    name: "Henrik Lundqvist",
    jersey: 0,
    team: "New York Rangers",
    position: "Goalie",
  },
  {
    id: 6,
    name: "Daniel Alfredsson",
    jersey: 10,
    team: "Ottawa Senators",
    position: "Defence",
  },
];

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

app.get("/", (req, res) => {
  res.send("Här är ett api som funkar");
});

app.get("/players", (req, res) => {
  res.json(players);
});

app.put("/players/:playerId", (req, res) => {
  let player = players.find((players) => players.id == req.params.playerId);
  if (player) {
    player.name = req.body.name;
    player.jersey = req.body.jersey;
    player.position = req.body.position;
    res.status(204).send("");
  }

  if (!player) res.status(404).send("Finns inte");
});

app.post("/players", (req, res) => {
  //  POST HERE
});
