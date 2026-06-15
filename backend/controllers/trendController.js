import db from "../db.js";

export const getTrends = (req, res) => {
    const query = `
        SELECT 
            month, 
            SUM(net_revenue_usd) AS revenue
        FROM sales
        GROUP BY month
        ORDER BY month ASC
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
            count: rows.length,
            data: rows,
        });
    })
}