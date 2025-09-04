const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/urlshortener");

const Url = mongoose.model("Url",new mongoose.Schema({
  url: String,
  code: String,
  expiry: Date,
  clicks: [Date]
}));

const makeCode= (len = 5) =>{
  const chars ="abcdefghijklmnopqstuvwxyz0123456789";
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

app.post("/shorturls",async (req,res) => {
  let { url, validity, shortcode } =req.body;
  if (!url) return res.json({ error: "URL required" });

  if (!/^https?:\/\//i.test(url)) url ="http://" + url;

  const code =shortcode || makeCode();
  if (await Url.findOne({ code })) return res.json({ error: "Code already used" });

  const expiry =new Date(Date.now() + (parseInt(validity) || 30) * 60000);
  await new Url({ url, code, expiry, clicks: [] }).save();

  res.json({ shortLink: `http://localhost:5000/${code}`,expiry });
});

app.get("/:code", async (req, res) => {
  const found = await Url.findOne({ code: req.params.code });
  if (!found) return res.send("Not found");
  if (new Date()>found.expiry) return res.send("Expired");

  found.clicks.push(new Date());
  await found.save();

  res.redirect(found.url);
});

app.get("/shorturls/:code", async (req, res) => {
  const found = await Url.findOne({ code: req.params.code });
  if (!found) return res.json({ error: "Not found" });

  res.json({
    originalUrl: found.url,
    expiry: found.expiry,
    totalClicks: found.clicks.length,
    clicks: found.clicks
  });
});

app.listen(5000, () => console.log("Server runing at http://localhost:5000"));
