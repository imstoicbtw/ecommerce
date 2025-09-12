import "dotenv/config";
import * as process from "node:process";
import { connectDb } from "../config/db.config.js";
import { seedAdmin } from "./admin.seeder.js";


const args: Record<string, () => Promise<void>> = { seedAdmin };

if (typeof args[process.argv[2]] === "function") {
    await connectDb(process.env.MONGO_URI!);
    await args[process.argv[2]].call(null);
    process.exit();
} else {
    console.error("Invalid seeder.");
}