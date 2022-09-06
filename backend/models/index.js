/* eslint-disabled */

"use strict";

const dotenv = require("dotenv").config();
// import fs from "fs";
// import path from "path";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
var db = {};
const dbName = "ecommerce_backend";
const dbUser = "root";
const dbPassword = "";
const dbHost = "localhost";
// const dbPort = "3306";

let sequelize;

console.log("!!!!!!!!!!!!!env data", dbName, dbUser, dbPassword, dbHost);

//development
sequelize = new Sequelize(dbName, dbUser, "", {
  host: dbHost,
  dialect: "mysql",
  // port: dbPort,
});

const op = Sequelize.Op;
const operatorsAliases = {
  $in: op.in,
  $or: op.or,
};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    //const model = sequelize["import"](path.join(__dirname, file));
    const model = require(`../models/${file}`)(sequelize, Sequelize.DataTypes);
    // console.log("new model", model.name);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db['op'] = op;

module.exports = db;
