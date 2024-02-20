const axios = require("axios");

const ProductModel = require("../model/productsModel");

//to seed data in the database
//test URL - http://localhost:8080/api/seed-database

const seedDatabase = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const seedData = response.data;

    await ProductModel.insertMany(seedData);

    res.json({ message: "Database is seeded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database seeding is failed" });
  }
};

module.exports = {
  seedDatabase,
};
