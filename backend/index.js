import { config } from "dotenv"
import { initServer } from "./config/app.js"
import { setupDatabase } from './config/db.js'

config()
setupDatabase()
initServer()