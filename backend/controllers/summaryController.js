import db from "../db.js";

export const getSummary = (req, res) => {
  const summaryQuery = `
    SELECT
      ROUND(SUM(net_revenue_usd),2) AS totalRevenue,
      SUM(units_sold) AS totalUnits,
      ROUND(
        (SUM(gross_profit_usd) * 100.0) /
        SUM(net_revenue_usd),
        2
      ) AS grossProfitMargin
    FROM sales
  `;

  db.get(summaryQuery, [], (err, summary) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    const topRegionQuery = `
      SELECT region
      FROM sales
      GROUP BY region
      ORDER BY SUM(net_revenue_usd) DESC
      LIMIT 1
    `;

    db.get(topRegionQuery, [], (err, regionData) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      const topChannelQuery = `
        SELECT channel
        FROM sales
        GROUP BY channel
        ORDER BY SUM(net_revenue_usd) DESC
        LIMIT 1
      `;

      db.get(topChannelQuery, [], (err, channelData) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        const topProductQuery = `
          SELECT product_name
          FROM sales
          GROUP BY product_name
          ORDER BY SUM(net_revenue_usd) DESC
          LIMIT 1
        `;

        db.get(topProductQuery, [], (err, productData) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message,
            });
          }

          res.status(200).json({
            success: true,
            data: {
              ...summary,
              topRegion: regionData.region,
              topChannel: channelData.channel,
              topProduct: productData.product_name,
            },
          });
        });
      });
    });
  });
};