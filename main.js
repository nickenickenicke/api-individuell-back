const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const { sequelize, Player } = require("./models");

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

app.get("/", (req, res) => {
  res.send("Här är ett api som funkar");
});

app.get("/players", async (req, res) => {
  console.log(req.query);
  const players = await Player.findAll({
    order: [[req.query.sortBy, req.query.orderBy]],
  });
  res.json(players);
});

app.put("/players/:playerId", async (req, res) => {
  const playerId = parseInt(req.params.playerId) || 0;
  const thePlayer = await Player.findOne({
    where: { id: playerId },
  });

  if (thePlayer) {
    thePlayer.name = req.body.name;
    thePlayer.jersey = parseInt(req.body.jersey) || 0;
    thePlayer.team = req.body.team;
    thePlayer.position = req.body.position;

    await thePlayer.save();

    res.status(204).send("");
  }

  if (!thePlayer) res.status(404).send("Finns inte");
});

app.post("/players", async (req, res) => {
  await Player.create({
    name: req.body.name,
    jersey: parseInt(req.body.jersey) || 0,
    team: req.body.team,
    position: req.body.position,
  });

  res.status(201).send("Skapad");
});
