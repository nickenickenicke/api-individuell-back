const { check, validationResult } = require("express-validator");
const { Player } = require("../models");

const validatePlayer = [
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Player name can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Player name should be at least 3 characters!")
    .bail(),
  check("jersey")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Jersey can not be empty!")
    .bail()
    .isNumeric({ no_symbols: true })
    .withMessage("Jersey can only contain numbers!")
    .bail()
    .toInt()
    .isInt({ min: 1, max: 999 })
    .withMessage("Jersey can only be between 1 and 999!"),
  check("team")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Team name can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Team name should be at least 3 characters!")
    .bail(),
  check("position")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Position can not be empty!")
    .bail()
    .matches(/Goalie|Defence|Forward/)
    .withMessage("Position should be Goalie, Defence or Forward!")
    .bail(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

const validateQuery = [
  check("sortBy").escape(),
  check("orderBy").escape(),
  check("search").escape(),
  check("pageSize")
    .escape()
    .isNumeric()
    .withMessage("Page size can only contain numbers!")
    .bail()
    .toInt(),
  check("offset")
    .escape()
    .isNumeric()
    .withMessage("Offset can only contain numbers!")
    .bail()
    .toInt(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

module.exports = { validatePlayer, validateQuery };
