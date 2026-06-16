import db from "../db.js";

export const getCategoryRevenue = (req,res) => {
    const query = `
        SELECT
            category,
            SUM(net_revenue_usd) AS revenue
        FROM sales
        GROUP BY category
        ORDER BY revenue DESC
    `;

    db.all(query, [], (err,rows) => {
        if(err){
            return res.status(500).json({
                success: false,
                error: err.message,
            });
        }

        res.status(200).json({
            success: true,
            data: rows,
        });
    })
}