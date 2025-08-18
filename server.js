const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");


const app = express();
app.use(cors());
app.use(bodyParser.json());


// 🚀 1. Receive message → Send to n8n POST webhook
app.post("/send", async (req, res) => {
 const { message } = req.body;


 try {
   await axios.post(
     "https://dikshashrivastva.app.n8n.cloud/webhook/34bef20b-0c60-42a1-9f64-63b2c947953f",
     { message }
   );


   res.json({ status: "Message sent", data: { message } });
 } catch (err) {
   console.error("❌ Failed to send to n8n:", err.message);
   console.error("Full error:", err.response?.data || err);
   res.status(500).json({ error: "n8n POST failed" });
 }
});


// 📤 2. Frontend will call this to fetch all messages
app.get("/all-messages", async (req, res) => {
 try {
   const response = await axios.get(
     "https://dikshashrivastva.app.n8n.cloud/webhook/68cbcc20-b056-422d-8c1b-7dc51b52534b"
   );
   res.json({ messages: response.data });
 } catch (err) {
   console.error("❌ Failed to fetch messages:", err.message);
   res.status(500).json({ error: "n8n GET failed" });
 }
});


// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`🚀 Server running at http://localhost:${PORT}`);
});


