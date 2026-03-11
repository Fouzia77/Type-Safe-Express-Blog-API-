import { Router } from "express"
import { PostController } from "../controllers/PostController"
import { validate } from "../middleware/validate"
import { CreatePostSchema,UpdatePostSchema } from "../core/schemas"

export function createPostRoutes(controller:PostController){

const router=Router()

router.post("/",validate(CreatePostSchema),controller.create)

router.get("/",controller.getAll)

router.get("/:id",controller.getById)

router.patch("/:id",validate(UpdatePostSchema),controller.update)

router.delete("/:id",controller.delete)

return router

}