export interface Author{
id:number
name:string
email:string
}

export interface Post{
id:number
title:string
content:string
authorId:number
createdAt:Date
updatedAt:Date
}