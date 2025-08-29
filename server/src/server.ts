import "dotenv/config";

import app from "./app.js";
import { connectDb } from "./config/db.config.js";

// Environment variables
const { PORT, MONGO_URI } = process.env;



// Database
await connectDb(MONGO_URI as string);



// Start listening...
app.listen(PORT, (): void => console.log(`Listening on port ${PORT}`));