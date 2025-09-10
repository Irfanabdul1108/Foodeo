import dotenv from "dotenv";
import app from './src/index.js'
import connectDB from "./src/db/db.js";
dotenv.config();
connectDB();


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});