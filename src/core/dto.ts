export interface AuthorDTO{
id:number
name:string
}

export interface PostDTO{
id:number
title:string
content:string
author:AuthorDTO
createdAt:string
updatedAt:string
}