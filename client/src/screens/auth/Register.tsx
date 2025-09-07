import { ClockIcon } from "@heroicons/react/24/solid/index";
import { Link } from "react-router-dom";
import { toast } from "react-toastify/unstyled";
import { formatZodErrors } from "../../../../common/dist/utils/format-zod-errors.js";
import { registerUserReqBody, type registerUserReqBodyType } from "../../../../common/dist/zod/requests/auth.zod.js";
import * as React from "react";
import { type FormEvent, useState } from "react";
import { Button } from "../../components/Button.tsx";
import { Input } from "../../components/Input.tsx";
import { useRegisterMutation } from "../../redux/query/authApiSlice.ts";
import { setUser } from "../../redux/slices/userSlice.ts";
import { setIn } from "../../utils/object-mutation.util.js";
import { useDispatch } from "react-redux";


export function Register () {

    const dispatch = useDispatch();

    const [ formState, setFormState ] = useState<Partial<registerUserReqBodyType>>({});
    const [ , setErrors ] = useState<Record<string, string>>({});
    const [ register, { isLoading } ] = useRegisterMutation();

    function handleChange (event: React.ChangeEvent<HTMLFormElement>) {
        setFormState(prevState => {
            const newState = { ...prevState };
            setIn(newState, event.target.name, event.target.value);
            return newState;
        });
    }

    async function handleSubmit (event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const result = registerUserReqBody.safeParse(formState);
        if (!result.success) {
            toast.error("Some fields are invalid. Please check your inputs and try again.");
            const newErrors = formatZodErrors(result.error);
            setErrors(newErrors);
            return;
        }
        try {
            const response = await register(result.data).unwrap();
            const { _id, name, avatar, role, status, email } = response.user;
            const user = { _id, name, avatar: avatar?.url, role, isActive: status, email };
            dispatch(setUser(user));
            setErrors({});
            toast.success(response.message);
            history.back();
        } catch (error: any) {
            toast.error(error?.message || error.data?.message || "An error occurred while creating your account.");
        }
    }

    return (
        <main className={"max-w-md mx-auto"}>
            <h1 className={"flex gap-1 items-center text-xl font-black justify-center leading-0 text-blue-600"}>
                <ClockIcon className={"size-5"} />
                <span>SHOPHOUR</span>
            </h1>
            <h2 className={"text-center text-2xl font-black mb-6 mt-3"}>
                Let's get started!
            </h2>
            <form
                onChange={handleChange}
                onSubmit={handleSubmit}
                className={"grid gap-4 w-xs m-auto"}
            >
                <div className={"grid grid-cols-2 gap-4"}>
                    <Input
                        name={"name.firstName"}
                        label={"First Name"}
                        placeholder={"Eg. John"}
                        autoFocus={true}
                    />
                    <Input
                        name={"name.lastName"}
                        label={"Last Name"}
                        placeholder={"Eg. Doe"}
                    />
                </div>
                <Input
                    name="email"
                    label={"Email"}
                    placeholder="Eg. johndoe@gmail.com"
                />
                <Input
                    name="password"
                    label={"Password"}
                    placeholder="Your password"
                    type={"password"}
                    description={"Password must be at least 6 characters long and contain at least one uppercase letter or lowercase letter, one number, and one special character."}
                />
                <Button type={"submit"} loading={isLoading}>Register</Button>
            </form>
            <p className={"text-center text-sm text-gray-500 mt-4"}>
                Already have have an account? <Link to={"/auth/login"} className={"link font-semibold"}>Login</Link>
            </p>
            <Link to={"/"} className={"link text-center block mt-5"}>&larr; Go home</Link>
        </main>
    );
}