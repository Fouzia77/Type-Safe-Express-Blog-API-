import { db } from "../utils/database"

export function seedDB(): void {

  const authorCount = db
    .prepare("SELECT COUNT(*) as count FROM authors")
    .get() as { count: number }

  if (authorCount.count > 0) return

  const author = db.prepare(
    "INSERT INTO authors(name,email) VALUES (?,?)"
  ).run("John Doe", "john@example.com")

  const authorId = Number(author.lastInsertRowid)

  const insertPost = db.prepare(
    "INSERT INTO posts(title,content,authorId) VALUES (?,?,?)"
  )

  for (let i = 1; i <= 5; i++) {

    insertPost.run(
      `Sample Post ${i}`,
      "Example blog post content for seed data.",
      authorId
    )

  }

}