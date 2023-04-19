const {
  sequelize,
  Client,
  Invoice,
  Items,
  port,
  app,
  express,
} = require("./db.js");
app.use(express.json());
app.post("/api/clientInvoice", async (req, res) => {
  const clientData = req.body.client;
  const invoicesData = req.body.invoices;

  try {
    let _client = {
      name: clientData.name,
      phone: clientData.phone,
      city: clientData.city,
      email: clientData.email,
    };
    let createdClient = await Client.create(_client);
    let createdClientId = createdClient.id;

    for (let i = 0; i < invoicesData.length; i++) {
      let invoice = {
        date: invoicesData[i].date,
        clientId: createdClientId,
      };
      const createdInvoice = await Invoice.create(invoice);
      let invoiceId = createdInvoice.id;

      for (let j = 0; j < invoicesData[i].items.length; j++) {
        let item = {
          productName: invoicesData[i].items[j].productName,
          quantity: invoicesData[i].items[j].quantity,
          rate: invoicesData[i].items[j].rate,
          totalAmount: invoicesData[i].items[j].totalAmount,
          invoiceId: invoiceId,
        };
        await Items.create(item);
      }
    }
    res.status(201).json({ message: "Invoice data inserted successfully!" });
  } catch (err) {
    console.error("Error inserting invoice data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while inserting invoice data." });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
