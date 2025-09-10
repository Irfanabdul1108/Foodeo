import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))
import authRoutes from "../src/routes/auth.route.js";
import foodRoutes from "../src/routes/food.route.js";
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/food',foodRoutes)


app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
