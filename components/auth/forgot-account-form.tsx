'use client';

import { Icons } from './logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { searchAccount } from '@/lib/actions/auth.actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ForgotAccountForm() {
    const [email, setEmail] = useState("")
    const router = useRouter();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const found = await searchAccount(email)
        console.log(found)

        if(found) {
            router.push(`/forgot-account/forgot-password?email=${encodeURIComponent(
                email
            )}`);
        }else{
            router.push('/sign-up')
        }
    }
    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-10 md:py-20 dark:bg-transparent">
            <form
                onSubmit={handleSearch}
                className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                    <div>
                        <Link
                            href="/"
                            aria-label="go home">
                            <Icons.logo className='h-10 w-10' />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Find your account?</h1>
                        <p className="text-sm">Enter your email to receive a reset link</p>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="block text-sm">
                                Email
                            </Label>
                            <Input
                                type="email"
                                required
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                            />
                        </div>

                        <Button type="submit" className="w-full">Search</Button>
                    </div>

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
