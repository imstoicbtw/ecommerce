import { ClockIcon } from "@heroicons/react/24/solid/index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify/unstyled";
import { formatZodErrors } from "../../../../common/dist/utils/format-zod-errors.js";
import { loginUserReqBody, type loginUserReqBodyType } from "../../../../common/dist/zod/requests/auth.zod.js";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { Button } from "../../components/Button.tsx";
import { Input } from "../../components/Input.tsx";
import { useLoginMutation } from "../../redux/query/authApiSlice.ts";
import { setUser } from "../../redux/slices/userSlice.ts";
import { setIn } from "../../utils/object-mutation.util.js";
import { useDispatch } from "react-redux";


export function Login () {

    const dispatch = useDispatch();

    const [ formState, setFormState ] = useState<loginUserReqBodyType>({
        email: "", password: "",
    });
    const [ , setErrors ] = useState<Record<string, string>>({});
    const [ login, { isLoading } ] = useLoginMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get("redirect");

    function handleChange (event: ChangeEvent<HTMLInputElement>) {
        setFormState(prevState => {
            const newState = { ...prevState };
            setIn(newState, event.currentTarget.name, event.currentTarget.value);
            return newState;
        });
    }

    const handleAdminLogin = () => {
        setFormState(prevState => {
            const newState = { ...prevState };
            setIn(newState, "email", "admin@mail.com");
            setIn(newState, "password", "Admin#3");
            return newState;
        });
    };

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
            toast.success(response.message);
            console.log(response);
            const { _id, name, avatar, role, status, email } = response.user;
            const user = { _id, name, avatar: avatar?.url, role, isActive: status, email };
            dispatch(setUser(user));
            setErrors({});
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
                <span>SHOPHOUR</span>
            </h1>
            <h2 className={"text-center text-2xl font-black mb-6 mt-3"}>
                Welcome back!
            </h2>
            <form
                onSubmit={handleSubmit}
                className={"grid gap-4 w-xs m-auto"}
            >
                <Input
                    name="email"
                    label={"Email"}
                    placeholder="Eg. johndoe@gmail.com"
                    autoFocus={true}
                    value={formState.email}
                    onChange={handleChange}
                />
                <Input
                    name="password"
                    label={"Password"}
                    placeholder="Your password"
                    type={"password"}
                    value={formState.password}
                    onChange={handleChange}
                />
                <div>
                    <Button
                        type={"button"} variant={"plain"} size={"small"} className={"!p-0 m-auto"}
                        onClick={handleAdminLogin}
                    >Login as admin</Button>
                </div>
                <Button type={"submit"} loading={isLoading}>Login</Button>
            </form>
            <p className={"text-center text-sm text-gray-500 mt-4"}>
                Don't have an account? <Link to={"/auth/register"} className={"link font-semibold"}>Create account</Link>
            </p>
            <Link to={"/"} className={"link text-center block mt-5"}>&larr; Go home</Link>
        </main>
    );
}