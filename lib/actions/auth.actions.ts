'use server'

import { z } from "zod";
import { APIError } from "better-auth/api";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import db from "../prisma";

// Form validation schema
const SignUpSchema = z.object({
  firstname: z.string().min(2, "Firstname is too short"),
  lastname: z.string().min(2, "Lastname is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

// interface State {
//     errorMessage: string | null;
// }
// Shape returned to useActionState
export type State = {
  errorMessage?: string;       // general error (server, API, etc)
  fieldErrors?: Record<string, string | undefined>;  // individual field errors
};

export async function signUp(prevState: State, formData: FormData): Promise<State | undefined> {
  const rawFormData = {
    firstname: formData.get('firstname') as string,
    lastname: formData.get('lastname') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Validate input
  const parsed = SignUpSchema.safeParse(rawFormData);

  // Field-level errors
  if (!parsed.success) {
    // const { fieldErrors } = parsed.error.flatten();
    const flattened = parsed.error.flatten();
    const fieldErrors = flattened.fieldErrors || {};
    return {
        errorMessage: "Please fix the highlighted errors",
        fieldErrors,
    };
  }
    

  const { email, firstname, lastname, password } = parsed.data;

  try {
    const result = await auth.api.signUpEmail({
        body: {
            name: `${firstname} ${lastname}`,
            email,
            password
        }
    });

    if (result.error) {
      return {
        errorMessage: result.error.message || "Unable to create account",
        fieldErrors: {},
      };
    }

  } catch (error) {
    if(error instanceof APIError){
        switch(error.status){
            case "UNPROCESSABLE_ENTITY":
                return { errorMessage: "User already exist." }
            case "BAD_REQUEST":
                return { errorMessage: "Invalid Email" }
            default:
                return { errorMessage: "Something went wrong!" }
        }
    }
    console.log("Sign up with email and password has not working", error)
  }
   redirect("/login")
}

export async function signIn(prevState: State, formData: FormData): Promise<State | undefined> {
  const rawFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Validate input
  const parsed = SignInSchema.safeParse(rawFormData);

  // Field-level errors
  if (!parsed.success) {
    // const { fieldErrors } = parsed.error.flatten();
    const flattened = parsed.error.flatten();
    const fieldErrors = flattened.fieldErrors || {};
    return {
        errorMessage: "Please fix the highlighted errors",
        fieldErrors,
    };
  }
    

  const { email, password } = parsed.data;

  try {
    const result = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    });

    if (result.error) {
      return {
        errorMessage: result.error.message || "Unable to create account",
        fieldErrors: {},
      };
    }

  } catch (error) {
    if(error instanceof APIError){
        switch(error.status){
            case "UNPROCESSABLE_ENTITY":
                return { errorMessage: "User already exist." }
            case "BAD_REQUEST":
                return { errorMessage: "Invalid Email" }
            default:
                return { errorMessage: "Something went wrong!" }
        }
    }
    console.log("Sign up with email and password has not working", error)
  }
   redirect("/dashboard")
}

export async function searchAccount(email: string) {
  const user = db.user.findUnique({
    where: { email }
  });
  return user;
}
