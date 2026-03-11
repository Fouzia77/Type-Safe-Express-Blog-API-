import { CreatePostDTO } from "./core/schemas"

export class BlogApiClient{

constructor(private baseUrl:string){}

async createPost(data:CreatePostDTO){

const res=await fetch(`${this.baseUrl}/api/posts`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
})

return res.json()
}

async getPosts(){
const res=await fetch(`${this.baseUrl}/api/posts`)
return res.json()
}

async getPostById(id:number){
const res=await fetch(`${this.baseUrl}/api/posts/${id}`)
return res.json()
}

}