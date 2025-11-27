"use client";
  
import { saveUsers } from "@/lib/actions/user.actions";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import { useFormState } from "react-dom";

const CreateUserPage = () => {
    const [state, formAction, pending] = useActionState(saveUsers, null);
    // const [state, formAction] = useFormState(saveUsers, null);
    return (
    <div className="max-w-md mx-auto mt-5">
        <h1 className="text-2xl text-center mb-2">Add New Employee</h1>
        <div>
        <form action={formAction}>
        <div className="mb-3">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">
            Full Name
          </label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter full name"
            className={`bordered w-full mt-1 ${
                state?.Error?.name && "border-red-500"
            }`}
            // defaultValue={state?.values?.name ?? ""}
            defaultValue={(state?.values?.name as string) ?? ""}
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">
            Email
          </label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email..."
            className={`bordered w-full mt-1 ${
                state?.Error?.email && "border-red-500"
            }`}
            // defaultValue={state?.values?.email ?? ""}
            defaultValue={(state?.values?.email as string) ?? ""}
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.email}</p>
          </div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="phone" className="block text-sm font-medium text-gray-900">
            Phone Number
          </label>
          <Input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone Number..."
            className={`bordered w-full mt-1 ${
                state?.Error?.phone && "border-red-500"
            }`}
            // defaultValue={state?.values?.phone ?? ""}
            defaultValue={(state?.values?.phone as string) ?? ""}
          />
          <div id="phone-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.phone}</p>
          </div>
        </div>
          
        {/* <button className="btn btn-primary">Save</button> */}
        <Button type="submit" variant={'default'} className="sm">
            {pending ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
    </div>
  );
};
  
export default CreateUserPage;