const Sequelize = require("sequelize");
// const { client } = require("./invoiceData");
const express = require("express");
const app = express();
const port = 3000;

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "ci",
  username: "postgres",
  password: "1234",
  logging: false,
});
sequelize
  .authenticate()
  .then(() => {})
  .catch(() => {});
const Client = sequelize.define(
  "client",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    city: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
  },
  { tableName: "client", freezeTableName: true }
);
Client.sync()
  .then(() => {})
  .catch(() => {});
const Invoice = sequelize.define(
  "invoice",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: Sequelize.INTEGER,
    date: Sequelize.DATE,
  },
  { tableName: "invoice", freezeTableName: true }
);
Invoice.sync()
  .then(() => {})
  .catch(() => {});
const Items = sequelize.define(
  "items",
  {
    productName: Sequelize.STRING,
    rate: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    totalAmount: Sequelize.INTEGER,
    invoiceId: Sequelize.INTEGER,
  },
  { tableName: "items", freezeTableName: true }
);
Items.sync()
  .then(() => {})
  .catch(() => {});

Client.hasMany(Invoice, { foreignKey: "clientId" });
Invoice.belongsTo(Client, { foreignKey: "clientId" });

Invoice.hasMany(Items, { foreignKey: "invoiceId" });
Items.belongsTo(Invoice, { foreignKey: "invoiceId" });
module.exports = { sequelize, Client, Invoice, Items, port, app, express };
