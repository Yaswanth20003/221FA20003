import React, { useState } from "react";

export default function StatsPage() {
  const [code, setCode] = useState("");
  const [stats, setStats] = useState(null);

  const getStats = async () => {
     if (!code.trim()) {
    alert("Please enter a shortcode");
    return;
  }

    if (!code) return;
    const res = await fetch(`http://localhost:5000/shorturls/${code}`);
    const data = await res.json();
    setStats(data);
  };

  return (
    <div>
      <h2>Stats</h2>
      <input value={code} onChange={e => setCode(e.target.value)} placeholder="Enter shortcode" />
      <br></br>
      <br></br>
      <button onClick={getStats}>Get</button>

      {stats && !stats.error && (
        <div>
          <p>Original URL: {stats.originalUrl}</p>
          <p>Expiry: {stats.expiry}</p>
          <p>Total Clicks: {stats.totalClicks}</p>
        </div>
      )}
      {stats && stats.error && <p>{stats.error}</p>}
    </div>
  );
}
