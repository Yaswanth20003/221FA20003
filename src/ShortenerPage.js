import React, { useState } from "react";

export default function ShortenerPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

  if (!url.trim()) {
    alert("Please enter your URL");
    return;
  }


    let finalUrl = url.startsWith("http://") || url.startsWith("https://") ? url : "http://" + url;

    const res = await fetch("http://localhost:5000/shorturls", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({url: finalUrl})
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <h2>Shorten URL</h2>
      <form onSubmit={handleSubmit}>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter URL" />
        <br></br>
        <br></br>
        <button type="submit">Shorten</button>
      </form>
      {result && (
        <p>
          Short Link: <a href={result.shortLink} target="_blank" rel="noreferrer">{result.shortLink}</a>
        </p>
      )}
    </div>
  );
}
