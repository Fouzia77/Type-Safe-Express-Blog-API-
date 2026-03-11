import { db } from "../utils/database"
import { Post } from "../core/models"
import { PostRepository } from "./PostRepository"

interface PostRow{
id:number
title:string
content:string
authorId:number
createdAt:string
updatedAt:string
}

export class SQLitePostRepository implements PostRepository{

create(title:string,content:string,authorId:number):Post{

const result=db.prepare(
`INSERT INTO posts(title,content,authorId)
VALUES(?,?,?)`
).run(title,content,authorId)

const id=Number(result.lastInsertRowid)

return this.findById(id)!
}

findById(id:number):Post | null{

const row=db.prepare(
`SELECT * FROM posts WHERE id=?`
).get(id) as PostRow | undefined

if(!row) return null

return this.map(row)
}

findMany(page:number,limit:number,authorId?:number){

const offset=(page-1)*limit

let rows:PostRow[]
let count:{count:number}

if(authorId){

rows=db.prepare(
`SELECT * FROM posts
WHERE authorId=? LIMIT ? OFFSET ?`
).all(authorId,limit,offset) as PostRow[]

count=db.prepare(
`SELECT COUNT(*) as count
FROM posts WHERE authorId=?`
).get(authorId) as {count:number}

}else{

rows=db.prepare(
`SELECT * FROM posts
LIMIT ? OFFSET ?`
).all(limit,offset) as PostRow[]

count=db.prepare(
`SELECT COUNT(*) as count FROM posts`
).get() as {count:number}

}

return{
posts:rows.map(r=>this.map(r)),
total:count.count
}

}

update(id:number,title?:string,content?:string){

const post=this.findById(id)

if(!post) return null

db.prepare(
`UPDATE posts
SET title=COALESCE(?,title),
content=COALESCE(?,content),
updatedAt=datetime('now')
WHERE id=?`
).run(title??null,content??null,id)

return this.findById(id)
}

delete(id:number){

const result=db.prepare(
`DELETE FROM posts WHERE id=?`
).run(id)

return result.changes>0
}

private map(row:PostRow):Post{

return{
id:row.id,
title:row.title,
content:row.content,
authorId:row.authorId,
createdAt:new Date(row.createdAt),
updatedAt:new Date(row.updatedAt)
}

}

}