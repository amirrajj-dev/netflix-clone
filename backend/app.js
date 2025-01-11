import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectToDb } from "./db/connectToDb.js";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import protectRoute from "./middlewares/protectRoute.js";
import path from 'path'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "4mb" }));
app.use(cookieParser());
dotenv.config();

// routes
app.use("/api/auth", authRoutes);
app.use('/api/movies' , protectRoute , movieRoutes)
app.use('/api/tv' , protectRoute , tvRoutes)
app.use('/api/search' , protectRoute , searchRoutes)


const dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, 'frontend', 'dist')))
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(dirname, 'frontend', 'dist', 'index.html'))
  })
}

app.listen(process.env.PORT, async () => {
  await connectToDb();
  console.log("server is running on port ", process.env.PORT);
});