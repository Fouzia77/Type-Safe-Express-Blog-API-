import { Post } from "../core/models"

export interface PostRepository{

create(title:string,content:string,authorId:number):Post

findById(id:number):Post | null

findMany(
page:number,
limit:number,
authorId?:number
):{posts:Post[];total:number}

update(
id:number,
title?:string,
content?:string
):Post | null

delete(id:number):boolean

}