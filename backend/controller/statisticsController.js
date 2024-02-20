const ProductsModel = require("../model/productsModel");

//To get sales statistics
//test URL - http://localhost:8080/api/statistics?month=1
 const statistics=async(req, res) =>{
  try {
    const selectedMonth = parseInt(req.query.month);

    const totalSaleAmount = await ProductsModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, selectedMonth],
          },
          sold: true,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
        },
      },
    ]);

    const totalSoldItems = await ProductsModel.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] },
      sold: true,
    });

    const totalNotSoldItems = await ProductsModel.countDocuments({
      $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] },
      sold: false,
    });

    res.json({
      totalSaleAmount: totalSaleAmount[0] ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching statistics" });
  }
}

module.exports = statistics;
