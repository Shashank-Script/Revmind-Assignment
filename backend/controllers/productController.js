import db from "../db.js";

export const getProducts = (req, res) => {
  const query = `
    SELECT 
        product_name,
        SUM(net_revenue_usd) AS total_revenue,
        SUM(units_sold) AS total_units_sold
    FROM sales
    GROUP BY product_name
    ORDER BY total_revenue DESC
    `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  });
};
