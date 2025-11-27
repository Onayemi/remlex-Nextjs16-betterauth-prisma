"use server";

import { redirect } from "next/navigation";
import z from "zod";
import db from "../prisma";
import { revalidatePath } from "next/cache";

const UserSchema = z.object({
  name: z.string().min(6, "Must have minimum of 6 character"),
  email: z.string().min(6),
  phone: z.string().min(11),
});

export async function saveUsers(prevSate: any, formData: FormData) {
    const validatedFields = UserSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            Error: validatedFields.error.flatten().fieldErrors,
            values: Object.fromEntries(formData),
            message: null,
        };
    }

    try {
        // await db.user.create({
        //     data: {
        //         name: validatedFields.data.name,
        //         email: validatedFields.data.email,
        //         phone: validatedFields.data.phone,
        //     },
        // });
        console.log(validatedFields.data)
    } catch (error) {
        return { message: "Failed to create new employee" };
    }
    
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
}