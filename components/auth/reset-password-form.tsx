"use client";

import { Icons } from './logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forgetPassword, resetPassword } from '@/lib/auth-client';
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'

export default function ResetPasswordForm() {
    const [password, setPassword] = useState("")
    const router = useRouter();
    const [message, setMessage] = useState("")
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if(token) {
            setMessage("Invalid or missing token")
        }
    }, [token])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(token) return;

        const { error } = await resetPassword({
            token,
            newPassword: password
        })
        if(error){
            setMessage("Failed to reset password");
        }else{
            setMessage("Passord resey! Yo can now sign in");
        }
        setTimeout(() => router.push("/login"), 1000)
    }
    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-10 md:py-20 dark:bg-transparent">
            <form
                onSubmit={handleSubmit}
                className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                    <div>
                        <Link
                            href="/"
                            aria-label="go home">
                            <Icons.logo className='h-10 w-10' />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Recover Password</h1>
                        <p className="text-sm">Enter your email to receive a reset link</p>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="block text-sm">
                                Password
                            </Label>
                            <Input
                                type="password"
                                required
                                name="password"
                                id="password"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="block text-sm">
                                Confirm Password
                            </Label>
                            <Input
                                type="password"
                                required
                                name="password"
                                id="password"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                            />
                        </div>

                        <Button className="w-full">Send Reset Link</Button>
                    </div>
                    {message && <p>{message}</p>}
                    <div className="mt-6 text-center">
                        <p className="text-muted-foreground text-sm">We'll send you a link to reset your password.</p>
                    </div>
                </div>

                <div className="p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Remembered your password?
                        <Button
                            asChild
                            variant="link"
                            className="px-2">
                            <Link href="/login">Log in</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    )
}
