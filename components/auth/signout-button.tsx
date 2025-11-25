import { signOut } from "@/lib/auth-client";
import { Icons } from "./logo";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                }
            }
        })
    }

  return (
    <div onClick={handleLogout} className="flex items-center justify-between w-18 cursor-pointer">
        <Icons.logOut className="mr-2 h-4 w-4" />
        Logout
    </div>
  )
}
