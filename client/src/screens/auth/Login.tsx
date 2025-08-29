import { ClockIcon } from "@heroicons/react/24/solid/index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify/unstyled";
import { formatZodErrors } from "../../../../common/dist/utils/format-zod-errors.js";
import { loginUserReqBody, type loginUserReqBodyType } from "../../../../common/dist/zod/requests/auth.zod.js";
import * as React from "react";
import { type FormEvent, useState } from "react";
import { Button } from "../../components/Button.tsx";
import { Input } from "../../components/Input.tsx";
import { useLoginMutation } from "../../redux/query/authApiSlice.ts";
import { setIn } from "../../utils/object-mutation.util.js";


export function Login () {

    const [ formState, setFormState ] = useState<Partial<loginUserReqBodyType>>({});
    const [ , setErrors ] = useState<Record<string, string>>({});
    const [ login, {isLoading} ] = useLoginMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get("redirect");

    function handleChange (event: React.ChangeEvent<HTMLFormElement>) {
        setFormState(prevState => {
            const newState = {...prevState};
            setIn(newState, event.target.name, event.target.value);
            return newState;
        });
    }

    async function handleSubmit (event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const result = loginUserReqBody.safeParse(formState);
        if (!result.success) {
            toast.error("Invalid email or password. Please check your credentials and try again.");
            const newErrors = formatZodErrors(result.error);
            setErrors(newErrors);
            return;
        }
        try {
            const response = await login(result.data).unwrap();
            setErrors({});
            toast.success(response.message);
            if (redirect) navigate(redirect);
            else history.back();

        } catch (error: any) {
            toast.error(error?.message || error.data?.message || "An error occurred while logging you in.");
        }
    }

    return (
        <main>
            <h1 className={"flex gap-1 items-center text-xl font-black justify-center leading-0 text-blue-600"}>
                <ClockIcon className={"size-5"} />
                SHOPHOUR
            </h1>
            <h2 className={"text-center text-2xl font-black mb-6 mt-3"}>
                Welcome back!
            </h2>
            <form
                onChange={handleChange}
                onSubmit={handleSubmit}
                className={"grid gap-4 w-xs"}
            >
                <Input
                    name="email"
                    label={"Email"}
                    placeholder="Eg. johndoe@gmail.com"
                    autoFocus={true}
                />
                <Input
                    name="password"
                    label={"Password"}
                    placeholder="Your password"
                    type={"password"}
                />
                <Button type={"submit"} loading={isLoading}>Login</Button>
            </form>
            <p className={"text-center text-sm text-gray-500 mt-4"}>
                Don't have an account? <Link to={"/auth/register"} className={"link font-semibold"}>Create account</Link>
            </p>
        </main>
    );
}