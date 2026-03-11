import { PostRepository } from "../repositories/PostRepository"

export class PostService{

constructor(private repo:PostRepository){}

createPost(title:string,content:string,authorId:number){
return this.repo.create(title,content,authorId)
}

getPosts(page:number,limit:number,authorId?:number){
return this.repo.findMany(page,limit,authorId)
}

getPostById(id:number){
return this.repo.findById(id)
}

updatePost(id:number,title?:string,content?:string){
return this.repo.update(id,title,content)
}

deletePost(id:number){
return this.repo.delete(id)
}

}