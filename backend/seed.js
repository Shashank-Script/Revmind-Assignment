import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";

import db from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(
  __dirname,
  "..",
  "data",
  "novabite_sales_data.csv"
);

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS sales`);

  db.run(`
    CREATE TABLE sales (
      transaction_id TEXT,
      date TEXT,
      month TEXT,
      quarter TEXT,
      sku TEXT,
      product_name TEXT,
      category TEXT,
      subcategory TEXT,
      region TEXT,
      channel TEXT,
      sales_rep TEXT,
      units_sold INTEGER,
      unit_price_usd REAL,
      gross_revenue_usd REAL,
      discount_pct REAL,
      net_revenue_usd REAL,
      cogs_usd REAL,
      gross_profit_usd REAL
    )
  `);

  const stmt = db.prepare(`
    INSERT INTO sales VALUES (
      ?,?,?,?,?,?,?,?,?,?,
      ?,?,?,?,?,?,?,?
    )
  `);

  fs.createReadStream(dataPath)
    .pipe(csv())
    .on("data", (row) => {
      stmt.run([
        row.transaction_id,
        row.date,
        row.month,
        row.quarter,
        row.sku,
        row.product_name,
        row.category,
        row.subcategory,
        row.region,
        row.channel,
        row.sales_rep,
        Number(row.units_sold),
        Number(row.unit_price_usd),
        Number(row.gross_revenue_usd),
        Number(row.discount_pct),
        Number(row.net_revenue_usd),
        Number(row.cogs_usd),
        Number(row.gross_profit_usd),
      ]);
    })
    .on("end", () => {
      stmt.finalize();
      console.log("Database seeded successfully");
      db.close();
    });
});