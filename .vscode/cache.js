const { sequelize, Client, Invoice, Items } = require("./db.js");
const invoiceData = require("./invoiceData.js");

async function insertInvoiceData() {
  try {
    let _client = {
      name: invoiceData.client.name,
      phone: invoiceData.client.phone,
      city: invoiceData.client.city,
      email: invoiceData.client.email,
    };
    let createdClientId;

    const createdClient = await Client.create(_client);
    createdClientId = createdClient.id;

    let invoice = {
      date: invoiceData.invoice.date,
      clientId: createdClientId,
    };

    const createdInvoice = await Invoice.create(invoice);
    let invoiceId = createdInvoice.id;
    let items = [];

    for (let i = 0; i < invoiceData.items.length; i++) {
      let item = {
        productName: invoiceData.items[i].productName,
        quantity: invoiceData.items[i].quantity,
        rate: invoiceData.items[i].rate,
        totalAmount: invoiceData.items[i].totalAmount,
        invoiceId: invoiceId,
      };
      items.push(items);
      await Items.create(item);
    }

    console.log("Invoice data inserted successfully!");
  } catch (err) {
    console.error("Error inserting invoice data:", err);
  }
}

module.exports = insertInvoiceData;

const { sequelize, Client, Invoice, Items } = require("./db.js");

async function insertInvoiceData(invoicesData) {
  try {
    for (let i = 0; i < invoicesData.length; i++) {
      let _client = {
        name: invoicesData[i].client.name,
        phone: invoicesData[i].client.phone,
        city: invoicesData[i].client.city,
        email: invoicesData[i].client.email,
      };
      let createdClientId;

      const createdClient = await Client.create(_client);
      createdClientId = createdClient.id;

      let invoice = {
        date: invoicesData[i].invoice.date,
        clientId: createdClientId,
      };

      const createdInvoice = await Invoice.create(invoice);
      let invoiceId = createdInvoice.id;
      let items = [];

      for (let j = 0; j < invoicesData[i].items.length; j++) {
        let item = {
          productName: invoicesData[i].items[j].productName,
          quantity: invoicesData[i].items[j].quantity,
          rate: invoicesData[i].items[j].rate,
          totalAmount: invoicesData[i].items[j].totalAmount,
          invoiceId: invoiceId,
        };
        items.push(items);
        await Items.create(item);
      }

      console.log(`Invoice ${i + 1} data inserted successfully!`);
    }
  } catch (err) {
    console.error("Error inserting invoice data:", err);
  }
}

module.exports = insertInvoiceData;

const insertInvoiceData = require("./trail.js");
insertInvoiceData()
  .then(() => {})
  .catch((err) => {
    console.error(err);
  });
import { fetchData } from "./fetchJson.js";
const fetchData = require("./fetchJson.js");
const createdClientId = 1;
fetchData(createdClientId)
  .then((newJson) => {
    console.log(newJson);
  })
  .catch((err) => {
    console.error(err);
  });
let json = {
  client: {
    name: "Sana Auto",
    city: "Bhiwandi",
    phone: "7894561230",
    email: "sanaauto234@gmail.com",
  },
  invoices: [
    {
      date: "2023-04-10",
      items: [
        {
          productName: "Wrench",
          quantity: 10,
          rate: 100,
          totalAmount: 1000,
        },
        {
          productName: "Hammer",
          quantity: 5,
          rate: 50,
          totalAmount: 250,
        },
      ],
    },
    {
      date: "2023-04-15",
      items: [
        {
          productName: "Screwdriver",
          quantity: 8,
          rate: 80,
          totalAmount: 640,
        },
        {
          productName: "Pliers",
          quantity: 12,
          rate: 70,
          totalAmount: 840,
        },
      ],
    },
  ],
};
let data = json;

let _client = {
  name: data.name,
  phone: data.phone,
  city: data.city,
  email: data.email,
};
let invoice, item;
Client.create(_client)
  .then((createdClient) => {
    let invoiceId = createdClient.id;
    for (let i = 0; i < data.length; i++) {
      invoice = {
        date: data[i].date,
        clientId: invoiceId,
      };
      Invoice.create(invoice);
      let items = [];
      for (let j = 0; j < data[i].items.length; j++) {
        item = {
          productName: data[i].items[j].productName,
          quantity: data[i].items[j].quantity,
          rate: data[i].items[j].rate,
          totalAmount: data[i].items[j].totalAmount,
          invoiceId: invoiceId,
        };
        item.push(items);
        Items.create(item);
      }

      console.log("Invoice data inserted successfully!");
    }
  })
  .catch((err) => {
    console.error("Error inserting invoice data:", err);
  });
console.log(_client);
console.log(invoice);
console.log(item);
// async function fetchData(createdClientId) {
//   try {
//     let newJson = {};
//     const client = await Client.findByPk(createdClientId);
//     if (!client) {
//       return console.log("Client not found");
//     } else {
//       newJson.client = client;
//     }

//     const invoices = await Invoice.findAll();
//     if (!invoices || invoices.length === 0) {
//       return console.log("No invoices found for the client");
//     } else {
//       newJson.invoices = invoices;
//     }

//     const items = await Items.findAll();
//     if (!items || items.length === 0) {
//       return console.log("No items found for the invoices");
//     } else {
//       newJson.items = items;
//     }

//     console.log(newJson.client);
//     console.log(newJson.invoices);
//     console.log(newJson.items);
//   } catch (err) {
//     console.error(err);
//   }
// }

// fetchData();
