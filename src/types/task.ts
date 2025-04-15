import { z } from "zod";

export const TaskFormSchema = z.object({
    firstName :z.string().nonempty("FirstName is required"),
    lastName :z.string().nonempty("Lastname is required"),
    email:z.string().email(),
    address:z.string().nonempty("Address is required"),
    phoneNumber:z.string().length(10,"PhoneNumber must be of 10 digits"),
})

export type IForm = z.infer<typeof TaskFormSchema>