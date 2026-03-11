import { Request,Response } from "express"
import { PostService } from "../services/PostService"
import { success,error } from "../utils/apiResponse"

export class PostController{

constructor(private service:PostService){}

create=(req:Request,res:Response)=>{

const {title,content,authorId}=req.body

const post=this.service.createPost(title,content,authorId)

res.status(201).json(success(post))
}

getAll=(req:Request,res:Response)=>{

const page=Number(req.query.page)||1
const limit=Number(req.query.limit)||10
const authorId=req.query.authorId
?Number(req.query.authorId):undefined

const result=this.service.getPosts(page,limit,authorId)

res.json(success(result))
}

getById=(req:Request,res:Response)=>{

const id=Number(req.params.id)

const post=this.service.getPostById(id)

if(!post)
return res.status(404).json(error("NOT_FOUND","Post not found"))

res.json(success(post))
}

update=(req:Request,res:Response)=>{

const id=Number(req.params.id)

const post=this.service.updatePost(id,req.body.title,req.body.content)

if(!post)
return res.status(404).json(error("NOT_FOUND","Post not found"))

res.json(success(post))
}

delete=(req:Request,res:Response)=>{

const id=Number(req.params.id)

const ok=this.service.deletePost(id)

if(!ok)
return res.status(404).json(error("NOT_FOUND","Post not found"))

res.json(success({message:"Post deleted successfully"}))
}

}