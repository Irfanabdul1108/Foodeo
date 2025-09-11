import dotenv from "dotenv";
import app from './src/index.js'
import connectDB from "./src/db/db.js";
dotenv.config();
connectDB();
const PORT = process.env.port || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});