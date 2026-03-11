import Database from "better-sqlite3"
import dotenv from "dotenv"

dotenv.config()

const dbPath = process.env.DATABASE_PATH || "./data/blog.db"

export const db = new Database(dbPath)

export function initDB(): void {

db.exec(`
CREATE TABLE IF NOT EXISTS authors(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
email TEXT NOT NULL UNIQUE
)
`)

db.exec(`
CREATE TABLE IF NOT EXISTS posts(
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT NOT NULL,
content TEXT NOT NULL,
authorId INTEGER NOT NULL,
createdAt TEXT NOT NULL DEFAULT(datetime('now')),
updatedAt TEXT NOT NULL DEFAULT(datetime('now')),
FOREIGN KEY(authorId) REFERENCES authors(id)
)
`)
}