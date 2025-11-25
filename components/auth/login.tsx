"use client";

// import { LogoIcon } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Icons } from './logo'
import { signIn } from '@/lib/actions/auth.actions'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner';
import SocialButton from './social-signIn-button';

export default function LoginPage() {
    const initialState = { errorMessage: "", fieldErrors: {} };
    const [state, formAction, pending ] = useActionState(signIn, initialState);

     // State to hold form values
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        if (state?.errorMessage) {
        toast.error(state.errorMessage);
        }
    }, [state?.errorMessage]);

    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-10 md:py-20 dark:bg-transparent">
            <form
                action={formAction}
                className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
                <div className="p-8 pb-6">
                    <div>
                        <Link
                            href="/"
                            aria-label="go home">
                            {/* <LogoIcon /> */}
                            <Icons.logo className='h-10 w-10' />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Sign In to Better-Auth Starter Examples</h1>
                        <p className="text-sm">Welcome back! Sign in to continue</p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        {/* <Button
                            type="button"
                            variant="outline">
                            <Icons.google />
                            <span>Google</span>
                        </Button> */}
                        <SocialButton
                            provider="google"
                            label="Google"
                            icon={<Icons.google />}
                        />
                        <SocialButton
                            provider="github"
                            label="GitHub"
                            icon={<Icons.gitHub />}
                        />
                        {/* <Button
                            type="button"
                            variant="outline">
                            <Icons.gitHub />
                            <span>Github</span>
                        </Button> */}
                    </div>

                    <hr className="my-4 border-dashed" />

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="block text-sm">
                                Email
                            </Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                            {state?.fieldErrors?.email && (
                                <p className="text-sm text-red-500">
                                    {state.fieldErrors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-0.5">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="pwd"
                                    className="text-sm">
                                    Password
                                </Label>
                                <Button
                                    asChild
                                    variant="link"
                                    size="sm">
                                    <Link
                                        href="/forgot-account"
                                        className="link intent-info variant-ghost text-sm">
                                        Forgot your account?
                                    </Link>
                                </Button>
                            </div>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                className="input sz-md variant-mixed"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                            {state?.fieldErrors?.password && (
                                <p className="text-sm text-red-500">
                                    {state.fieldErrors.password}
                                </p>
                            )}
                        </div>

                        <Button type='submit' className="w-full mt-3" disabled={pending}>
                            {pending ? "Creating..." : "Sign In"}
                        </Button>
                    </div>
                </div>

                <div className="bg-muted rounded-(--radius) border p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Don't have an account ?
                        <Button
                            asChild
                            variant="link"
                            className="px-2">
                            <Link href="/sign-up">Create account</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    )
}
