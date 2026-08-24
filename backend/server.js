
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import dns from "dns";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on port ${PORT}`);
});




