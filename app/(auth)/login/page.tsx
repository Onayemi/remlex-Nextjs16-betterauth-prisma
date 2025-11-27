import LoginPage from "@/components/auth/login"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const login = async() => {
  const session = await auth.api.getSession({
      headers: await headers()
    })
  
  if(session) return redirect("/dashboard")
    
  return (
    <LoginPage />
  )
}

export default login