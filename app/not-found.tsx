'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
        <div className="flex flex-col items-center justify-center h-screen gap-6">
            <h1 className="text-5xl text-red-500">404 Not Found</h1>
            <Button variant={'default'} className="sm" asChild>
                <Link href={'/login'} > Go to Home </Link>
            </Button>
        </div>
    </>
  )
}

export default NotFound