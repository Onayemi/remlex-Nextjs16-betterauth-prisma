"use client";

import { Icons } from './logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUp } from '@/lib/actions/auth.actions'
import Link from 'next/link'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import SocialButton from './social-signIn-button';

export default function SignUpPage() {
    // const initialSate = { errorMessage: "" }
    const initialState = { errorMessage: "", fieldErrors: {} };
    const [state, formAction, pending ] = useActionState(signUp, initialState)

    // State to hold form values
    const [formValues, setFormValues] = useState({
        firstname: "",
        lastname: "",
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

    // useEffect(() => {
    //     if(state.errorMessage.length){
    //         toast.error(state.errorMessage)
    //     }
    // }, [state.errorMessage])
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
                            <Icons.logo className='h-10 w-10' />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Create an account to get started</h1>
                        <p className="text-sm">Welcome! Create an account to get started</p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        {/* <Button
                            type="button"
                            variant="outline">
                            <Icons.google />
                            <span>Google</span>
                        </Button>
                        <Button
                            type="button"
                            variant="outline">
                           <Icons.gitHub />
                            <span>GitHub</span>
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
                    </div>

                    <hr className="my-4 border-dashed" />

                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="firstname"
                                    className="block text-sm">
                                    Firstname
                                </Label>
                                <Input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    value={formValues.firstname}
                                    onChange={handleChange}
                                />
                                {state?.fieldErrors?.firstname && (
                                    <p className="text-sm text-red-500 font-bold">
                                        {state.fieldErrors.firstname}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="lastname"
                                    className="block text-sm">
                                    Lastname
                                </Label>
                                <Input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    value={formValues.lastname}
                                    onChange={handleChange}
                                />
                                {state?.fieldErrors?.lastname && (
                                    <p className="text-sm text-red-500">
                                        {state.fieldErrors.lastname}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
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

                        <div className="space-y-3">
                            <Label
                                htmlFor="password"
                                className="text-sm">
                                Password
                            </Label>
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
                            {pending ? "Creating..." : "Sign Up"}
                        </Button>
                    </div>
                </div>

                <div className="bg-muted rounded-(--radius) border p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Have an account ?
                        <Button
                            asChild
                            variant="link"
                            className="px-2">
                            <Link href="/login">Sign In</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    )
}
