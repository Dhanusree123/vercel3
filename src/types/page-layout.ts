import { z } from "zod"

export const ComponentSchema = z.object({
    id:z.string().nonempty({message:"Id is required"}),
    title:z.string().nonempty({message:"Id is required"}),
    active:z.boolean()
})

export const PageLayoutSchema = z.object({
    id:z.string().nonempty({message:'Id is required'}),
    title:z.string().nonempty({message:"Title is required"}),
    path:z.string().nonempty({message:'Path is required'}),
    components:z.array(ComponentSchema)
})

export type IPageLayout = z.infer<typeof PageLayoutSchema>
export type IComponent = z.infer<typeof ComponentSchema>

export const NewPageLayoutSchema = PageLayoutSchema.omit({id:true})
export const UpdatePageLayoutSchema = PageLayoutSchema.omit({id:true,path:true})


export const NewandUpdateComponentSchema = ComponentSchema.omit({id:true})
