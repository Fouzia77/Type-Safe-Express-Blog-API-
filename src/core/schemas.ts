import { z } from "zod"

export const CreatePostSchema = z.object({
title:z.string().min(3),
content:z.string().min(10),
authorId:z.number()
})

export const UpdatePostSchema = z.object({
title:z.string().min(3).optional(),
content:z.string().min(10).optional()
})

export type CreatePostDTO = z.infer<typeof CreatePostSchema>
export type UpdatePostDTO = z.infer<typeof UpdatePostSchema>