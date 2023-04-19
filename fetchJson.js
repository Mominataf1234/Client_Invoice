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
app.get("/api/Client/:id", async (req, res) => {
  const clientId = req.params.id; // Using req.params instead of req.body to get the client ID
  const newJson = {};
  try {
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    } else {
      newJson.client = client;
      console.log(client.get({ plain: true }));
      const invoices = await Invoice.findAll({
        where: { clientId },
        include: [{ model: Items }],
        // offset: 2, // Offset to skip the first 3 invoices (0-indexed)
        // limit: 4, // Limit the result to 4 invoices
        // order: [["createdAt", "DESC"]], // Order the invoices by createdAt field in descending order
      });

      if (!invoices || invoices.length === 0) {
        return res
          .status(404)
          .json({ error: "No invoices found for the client" });
      } else {
        newJson.invoices = invoices;
        console.log(invoices);
        const items = await Items.findAll({
          where: { invoiceId: invoices.map((invoice) => invoice.id) },
        });

        if (!items || items.length === 0) {
          return res
            .status(404)
            .json({ error: "No items found for the invoices" });
        } else {
          newJson.items = items;
          console.log(items);
        }

        // Send the JSON response
        res.json(newJson);
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log("Server started on port 3000");
});
