import express from "express"
import dotenv from "dotenv"

import { initDB } from "./utils/database"
import { seedDB } from "./db/seed"

import { SQLitePostRepository } from "./repositories/SQLitePostRepository"
import { PostService } from "./services/PostService"
import { PostController } from "./controllers/PostController"

import { createPostRoutes } from "./routes/postRoutes"
import { healthRouter } from "./routes/health"

dotenv.config()

const app = express()

app.use(express.json())

initDB()
seedDB()

const repo = new SQLitePostRepository()
const service = new PostService(repo)
const controller = new PostController(service)

app.use("/api/health", healthRouter)
app.use("/api/posts", createPostRoutes(controller))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})