import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js"
import config from "./config/config.js";

const startServer = async () => {

  await connectDB();

  app.listen(process.env.PORT || 5000, () => {
    console.log(`http://localhost:${config.PORT || 5000}`);
  });
  
}

startServer();
