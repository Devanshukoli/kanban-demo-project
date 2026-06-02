import dotenv from 'dotenv'
dotenv.config();

import app from './app.js'
import { dbConnection } from "./config/db.js";

const PORT = process.env.PORT || 5000;

(async () => {
  await dbConnection();

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
})();