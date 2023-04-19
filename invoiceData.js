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

module.exports = json;
