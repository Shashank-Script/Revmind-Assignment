import { useEffect, useState } from "react";
import axios from "axios";

import KPICard from "../components/KPICard";
import RevenueChart from "../components/RevenueChart";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchTrends();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/summary`
      );

      setSummary(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTrends = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/trends`
      );

      setTrends(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!summary) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        NovaBite Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <KPICard
          title="Total Revenue"
          value={`$${summary.totalRevenue}`}
        />

        <KPICard
          title="Gross Margin %"
          value={`${summary.grossProfitMargin}%`}
        />

        <KPICard
          title="Top Region"
          value={summary.topRegion}
        />
      </div>

      <RevenueChart data={trends} />
    </div>
  );
}

export default Dashboard;