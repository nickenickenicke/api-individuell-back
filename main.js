const express = require("express");
const cors = require("cors");
const migrationHelper = require("./migrationhelper");
const app = express();
const port = 3000;

const { sequelize, Player } = require("./models");
const { Op, or } = require("sequelize");
const {
  validatePlayer,
  validateQuery,
} = require("./validators/playerValidators");

app.use(cors());
app.use(express.json());

app.listen(port, async () => {
  await migrationHelper.migrate();
  console.log(`Listening on port ${port}!`);
});

app.get("/", (req, res) => {
  res.send("Här är ett api som funkar");
});

app.get("/players", validateQuery, async (req, res) => {
  let searchQuery = `%${req.query.search}%` || "%%";
  let sortBy = req.query.sortBy || "id";
  let orderBy = req.query.orderBy || "ASC";
  let offset = req.query.offset || 0;
  let limit = req.query.pageSize || 10;

  const players = await Player.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: searchQuery,
          },
        },
        {
          jersey: {
            [Op.like]: searchQuery,
          },
        },
        {
          team: {
            [Op.like]: searchQuery,
          },
        },
        {
          position: {
            [Op.like]: searchQuery,
          },
        },
      ],
    },
    order: [[sortBy, orderBy]],
    offset: offset,
    limit: limit,
  });

  res.json(players);
});

app.put("/players/:playerId", validatePlayer, async (req, res) => {
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

app.post("/players", validatePlayer, async (req, res) => {
  await Player.create({
    name: req.body.name,
    jersey: parseInt(req.body.jersey) || 0,
    team: req.body.team,
    position: req.body.position,
  });

  res.status(201).send("Skapad");
});
