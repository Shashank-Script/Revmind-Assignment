# NovaBite AI Analytics Dashboard

A full-stack business intelligence dashboard and conversational analytics chatbot built for NovaBite Consumer Goods.

The application allows sales managers to:

- View key business KPIs
- Analyze monthly revenue trends
- Analyze revenue by product category
- Ask business questions in natural language through an AI-powered chatbot

---

# Tech Stack

## Frontend

- React (Vite)
- Tailwind CSS
- Axios
- Recharts
- React Router DOM

## Backend

- Node.js
- Express.js
- SQLite
- Google Gemini API

---

# Project Structure

```text
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── seed.js
│   └── ...
│
├── frontend/
│   └── src/
|       ├── components/
|       ├── pages/
|       ├── App.jsx
|       ├── main.jsx
|       └── ...
|      
├── data/
│   └── novabite_sales_data.csv
│
├── .env.example
│
└── README.md
```

---

# Features

## Dashboard

- Total Net Revenue KPI
- Gross Profit Margin KPI
- Top Region KPI
- Monthly Revenue Trend Chart
- Revenue by Category Chart
<img width="1279" height="607" alt="Novabite dashboard" src="https://github.com/user-attachments/assets/c3e5c063-70d2-411e-b8ec-c812bc8910b7" />


## AI Chat Assistant

Supports business analytics questions such as:

- Which region had the highest net revenue in Q1 2024?
- What is the gross profit margin for the Snacks category?
- Which sales rep closed the most units in 2025?
- Compare E-Commerce vs Modern Trade net revenue.
- What was the best performing product in the West region?
<img width="1232" height="597" alt="Novabite ai" src="https://github.com/user-attachments/assets/d5681043-029d-48fe-afad-434386afb3dd" />

---

# How To Run Locally

## 1. Clone Repository

```bash
git clone <repo-url>
cd <repo-name>
```

## 2. Configure Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```

Create a `.env` file inside the frontend folder:

```env
VITE_BACKEND_URL=http://localhost:5000
```

## 3. Start Backend

```bash
cd backend

npm install

npm run seed

npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

## 4. Start Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | `/api/products` | Returns product-wise revenue and units sold |
| GET | `/api/summary` | Returns dashboard KPIs |
| GET | `/api/trends` | Returns monthly revenue trends |
| GET | `/api/category-revenue` | Returns category-wise revenue |
| POST | `/api/chat` | Returns AI-generated business insights |

---

# LLM Used And Why

I used **Google Gemini 2.5 Flash** as the Large Language Model.

### Reasons

- Free developer tier available
- Fast response times
- Easy integration using the official SDK
- Suitable for business analytics question-answering
- Allowed rapid prototyping within the assignment timeline

The architecture is provider-agnostic and can be adapted to OpenAI or Anthropic models with minimal changes.

---

# Prompt Design For `/api/chat`

The chatbot uses a hybrid approach:

```text
User Question
        ↓
Intent Detection
        ↓
SQL Query Execution (SQLite)
        ↓
Business Data Retrieval
        ↓
Gemini Prompt
        ↓
Natural Language Response
```

Instead of sending the entire dataset to the LLM, SQLite performs deterministic aggregations and calculations.

### Example

User Question:

```text
Which region had the highest net revenue in Q1 2024?
```

SQL Result:

```json
[
  {
    "region": "South",
    "revenue": 37640.11
  }
]
```

Prompt Sent To Gemini:

```text
You are a business analyst for NovaBite Consumer Goods.

User Question:
Which region had the highest net revenue in Q1 2024?

SQL Result:
[
  {
    "region": "South",
    "revenue": 37640.11
  }
]

Provide a concise business answer.
```

This approach improves accuracy by relying on SQL for calculations and using the LLM only for response generation.

---

# Tradeoffs / Shortcuts Made

To ensure accuracy and reliability within the assignment timeline:

- Implemented predefined SQL templates for supported analytics questions instead of a full text-to-SQL agent.
- Used SQLite instead of a hosted database because the assignment explicitly allowed local storage.
- Focused on deterministic query execution to reduce hallucinations and incorrect business calculations.
- Prioritized correctness and maintainability over supporting every possible natural-language variation.

---

# What I Would Improve With More Time

Given additional development time, I would implement:

- Dynamic text-to-SQL generation using the LLM
- Streaming chatbot responses
- Conversation history and context retention
- Unit and integration tests
- Authentication and role-based access
- Dashboard filters (date range, region, category)
- Deployment using Docker and cloud hosting
- Additional visualizations and drill-down analytics
- Query caching for faster analytics responses

---

# Future Enhancements

- Multi-user support
- Real-time business alerts
- Voice-enabled analytics assistant
- Mobile application
- Advanced forecasting and predictive analytics

---

# Key Engineering Decision

A deliberate design choice was to use:

```text
SQLite for calculations
+
Gemini for explanation
```

rather than asking the LLM to perform calculations directly.

This ensures business metrics remain deterministic, accurate, and reproducible while still providing a natural conversational experience.
