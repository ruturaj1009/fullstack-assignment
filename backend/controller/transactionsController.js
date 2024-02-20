const ProductModel = require("../model/productsModel");

//to get all transaction list
//default page will be 0
//test url = http://localhost:8080/api/transactions?p=0&month=1&q=mens

const listTransactions = async (req, res) => {
  try {
    let page = parseInt(req.query.p, 10) || 0;
    const transactionsPerPage = 10;

    if (page < 0) {
      return res.status(400).json({ error: "Invalid page number" });
    }

    let query = {};

    // search based on month
    if (req.query.month) {
      const numericMonth = parseInt(req.query.month, 10);

      if (!isNaN(numericMonth) && numericMonth >= 1 && numericMonth <= 12) {
        query.$expr = {
          $eq: [{ $month: "$dateOfSale" }, numericMonth],
        };
      } else {
        return res.status(400).json({ error: "Invalid month value" });
      }
    }

    // Search based on price or text
    if (req.query.q) {
      const priceQuery = parseFloat(req.query.q);

      if (!isNaN(priceQuery)) {
        query.price = priceQuery;
      } else {
        query = {
          $or: [
            { title: { $regex: req.query.q, $options: "i" } },
            { description: { $regex: req.query.q, $options: "i" } },
          ],
        };
      }
    }

    const totalTransactions = await ProductModel.countDocuments(query);
    const totalPages = Math.ceil(totalTransactions / transactionsPerPage);

    const transactions = await ProductModel.find(query)
      .skip(page * transactionsPerPage)
      .limit(transactionsPerPage);

    res.json({ transactions, page, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching transactions" });
  }
};

module.exports = {
  listTransactions,
};
