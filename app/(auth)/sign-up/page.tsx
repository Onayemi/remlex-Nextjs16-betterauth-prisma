import SignUpPage from "@/components/auth/sign-up"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const signUp = async() => {
  const session = await auth.api.getSession({
        headers: await headers()
      })
    
    if(session) return redirect("/dashboard")
  return (
    <SignUpPage />
  )
}

export default signUp