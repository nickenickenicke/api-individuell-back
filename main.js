const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

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

app.put("/players", (req, res) => {
  //  PUT HERE
});

app.post("/players", (req, res) => {
  //  POST HERE
});
