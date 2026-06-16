import { model } from "../services/chatService.js";
import { queryDB } from "../db.js";

export const chat = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const lowerQuestion = question.toLowerCase();

    let sql = "";

    // Question 1
    if (
      lowerQuestion.includes("highest net revenue") &&
      lowerQuestion.includes("q1")
    ) {
      sql = `
        SELECT
          region,
          ROUND(SUM(net_revenue_usd),2) AS revenue
        FROM sales
        WHERE quarter='Q1-2024'
        GROUP BY region
        ORDER BY revenue DESC
        LIMIT 1
      `;
    }

    // Question 2
    else if (
      lowerQuestion.includes("gross profit margin") &&
      lowerQuestion.includes("snacks")
    ) {
      sql = `
        SELECT
          ROUND(
            (SUM(gross_profit_usd) * 100.0) /
            SUM(net_revenue_usd),
            2
          ) AS gross_profit_margin
        FROM sales
        WHERE category='Snacks'
      `;
    }

    // Question 3
    else if (
      lowerQuestion.includes("sales rep") &&
      lowerQuestion.includes("2025")
    ) {
      sql = `
        SELECT
          sales_rep,
          SUM(units_sold) AS total_units
        FROM sales
        WHERE date LIKE '2025%'
        GROUP BY sales_rep
        ORDER BY total_units DESC
        LIMIT 1
      `;
    }

    // Question 4
    else if (
      lowerQuestion.includes("e-commerce") &&
      lowerQuestion.includes("modern trade")
    ) {
      sql = `
        SELECT
          channel,
          ROUND(SUM(net_revenue_usd),2) AS revenue
        FROM sales
        WHERE channel IN ('E-Commerce','Modern Trade')
        GROUP BY channel
      `;
    }

    // Question 5
    else if (lowerQuestion.includes("west region")) {
      sql = `
        SELECT
          product_name,
          ROUND(SUM(net_revenue_usd),2) AS revenue
        FROM sales
        WHERE region='West'
        GROUP BY product_name
        ORDER BY revenue DESC
        LIMIT 1
      `;
    } else {
      const summaryData = await queryDB(`
      SELECT
        region,
        category,
        channel,
        product_name,
        SUM(net_revenue_usd) AS revenue
      FROM sales
      GROUP BY region, category, channel, product_name
      LIMIT 100
  `);

      const prompt = `
  You are a business analyst for NovaBite Consumer Goods.

  Available data sample:
  ${JSON.stringify(summaryData)}

  User Question:
  ${question}

  If the answer cannot be determined from the data,
  clearly say so.
  `;

      const result = await model.generateContent(prompt);

      return res.json({
        success: true,
        answer: result.response.text(),
      });
    }

    const data = await queryDB(sql);

    const prompt = `
      You are a business analyst for NovaBite Consumer Goods.

      User Question:
      ${question}

      SQL Result:
      ${JSON.stringify(data, null, 2)}

      Give a concise business answer.
    `;

    const result = await model.generateContent(prompt);

    const answer = result.response.text();

    res.status(200).json({
      success: true,
      answer,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
